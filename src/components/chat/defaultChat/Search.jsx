import { LuSearch } from "react-icons/lu";

export default function Search({ value, onChange, placeholder = "Search messages" }) {
  return (
    <div className="flex py-1.5 items-center px-2 text-[#888DA8] border border-[#888DA8] rounded gap-3">
      <LuSearch className="w-[16px] h-[16px]" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full font-normal text-xs outline-none placeholder:text-[#888DA8]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
} 