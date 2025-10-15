import { CURRENCIES } from "@/constants/currency";
import useGeneralStore from "@/stores/generalStore";
import { CurrencyType } from "@/types/currency";
import { useState } from "react";

export interface GeolocationData {
  latitude: number;
  longitude: number;
  country?: string;
  countryCode?: string;
  currencyCode?: CurrencyType | "EUR";
}

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<GeolocationData | null>(
    null
  );
  const { setSelectedCurrency } = useGeneralStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocationDetails = async (latitude: number, longitude: number) => {
    try {
      // Get country information using reverse geocoding
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        {
          // revalidate every 30 days
          next: { revalidate: 2592000 },
        }
      );
      const data = await response.json();

      if (!data.countryCode) {
        throw new Error("Could not determine country from coordinates");
      }

      // Get currency information using RestCountries API
      const countryResponse = await fetch(
        `https://restcountries.com/v3.1/alpha/${data.countryCode}`
      );
      const [countryData] = await countryResponse.json();

      // Get the first currency code from the country data
      const currencyCode = Object.keys(countryData.currencies)[0] as CurrencyType | "EUR";

      return {
        country: data.countryName,
        countryCode: data.countryCode,
        currencyCode,
      };
    } catch (err) {
      throw new Error("Failed to get country and currency information");
    }
  };

  const getCurrentPosition = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // check for saved userCurrency in local storage
    const _savedCurrency = localStorage.getItem("userCurrency");
    const savedCurrency = _savedCurrency ? JSON.parse(_savedCurrency) : null;
    if (savedCurrency) return;

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const details = await getLocationDetails(latitude, longitude);

          setLocationData({
            latitude,
            longitude,
            ...details,
          });

          const currencyCode = details?.currencyCode ?? "USD";

          //   if currencycode is supported by app, set it as selected currency
          //   otherwise, default to USD
          const supportedCurrencies = CURRENCIES.map((c) => c.code);
          let _appCurrency: CurrencyType;
          if (currencyCode === "EUR") {
            _appCurrency = "GBP";
          } else if (supportedCurrencies.includes(currencyCode as CurrencyType)) {
            _appCurrency = currencyCode as CurrencyType;
          } else {
            _appCurrency = "USD";
          }
          setSelectedCurrency(_appCurrency);
          localStorage.setItem("userCurrency", JSON.stringify(_appCurrency));
          setLoading(false);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to get location details"
          );
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        console.error("Error getting location:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return {
    locationData,
    error,
    loading,
    getCurrentPosition,
  };
};
