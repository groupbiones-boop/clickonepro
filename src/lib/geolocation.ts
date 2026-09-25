export interface GeoData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
}

/**
 * Visitor geolocation is disabled on purpose.
 * The old version called http://ip-api.com (plain http, blocked as mixed content on https) and sent
 * every visitor's IP address to a third party without consent. It now always returns null, so
 * analytics and presence keep working without location data.
 */
export const getGeoLocation = async (): Promise<GeoData | null> => null;

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
