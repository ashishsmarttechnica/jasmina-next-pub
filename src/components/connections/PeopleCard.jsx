import getImg from "@/lib/getImg";
import Image from "next/image";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import noImage2 from "@/assets/form/noImage2.webp";
import { toast } from "react-toastify";
import { useRemoveConnection } from "@/hooks/connections/useConnections";
import useConnectionsStore from "@/store/connections.store";

const PeopleCard = ({ person }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { mutate: removeConnection, isPending } = useRemoveConnection();
  const { connections, setConnections } = useConnectionsStore();

  const handleRemove = (user) => {
    setIsRemoving(true);

    removeConnection(
      { id: user.connectionId, role: user.connectionType },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Only remove from store after successful API response
            const updatedConnections = connections.filter(
              (conn) => conn._id !== person._id
            );
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
      className={`flex items-center justify-between py-4 px-2 border-b border-black/10 bg-white hover:bg-gray-50 transition-all duration-300 ${
        isRemoving ? "opacity-0 transform translate-x-full" : ""
      }`}
    >
      {/* Avatar and Info */}
      <div className="flex items-center gap-4 min-w-0">
        <Image
          src={
            person.details.profile.photo
              ? getImg(person.details.profile.photo)
              : noImage2
          }
          width={48}
          height={48}
          alt={person.details.profile.fullName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="font-semibold text-custBlack truncate">
            {person.details.profile.fullName}
          </div>
          <div className="text-sm text-grayBlueText truncate">
            {person.details.preferences.jobRole}
          </div>
          <div className="flex items-center gap-1 text-xs text-grayBlueText mt-0.5">
            <FaMapMarkerAlt className="text-primary" />
            <span className="truncate">{person.details.profile.location}</span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col items-end min-w-[140px]">
        <div className="flex gap-2 mb-1">
          <button className="px-4 py-1 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition">
            Message
          </button>
          <button
            onClick={() => handleRemove(person)}
            disabled={isPending}
            className="px-4 py-1 text-sm font-medium text-grayBlueText border border-grayBlueText/40 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
        <div className="text-xs text-grayBlueText">
          Connected on 10 March 2025
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
