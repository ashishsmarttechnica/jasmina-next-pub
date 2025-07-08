import { BsThreeDotsVertical } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";

export default function ChatWindowHeader({ chat, onBack }) {
  return (
    <div className="bg-white flex items-center justify-between border-b border-slate-200 px-4 p-2">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden">
          <LuArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex flex-col">
          <div className="text-[13px] font-medium">{chat.name}</div>
          <div className="text-[14px] text-gray-500">{chat.role}</div>
        </div>
      </div>
      <button className="bg-[#CFE6CC] border border-transparent rounded-md py-1 px-1 hover:bg-transparent hover:border-[#0F8200] transition-colors duration-300">
        <BsThreeDotsVertical className="text-primary font-[14px]"/>
      </button>
    </div>
  );
} 