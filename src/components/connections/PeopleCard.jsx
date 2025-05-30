import ImageFallback from "@/common/shared/ImageFallback";
import { useRemoveConnection } from "@/hooks/connections/useConnections";
import { useRouter } from "@/i18n/navigation";
import getImg from "@/lib/getImg";
import useConnectionsStore from "@/store/connections.store";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const PeopleCard = ({ person }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { mutate: removeConnection, isPending } = useRemoveConnection();
  const { connections, setConnections } = useConnectionsStore();
  const router = useRouter();

  const handleProfile = (user) => {
    router.push(`/single-user/${user._id}`);
  };

  const handleRemove = (user) => {
    setIsRemoving(true);

    removeConnection(
      { id: user.connectionId, role: user.connectionType },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Only remove from store after successful API response
            const updatedConnections = connections.filter((conn) => conn._id !== person._id);
            setConnections(updatedConnections);
          } else {
            toast.error("Failed to remove connection");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to remove connection");
        },
        onSettled: () => {
          setIsRemoving(false);
        },
      }
    );
  };

  return (
    <div
      className={`flex items-center justify-between border-b border-black/10 bg-white px-2 py-4 transition-all duration-300 hover:bg-gray-50 ${
        isRemoving ? "translate-x-full transform opacity-0" : ""
      }`}
    >
      {/* Avatar and Info */}
      <div
        className="flex min-w-0 cursor-pointer items-center gap-4"
        onClick={() => handleProfile(person?.details)}
      >
        <ImageFallback
          src={person?.details?.profile?.photo && getImg(person?.details?.profile?.photo)}
          width={48}
          height={48}
          alt={person?.details?.profile?.fullName}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div
            className="text-custBlack cursor-pointer truncate font-semibold"
            onClick={() => handleProfile(person?.details)}
          >
            {person?.details?.profile?.fullName}
          </div>
          <div className="text-grayBlueText truncate text-sm">
            {person?.details?.preferences?.jobRole}
          </div>
          <div className="text-grayBlueText mt-0.5 flex items-center gap-1 text-xs">
            <FaMapMarkerAlt className="text-primary" />
            <span className="truncate">{person?.details?.profile?.location}</span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex min-w-[140px] flex-col items-end">
        <div className="mb-1 flex gap-2">
          <button className="text-primary border-primary hover:bg-primary rounded border px-4 py-1 text-sm font-medium transition hover:text-white">
            Message
          </button>
          <button
            onClick={() => handleRemove(person)}
            disabled={isPending}
            className="text-grayBlueText border-grayBlueText/40 rounded border px-4 py-1 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
        <div className="text-grayBlueText text-xs">Connected on 10 March 2025</div>
      </div>
    </div>
  );
};

export default PeopleCard;
