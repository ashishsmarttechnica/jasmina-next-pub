import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  placeholder = "Search job post",
  searchValue = "",
  onSearch,
  onSearchSubmit,
  isSearching = false,
}) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchValue(value);
    // Don't call onSearch here - only update local state
  };

  const handleSearchClick = () => {
    // Only call onSearch and onSearchSubmit when button is clicked
    onSearch(localSearchValue);
    onSearchSubmit();
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    onSearch("");
    onSearchSubmit();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(localSearchValue);
      onSearchSubmit();
    }
  };

  // Update local state when searchValue prop changes
  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center rounded-md bg-white px-3 py-2 sm:max-w-xs md:max-w-sm lg:max-w-[224px] xl:max-w-[210px]">
        <FiSearch className="mr-2 text-xl text-gray-500 sm:text-2xl" />
        <input
          type="text"
          placeholder={placeholder}
          value={localSearchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none sm:text-base"
        />
        {/* {localSearchValue && (
          <button
            onClick={handleClearSearch}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
            title="Clear search"
          >
            <FiX size={16} />
          </button>
        )} */}
      </div>
      <div>
        <button
          onClick={handleSearchClick}
          disabled={isSearching}
          className={`bg-primary mx-3 rounded-sm px-3 py-2 text-[13px] text-white sm:mt-2 ${
            isSearching ? "cursor-not-allowed opacity-50" : "hover:bg-primary/90"
          }`}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
