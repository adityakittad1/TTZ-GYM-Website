from fastapi import FastAPI, APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import uuid
import io
import base64
import json
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ── Local JSON DB ──────────────────────────────────────────────
DB_FILE = ROOT_DIR / 'data.json'

def load_db():
    if not DB_FILE.exists():
        return {'status_checks': [], 'hero_images': [], 'settings': {}}
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {'status_checks': [], 'hero_images': [], 'settings': {}}

def save_db(data):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

# ── Auth config ──────────────────────────────────────────
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'ttz_fitness_secret_change_me_in_prod')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH', '')  # bcrypt hash

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/admin/login')

# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(title='TTZ Fitness API')
api_router = APIRouter(prefix='/api')


# ══════════════════════════════════════════════════════════
#  MODELS
# ══════════════════════════════════════════════════════════

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra='ignore')
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class HeroImage(BaseModel):
    id: str
    url: str
    filename: str
    sort_order: int
    created_at: datetime

class ReorderRequest(BaseModel):
    order: List[str]  # list of image IDs in new order

class HeroSettings(BaseModel):
    slideDuration: int = Field(default=8, ge=3, le=15)
    transitionDuration: int = Field(default=1000)
    autoplay: bool = Field(default=True)

class SiteSettings(BaseModel):
    phoneMain: str = Field(default="9028468563")
    phoneAlt: str = Field(default="8668891406")
    whatsappNumber: str = Field(default="919028468563")
    instagramUrl: str = Field(default="https://www.instagram.com/ttz_fitness_24/")
    locationName: str = Field(default="Satara Parisar, Chhatrapati Sambhajinagar")
    locationMapUrl: str = Field(default="https://maps.app.goo.gl/DY5aPzJaSD6x7QKH9")
    timingMorning: str = Field(default="Morning: 5:00 – 10:00 AM")
    timingEvening: str = Field(default="Evening: 5:00 – 10:00 PM")


# ══════════════════════════════════════════════════════════
#  AUTH HELPERS
# ══════════════════════════════════════════════════════════

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')


# ══════════════════════════════════════════════════════════
#  EXISTING ROUTES (preserved exactly)
# ══════════════════════════════════════════════════════════

@api_router.get('/')
async def root():
    return {'message': 'Hello World'}

@api_router.post('/status', response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    db_data = load_db()
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    db_data.setdefault('status_checks', []).append(doc)
    save_db(db_data)
    return status_obj

@api_router.get('/status', response_model=List[StatusCheck])
async def get_status_checks():
    db_data = load_db()
    status_checks = db_data.get('status_checks', [])
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ══════════════════════════════════════════════════════════
#  ADMIN AUTH ROUTES (NEW)
# ══════════════════════════════════════════════════════════

@api_router.post('/admin/login', response_model=Token)
async def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    """JWT login for admin panel."""
    if form_data.username != ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    
    # If no hash is set, fall back to plaintext env var comparison (dev mode)
    admin_plain_pw = os.environ.get('ADMIN_PASSWORD', '')
    if ADMIN_PASSWORD_HASH:
        valid = verify_password(form_data.password, ADMIN_PASSWORD_HASH)
    elif admin_plain_pw:
        valid = (form_data.password == admin_plain_pw)
    else:
        valid = False
    
    if not valid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    
    token = create_access_token({'sub': ADMIN_USERNAME})
    return Token(access_token=token)


# ══════════════════════════════════════════════════════════
#  HERO IMAGES ROUTES (NEW)
# ══════════════════════════════════════════════════════════

@api_router.get('/hero-images', response_model=List[HeroImage])
async def get_hero_images():
    """Public endpoint — returns hero images in sort order."""
    db_data = load_db()
    docs = db_data.get('hero_images', [])
    docs.sort(key=lambda x: x.get('sort_order', 0))
    result = []
    for doc in docs:
        d = dict(doc)
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
        result.append(HeroImage(**d))
    return result

@api_router.post('/hero-images', response_model=HeroImage)
async def upload_hero_image(
    file: UploadFile = File(...),
    _admin: str = Depends(get_current_admin)
):
    """Upload a new hero image — stores as base64 data URL."""
    if file.content_type not in ('image/jpeg', 'image/png', 'image/webp'):
        raise HTTPException(status_code=400, detail='Invalid image type. Use JPEG, PNG, or WebP.')
    
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail='File too large (max 10MB)')
    
    b64 = base64.b64encode(content).decode('utf-8')
    data_url = f'data:{file.content_type};base64,{b64}'
    
    db_data = load_db()
    hero_images = db_data.setdefault('hero_images', [])
    count = len(hero_images)
    
    image_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    doc = {
        'id': image_id,
        'url': data_url,
        'filename': file.filename or f'image_{image_id[:8]}',
        'sort_order': count,
        'created_at': now.isoformat(),
    }
    hero_images.append(doc)
    save_db(db_data)
    
    return HeroImage(
        id=image_id,
        url=data_url,
        filename=doc['filename'],
        sort_order=count,
        created_at=now,
    )

@api_router.delete('/hero-images/{image_id}')
async def delete_hero_image(
    image_id: str,
    _admin: str = Depends(get_current_admin)
):
    """Delete a hero image by ID."""
    db_data = load_db()
    hero_images = db_data.get('hero_images', [])
    new_images = [img for img in hero_images if img.get('id') != image_id]
    
    if len(new_images) == len(hero_images):
        raise HTTPException(status_code=404, detail='Image not found')
        
    db_data['hero_images'] = new_images
    save_db(db_data)
    return {'message': 'Deleted'}

@api_router.put('/hero-images/reorder')
async def reorder_hero_images(
    body: ReorderRequest,
    _admin: str = Depends(get_current_admin)
):
    """Update sort order for all images."""
    db_data = load_db()
    hero_images = db_data.get('hero_images', [])
    
    # Create a quick lookup map
    id_to_img = {img['id']: img for img in hero_images}
    
    for i, image_id in enumerate(body.order):
        if image_id in id_to_img:
            id_to_img[image_id]['sort_order'] = i
            
    save_db(db_data)
    return {'message': 'Reordered'}


# ══════════════════════════════════════════════════════════
#  SETTINGS ROUTES (NEW)
# ══════════════════════════════════════════════════════════

@api_router.get('/settings/hero', response_model=HeroSettings)
async def get_hero_settings():
    """Get hero slideshow settings."""
    db_data = load_db()
    doc = db_data.get('settings', {}).get('hero_slideshow')
    if not doc:
        return HeroSettings()
    return HeroSettings(**doc)

@api_router.put('/settings/hero', response_model=HeroSettings)
async def update_hero_settings(
    settings: HeroSettings,
    _admin: str = Depends(get_current_admin)
):
    """Update hero slideshow settings."""
    db_data = load_db()
    if 'settings' not in db_data:
        db_data['settings'] = {}
    db_data['settings']['hero_slideshow'] = settings.model_dump()
    save_db(db_data)
    return settings

@api_router.get('/settings/site', response_model=SiteSettings)
async def get_site_settings():
    """Get global site settings."""
    db_data = load_db()
    doc = db_data.get('settings', {}).get('site_details')
    if not doc:
        return SiteSettings()
    return SiteSettings(**doc)

@api_router.put('/settings/site', response_model=SiteSettings)
async def update_site_settings(
    settings: SiteSettings,
    _admin: str = Depends(get_current_admin)
):
    """Update global site settings."""
    db_data = load_db()
    if 'settings' not in db_data:
        db_data['settings'] = {}
    db_data['settings']['site_details'] = settings.model_dump()
    save_db(db_data)
    return settings


# ══════════════════════════════════════════════════════════
#  APP SETUP
# ══════════════════════════════════════════════════════════

app.include_router(api_router)

# ── CORS ──────────────────────────────────────────────────────────
# In production set CORS_ORIGINS to a comma-separated list of allowed
# origins, e.g. "https://ttz-fitness.vercel.app,https://ttzfitness.com"
# Leave as "*" for local development (the default in backend/.env).
_raw_origins = os.environ.get('CORS_ORIGINS', '*')
_origins_list = [o.strip() for o in _raw_origins.split(',') if o.strip()]

if _origins_list == ['*']:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=False,   # credentials incompatible with wildcard
        allow_methods=['*'],
        allow_headers=['*'],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_origins_list,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
