import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://${window.location.hostname}:8001`;

export const SiteSettingsContext = createContext(null);

export const SiteSettingsProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({
    phoneMain: "9028468563",
    phoneAlt: "8668891406",
    whatsappNumber: "919028468563",
    instagramUrl: "https://www.instagram.com/ttz_fitness_24/",
    locationName: "Satara Parisar, Chhatrapati Sambhajinagar",
    locationMapUrl: "https://maps.app.goo.gl/DY5aPzJaSD6x7QKH9",
    timingMorning: "Morning: 5:00 – 10:00 AM",
    timingEvening: "Evening: 5:00 – 10:00 PM"
  });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/settings/site`)
      .then(res => {
        if (res.data) {
          setSiteSettings(res.data);
        }
      })
      .catch(err => {
        console.error('Failed to load site settings', err);
      });
  }, []);

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
