import React, { useEffect, useState } from 'react';

export function getIcons(icon) {
  switch (icon) {
    case '01d':
    case '01n':
      return sun;
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return cloud;
    case '09d':
    case '09n':
      return cloudRain;
    case '10n':
    case '10d':
      return cloudDrizzle;
    case '11n':
    case '11d':
      return cloudLightning;
    case '13n':
    case '13d':
      return cloudSnow;
    case '50n':
    case '50d':
      return wind;

    default:
      console.warn('no icon for case:', icon);
      break;
  }
}

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    if (json.cod === 401 || json.cod === '404') {
      throw json.message;
    }
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

/**
 * 01d = sun -clear sky
 * 02d - some sun behind clouds = few clouds
 * 03 - cloud -scattered clouds
 * 04 clouds again
 * 09 - lots of rain
 * 10 - rain
 * 11 - thunder
 * 13 - snow
 * 50 - mist
 */

const cloud = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cloud"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
const sun = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-sun"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const cloudSnow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cloud-snow"
  >
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="8" y1="20" x2="8" y2="20" />
    <line x1="12" y1="18" x2="12" y2="18" />
    <line x1="12" y1="22" x2="12" y2="22" />
    <line x1="16" y1="16" x2="16" y2="16" />
    <line x1="16" y1="20" x2="16" y2="20" />
  </svg>
);
const cloudRain = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cloud-rain"
  >
    <line x1="16" y1="13" x2="16" y2="21" />
    <line x1="8" y1="13" x2="8" y2="21" />
    <line x1="12" y1="15" x2="12" y2="23" />
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
  </svg>
);
const cloudLightning = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cloud-lightning"
  >
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
    <polyline points="13 11 9 17 15 17 11 23" />
  </svg>
);
const cloudDrizzle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cloud-drizzle"
  >
    <line x1="8" y1="19" x2="8" y2="21" />
    <line x1="8" y1="13" x2="8" y2="15" />
    <line x1="16" y1="19" x2="16" y2="21" />
    <line x1="16" y1="13" x2="16" y2="15" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="12" y1="15" x2="12" y2="17" />
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
  </svg>
);
const wind = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-wind"
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);
