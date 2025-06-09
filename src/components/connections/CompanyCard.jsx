import ImageFallback from "@/common/shared/ImageFallback";
import { useRemoveConnection } from "@/hooks/connections/useConnections";
import { useRouter } from "@/i18n/navigation";
import getImg from "@/lib/getImg";
import useConnectionsStore from "@/store/connections.store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const CompanyCard = ({ company }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { mutate: removeConnection, isPending } = useRemoveConnection();
  const { connections, setConnections } = useConnectionsStore();
  const router = useRouter();
  const t = useTranslations("UserProfile.profile.singleprofileTab");
  const handleProfile = (company) => {
    router.push(`/company/single-company/${company._id}`);
  };

  const handleRemove = (company) => {
    setIsRemoving(true);

    removeConnection(
      { id: company.connectionId, role: company.connectionType },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Only remove from store after successful API response
            const updatedConnections = connections.filter((conn) => conn._id !== company._id);
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
      className={`flex flex-col justify-between border-b border-black/10 bg-white px-2 py-4 transition-all duration-300 hover:bg-gray-50 sm:flex-row sm:items-center ${isRemoving ? "translate-x-full transform opacity-0" : ""
        }`}
    >
      {/* Logo and Info */}
      <div
        className="flex w-full min-w-0 cursor-pointer items-center gap-4 sm:w-auto"
        onClick={() => handleProfile(company.details)}
      >
        <ImageFallback
          src={company.details.logoUrl && getImg(company.details.logoUrl)}
          width={48}
          height={48}
          alt={company.details?.companyName || "Company"}
          className="h-12 w-12 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <div
            className="text-custBlack cursor-pointer truncate font-semibold"
            onClick={() => handleProfile(company.details)}
          >
            {company.details?.companyName}
          </div>
          <div className="text-grayBlueText truncate text-sm">{company.details?.industryType}</div>
          <div className="text-grayBlueText mt-0.5 flex items-center gap-1 text-xs">
            <FaMapMarkerAlt className="text-primary" />
            <span className="truncate">
              {" "}
              {company.details?.city}, {company.details?.country}
            </span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col gap-[10px]">
        <div className="mt-3 flex w-full flex-col gap-3 sm:mt-0 sm:w-auto sm:min-w-[140px] sm:flex-row sm:items-center">
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button className="text-primary border-primary hover:bg-primary w-full rounded border px-4 py-1.5 text-sm font-medium transition hover:text-white sm:w-auto">
              {t("message")}
            </button>
            <button
              onClick={() => handleRemove(company)}
              disabled={isPending}
              className="text-grayBlueText border-grayBlueText/40 w-full rounded border px-4 py-1.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isPending ? t("removing") : t("remove")}
            </button>
          </div>
        </div>
        <div className="text-grayBlueText text-center text-xs sm:text-right">
         {company.details.createdAt &&
            `${t("connecton")} ${new Date(company.details.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}`}
        </div>

      </div>
    </div>
  );
};

export default CompanyCard;
