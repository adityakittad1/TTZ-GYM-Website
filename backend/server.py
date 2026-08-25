from fastapi import FastAPI, APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import io
import base64
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ── MongoDB ──────────────────────────────────────────────
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get('/status', response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {'_id': 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
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
    docs = await db.hero_images.find({}, {'_id': 0}).sort('sort_order', 1).to_list(100)
    result = []
    for doc in docs:
        if isinstance(doc.get('created_at'), str):
            doc['created_at'] = datetime.fromisoformat(doc['created_at'])
        result.append(HeroImage(**doc))
    return result

@api_router.post('/hero-images', response_model=HeroImage)
async def upload_hero_image(
    file: UploadFile = File(...),
    _admin: str = Depends(get_current_admin)
):
    """Upload a new hero image — stores as base64 data URL in MongoDB."""
    if file.content_type not in ('image/jpeg', 'image/png', 'image/webp'):
        raise HTTPException(status_code=400, detail='Invalid image type. Use JPEG, PNG, or WebP.')
    
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail='File too large (max 10MB)')
    
    b64 = base64.b64encode(content).decode('utf-8')
    data_url = f'data:{file.content_type};base64,{b64}'
    
    # Determine next sort order
    count = await db.hero_images.count_documents({})
    
    image_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    doc = {
        'id': image_id,
        'url': data_url,
        'filename': file.filename or f'image_{image_id[:8]}',
        'sort_order': count,
        'created_at': now.isoformat(),
    }
    await db.hero_images.insert_one(doc)
    
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
    result = await db.hero_images.delete_one({'id': image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Image not found')
    return {'message': 'Deleted'}

@api_router.put('/hero-images/reorder')
async def reorder_hero_images(
    body: ReorderRequest,
    _admin: str = Depends(get_current_admin)
):
    """Update sort order for all images."""
    for i, image_id in enumerate(body.order):
        await db.hero_images.update_one({'id': image_id}, {'$set': {'sort_order': i}})
    return {'message': 'Reordered'}


# ══════════════════════════════════════════════════════════
#  SETTINGS ROUTES (NEW)
# ══════════════════════════════════════════════════════════

@api_router.get('/settings/hero', response_model=HeroSettings)
async def get_hero_settings():
    """Get hero slideshow settings."""
    doc = await db.settings.find_one({'_id': 'hero_slideshow'})
    if not doc:
        return HeroSettings()
    return HeroSettings(**doc)

@api_router.put('/settings/hero', response_model=HeroSettings)
async def update_hero_settings(
    settings: HeroSettings,
    _admin: str = Depends(get_current_admin)
):
    """Update hero slideshow settings."""
    await db.settings.update_one(
        {'_id': 'hero_slideshow'},
        {'$set': settings.model_dump()},
        upsert=True
    )
    return settings


# ══════════════════════════════════════════════════════════
#  APP SETUP
# ══════════════════════════════════════════════════════════

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origin_regex=".*",
    allow_methods=['*'],
    allow_headers=['*'],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event('shutdown')
async def shutdown_db_client():
    client.close()