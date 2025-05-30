import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL for the location API
const API_BASE_URL = "https://countriesnow.space/api/v0.1/countries";

// Fetch all countries
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data.data.map((country) => country.country);
    },
    staleTime: Infinity, // Countries rarely change, so we can cache them indefinitely
  });
};

// Fetch states for a given country
export const useStates = (country) => {
  return useQuery({
    queryKey: ["states", country],
    queryFn: async () => {
      if (!country) return [];

      const response = await axios.post(`${API_BASE_URL}/states`, {
        country,
      });

      return response.data.data.states.map((state) => state.name);
    },
    enabled: !!country, // Only run query if country is selected
  });
};

// Fetch cities for a given country and state
export const useCities = (country, state) => {
  return useQuery({
    queryKey: ["cities", country, state],
    queryFn: async () => {
      if (!country || !state) return [];

      try {
        // Using the correct API endpoint for cities by state from the documentation
        const response = await axios.post(
          `https://countriesnow.space/api/v0.1/countries/state/cities`,
          {
            country,
            state,
          }
        );

        // Check if response contains data
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return [];
      } catch (error) {
        console.error("Error fetching cities:", error);

        // Fallback to getting cities by country and filtering
        try {
          const response = await axios.post(`${API_BASE_URL}/cities`, {
            country,
          });

          // Return all cities if we can't filter by state
          if (response.data && response.data.data) {
            return response.data.data;
          }
          return [];
        } catch (fallbackError) {
          console.error("Fallback error fetching cities:", fallbackError);
          return [];
        }
      }
    },
    enabled: !!country && !!state, // Only run query if both country and state are selected
    retry: 1, // Only retry once to avoid too many failed requests
  });
};
