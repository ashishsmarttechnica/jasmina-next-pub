import Selecter from "@/common/Selecter";
import { useCities, useCountries, useStates } from "@/hooks/location/useLocationData";
import useLocationStore from "@/store/location.store";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LocationSelector = ({ value, onChange, error, onFieldChange }) => {
  const t = useTranslations("Common");
  const {
    selectedCountry,
    selectedState,
    selectedCity,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
  } = useLocationStore();

  const [cityInput, setCityInput] = useState("");
  const [manualCityEntry, setManualCityEntry] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Use a ref to track if we should update the location string
  const shouldUpdateLocation = useRef(false);
  const prevLocationString = useRef("");
  const initialLoadDone = useRef(false);

  const { data: countries, isLoading: isLoadingCountries } = useCountries();
  const { data: states, isLoading: isLoadingStates } = useStates(selectedCountry);
  const {
    data: cities,
    isLoading: isLoadingCities,
    isError: isCitiesError,
  } = useCities(selectedCountry, selectedState);

  // Check if location is complete
  const isLocationComplete = useMemo(() => {
    if (manualCityEntry) {
      return Boolean(selectedCountry && selectedState && cityInput);
    } else {
      return Boolean(selectedCountry && selectedState && selectedCity);
    }
  }, [selectedCountry, selectedState, selectedCity, cityInput, manualCityEntry]);

  // Show errors when error prop is passed
  useEffect(() => {
    if (error && !showErrors) {
      setShowErrors(true);
    } else if (!error && showErrors) {
      setShowErrors(false);
    }
  }, [error, showErrors]);

  useEffect(() => {
    if (value) {
      try {
        const parts = value.split(",").map((part) => part.trim());

        if (parts.length >= 3) {
          const [city, state, country] = [parts[0], parts[1], parts[2]];
          setSelectedCountry(country);
          setSelectedState(state);
          setSelectedCity(city);
          setCityInput("");
          setManualCityEntry(false);
        } else if (parts.length === 2) {
          const [state, country] = [parts[0], parts[1]];
          setSelectedCountry(country);
          setSelectedState(state);
          setSelectedCity("");
          setCityInput("");
          setManualCityEntry(false);
        } else if (parts.length === 1) {
          setSelectedCountry(parts[0]);
          setSelectedState("");
          setSelectedCity("");
          setCityInput("");
          setManualCityEntry(false);
        }
      } catch (err) {
        console.error("Error parsing location:", err);
      }
    } else {
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
      setCityInput("");
      setManualCityEntry(false);
    }
  }, [value, setSelectedCountry, setSelectedState, setSelectedCity]);

  useEffect(() => {
    let locationString = "";

    if (manualCityEntry && cityInput && selectedState && selectedCountry) {
      locationString = `${cityInput}, ${selectedState}, ${selectedCountry}`;
    } else if (selectedCity && selectedState && selectedCountry) {
      locationString = `${selectedCity}, ${selectedState}, ${selectedCountry}`;
    } else if (selectedState && selectedCountry) {
      locationString = `${selectedState}, ${selectedCountry}`;
    } else if (selectedCountry) {
      locationString = selectedCountry;
    }
    if (locationString && locationString !== prevLocationString.current) {
      prevLocationString.current = locationString;
      onChange(locationString);

      if (isLocationComplete && onFieldChange) {
        onFieldChange("location");
      }
    }
  }, [
    selectedCountry,
    selectedState,
    selectedCity,
    cityInput,
    manualCityEntry,
    onChange,
    isLocationComplete,
    onFieldChange,
  ]);

  // Handle country change
  const handleCountryChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSelectedCountry(value);
      setSelectedState("");
      setSelectedCity("");
      setCityInput("");
      setManualCityEntry(false);
    },
    [setSelectedCountry, setSelectedState, setSelectedCity]
  );

  // Handle state change
  const handleStateChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSelectedState(value);
      setSelectedCity("");
      setCityInput("");
      setManualCityEntry(false);
    },
    [setSelectedState, setSelectedCity]
  );

  // Handle city change
  const handleCityChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSelectedCity(value);
      setCityInput("");
      setManualCityEntry(false);
    },
    [setSelectedCity]
  );

  // Handle manual city input
  const handleCityInput = useCallback((e) => {
    const { value } = e.target;
    setCityInput(value);
  }, []);

  // Toggle manual city entry
  const toggleManualEntry = useCallback(() => {
    setManualCityEntry((prev) => !prev);
    setSelectedCity("");
  }, [setSelectedCity]);

  // Format options for selectors
  const countryOptions =
    countries?.map((country) => ({
      label: country,
      value: country,
    })) || [];

  const stateOptions =
    states?.map((state) => ({
      label: state,
      value: state,
    })) || [];

  // Process cities data and remove duplicates
  const cityOptions = useMemo(() => {
    if (!Array.isArray(cities)) return [];

    // Create a map to track unique cities
    const uniqueCities = new Map();

    cities.forEach((city) => {
      const cityName = typeof city === "string" ? city : city.name || city.city || city;
      if (!uniqueCities.has(cityName)) {
        uniqueCities.set(cityName, {
          label: cityName,
          value: cityName,
        });
      }
    });

    // Convert map to array
    return Array.from(uniqueCities.values());
  }, [cities]);

  // Check if we have city data
  const hasCityData = cityOptions.length > 0;

  // Determine if selectors should be searchable based on number of options
  const isCountrySearchable = countryOptions.length > 10;
  const isStateSearchable = stateOptions.length > 10;
  const isCitySearchable = cityOptions.length > 10;

  // Get error messages based on validation state
  const getCountryError = () => {
    if (showErrors && !selectedCountry) {
      return t("countryRequired") || "Country is required";
    }
    return "";
  };

  const getStateError = () => {
    if (showErrors && selectedCountry && !selectedState) {
      return t("stateRequired") || "State is required";
    }
    return "";
  };

  const getCityError = () => {
    if (showErrors && selectedCountry && selectedState) {
      if (!manualCityEntry && !selectedCity) {
        return t("cityRequired") || "City is required";
      } else if (manualCityEntry && !cityInput) {
        return t("cityRequired") || "City is required";
      }
    }
    return "";
  };

  return (
    <div>
      {/* Row layout for all dropdowns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Country Selector */}
        <div>
          <Selecter
            name="country"
            label={`${t("country")} *`}
            placeholder={t("selectCountry")}
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            error={getCountryError()}
            isLoading={isLoadingCountries}
            isSearchable={isCountrySearchable}
          />
        </div>

        {/* State Selector */}
        <div>
          <Selecter
            name="state"
            label={`${t("state")} *`}
            placeholder={t("selectState")}
            value={selectedState}
            onChange={handleStateChange}
            options={stateOptions}
            error={getStateError()}
            isLoading={isLoadingStates && selectedCountry}
            disabled={!selectedCountry || isLoadingStates || stateOptions.length === 0}
            isSearchable={isStateSearchable}
          />
        </div>

        {/* City Selector */}
        <div>
          {!manualCityEntry ? (
            <Selecter
              name="city"
              label={`${t("city")} *`}
              placeholder={t("selectCity")}
              value={selectedCity}
              onChange={handleCityChange}
              options={cityOptions}
              error={getCityError()}
              isLoading={isLoadingCities && selectedState && selectedCountry}
              disabled={
                !selectedState || !selectedCountry || isLoadingCities || cityOptions.length === 0
              }
              isSearchable={isCitySearchable}
            />
          ) : (
            <div className="space-y-1">
              <label className="text-grayBlueText text-[14px]">{`${t("city")} *`}</label>
              <input
                type="text"
                name="cityInput"
                value={cityInput}
                onChange={handleCityInput}
                placeholder={t("enterCityManually")}
                className={`focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none ${
                  getCityError() ? "border-red-500" : "border-gray-300"
                }`}
              />
              {getCityError() && <p className="mt-1 text-sm text-red-500">{getCityError()}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Manual city entry toggle button */}
      {selectedCountry && selectedState && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={toggleManualEntry}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {manualCityEntry ? t("useDropdown") : t("enterCityManually")}
          </button>
        </div>
      )}

      {/* Global error message - shown if form was submitted and location is incomplete
      {error && !isLocationComplete && <p className="mt-2 text-sm text-red-500">{error}</p>} */}
    </div>
  );
};

export default LocationSelector;
