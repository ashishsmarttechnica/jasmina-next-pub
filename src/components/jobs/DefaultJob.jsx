import { useState } from "react";
import JobCards from "../JobCards";
import JobHeader from "../JobHeader";

const DefaultJob = () => {
  // This state is for the actual filters used for searching
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    lgbtq: true,
  });
  // This state is for the input fields (controlled by JobHeader)
  const [filtersInput, setFiltersInput] = useState({
    search: "",
    location: "",
    lgbtq: true, // Default to LGBTQ+ to match JobHeader's default selection
  });

  // Only update filters (and thus trigger search) when Find Job is clicked
  const handleFindJob = () => {
    setFilters(filtersInput);
  };

  return (
    <div className="w-full">
      <JobHeader filters={filtersInput} setFilters={setFiltersInput} onFindJob={handleFindJob} />
      <div className="mt-4 flex flex-col gap-4">
        <JobCards filters={filters} />
      </div>
    </div>
  );
};

export default DefaultJob;
