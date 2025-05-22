import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import getImg from "@/lib/getImg";
import noImage2 from "@/assets/form/noImage2.webp";
import { toast } from "react-toastify";
import { useRemoveConnection } from "@/hooks/connections/useConnections";
import useConnectionsStore from "@/store/connections.store";

const CompanyCard = ({ company }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { mutate: removeConnection, isPending } = useRemoveConnection();
  const { connections, setConnections } = useConnectionsStore();

  const handleRemove = (company) => {
    setIsRemoving(true);

    removeConnection(
      { id: company.connectionId, role: company.connectionType },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Only remove from store after successful API response
            const updatedConnections = connections.filter(
              (conn) => conn._id !== company._id
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
      {/* Logo and Info */}
      <div className="flex items-center gap-4 min-w-0">
        <Image
          src={
            company.details?.profile?.photo
              ? getImg(company.details.profile.photo)
              : noImage2
          }
          width={48}
          height={48}
          alt={company.details?.profile?.companyName || "Company"}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <div className="font-semibold text-custBlack truncate">
            {company.details?.profile?.companyName}
          </div>
          <div className="text-sm text-grayBlueText truncate">
            {company.details?.preferences?.industryType}
          </div>
          <div className="flex items-center gap-1 text-xs text-grayBlueText mt-0.5">
            <FaMapMarkerAlt className="text-primary" />
            <span className="truncate">
              {company.details?.profile?.location}
            </span>
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
            onClick={() => handleRemove(company)}
            disabled={isPending}
            className="px-4 py-1 text-sm font-medium text-grayBlueText border border-grayBlueText/40 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
        <div className="text-xs text-grayBlueText">
          Connected on {new Date(company.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
