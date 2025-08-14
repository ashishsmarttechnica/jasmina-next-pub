import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";

export default function ChatWindowHeader({ chat, onBack }) {
  // Keep only back + title UI in header; DND moved to CommonTitle (ChatConnection)
  const [_, __] = useState(false);
  useEffect(() => { }, []);

  // Check if this is a company chat by looking for companyName in the chat object
  // We need to check if the chat has company-related properties
  const isCompanyChat = chat && chat.companyName;

  const handleToggleChange = async (checked) => {


    if (!isCompanyChat || !chat?.companyId) {
      toast.error("Company information not available");
      return;
    }

    setLocalSwitchState(checked);

    try {
      console.log("ChatWindowHeader - Calling updateDndMode with companyId:", chat.companyId, "dndEnabled:", checked);
      // Call the API to update the company DND mode
      const success = await updateDndMode(chat.companyId, checked);

      console.log("ChatWindowHeader - updateDndMode result:", success);

      if (success) {
        toast.success(`DND mode ${checked ? 'enabled' : 'disabled'} successfully`);
      } else {
        // Revert the local state if API call failed
        setLocalSwitchState(!checked);
        toast.error("Failed to update DND mode");
      }
    } catch (error) {
      console.error("Failed to update DND mode:", error);
      // Revert the local state if API call failed
      setLocalSwitchState(!checked);
      toast.error("Failed to update DND mode. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white p-2 px-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden">
          <LuArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex flex-col">
          <div className="text-[13px] font-medium">{chat.name}</div>
          <div className="text-[14px] text-gray-500">{chat.role}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-md border border-transparent bg-[#CFE6CC] px-1 py-1 transition-colors duration-300 hover:border-[#0F8200] hover:bg-transparent">
          <BsThreeDotsVertical className="text-primary font-[14px]" />
        </button>
      </div>
    </div>
  );
}
