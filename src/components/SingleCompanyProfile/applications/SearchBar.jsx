import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder = "Search job post" }) => {
  return (
    <div className="flex w-full items-center rounded-md bg-white px-3 py-2 sm:max-w-xs md:max-w-sm lg:max-w-[224px] xl:max-w-[210px]">
      <FiSearch className="mr-2 text-xl text-gray-500 sm:text-2xl" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none sm:text-base"
      />
    </div>
  );
};

export default SearchBar;
