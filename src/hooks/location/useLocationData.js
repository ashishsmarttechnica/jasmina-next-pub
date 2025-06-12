import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL for the location API
const API_BASE_URL = "https://countriesnow.space/api/v0.1/countries";

// Fetch all countries
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        // Direct API call with debugging
        const response = await axiosInstance.get(`get/countries?limit=226`);

        // Handle different possible response formats
        if (response.data) {
          // Format 1: {data: [{country: "..."}]}
          if (Array.isArray(response.data.data)) {
            return response.data.data.map((country) => ({
              country: country.country || country.name || "",
              isLGBTQ: country.isLGBTQ || false,
            }));
          }
          // Format 2: {data: {data: [{country: "..."}]}}
          else if (response.data.data && Array.isArray(response.data.data.data)) {
            return response.data.data.data.map((country) => ({
              country: country.country || country.name || "",
              isLGBTQ: country.isLGBTQ || false,
            }));
          }
          // Format 3: {data: [...]} where data is an array of strings or objects
          else if (Array.isArray(response.data)) {
            return response.data.map((country) => {
              if (typeof country === "string") {
                return { country, isLGBTQ: false };
              } else {
                return {
                  country: country.country || country.name || "",
                  isLGBTQ: country.isLGBTQ || false,
                };
              }
            });
          }
        }

        console.error("Could not parse API response format:", response.data);
        return [];
      } catch (error) {
        console.error("Error fetching countries:", error);
        return []; // Return empty array on error
      }
    },
    staleTime: 300000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

// Fetch states for a given country
export const useStates = (country) => {
  return useQuery({
    queryKey: ["states", country],
    queryFn: async () => {
      if (!country) return [];

      try {
        const response = await axios.post(`${API_BASE_URL}/states`, {
          country,
        });

        if (response.data && response.data.data && response.data.data.states) {
          return response.data.data.states.map((state) => state.name);
        }
        return [];
      } catch (error) {
        console.error("Error fetching states:", error);
        return [];
      }
    },
    enabled: !!country, // Only run query if country is selected
    retry: 1, // Limit retries
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
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
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
  });
};
