export interface GeoData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
}

const CACHE_KEY = "visitor_geo_data";

export const getGeoLocation = async (): Promise<GeoData | null> => {
  // Check cache first
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as GeoData;
    } catch {
      // Invalid cache, continue to fetch
    }
  }

  try {
    // Using ip-api.com (free, 45 req/min, no API key needed)
    const response = await fetch("http://ip-api.com/json/?fields=status,country,countryCode,regionName,city,lat,lon", {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error("Geolocation API error");
    }

    const data = await response.json();

    if (data.status === "success") {
      const geoData: GeoData = {
        country: data.country || "Unknown",
        countryCode: data.countryCode || "XX",
        region: data.regionName || "",
        city: data.city || "",
        lat: data.lat || 0,
        lon: data.lon || 0,
      };

      // Cache in sessionStorage
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(geoData));
      return geoData;
    }

    return null;
  } catch (error) {
    console.warn("Geolocation detection failed:", error);
    return null;
  }
};

// Country code to emoji flag converter
export const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode === "XX" || countryCode.length !== 2) {
    return "🌍";
  }
  
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
};
