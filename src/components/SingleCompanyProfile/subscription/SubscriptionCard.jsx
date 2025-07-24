import { planRequest } from "@/api/membership.api";
import back from "@/assets/Subscription/back.png";
import Cookies from "js-cookie";
import Image from "next/image";
import Swal from "sweetalert2";

const SubscriptionCard = ({
  title,
  price,
  handleUpgrade,
  eligibility,
  employeeRange,
  isActive,
  isCurrentPlan,
  suitable,
  membershipActive,
  newMembershipId, // <-- add this prop
  queryClient, // <-- add queryClient
  companyId, // <-- add companyId
}) => {
  console.log(suitable, "suitablesuitablesuitablesuitable");

  // Add a handler for Request Admin
  const handleRequestAdmin = async () => {
    const companyId = Cookies.get("userId");
    if (!companyId) {
      Swal.fire({ icon: "error", title: "No company ID found", text: "Please login again." });
      return;
    }
    const { value: reason } = await Swal.fire({
      title: "Request Admin Approval",
      input: "textarea",
      inputLabel: "Reason for plan request",
      inputPlaceholder: "Enter your reason here...",
      inputAttributes: { "aria-label": "Reason" },
      showCancelButton: true,
      confirmButtonText: "Submit",
    });
    if (reason) {
      try {
        const res = await planRequest({
          companyId,
          newMembershipId,
          companyReason: reason,
        });
        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: "Request sent",
            text: "Your request has been sent to admin.",
          });
          if (queryClient && companyId) {
            queryClient.invalidateQueries(["memberships", companyId]); 
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "Message",
            text: res?.message || "Failed to send request.",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "warning",
          title: "Message",
          text: err?.response?.data?.message  || err.message ||  "Failed to send request.",
        });
      }
    }
  };

  return (
    <div className={`relative z-0 overflow-hidden rounded-lg bg-white p-6`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={back}
          alt="background"
          // fill
          className="h-[114.73px] w-[400px] object-cover"
          // height={90}
          // width={90}
          priority
        />
      </div>

      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-primary text-md font-medium">{title}</h3>
          <div className="text-primary mt-2 text-right text-[50px] font-bold">€{price}</div>
          <p className="mt-4 text-center text-gray-600">
            {eligibility}
            {employeeRange && (
              <span className="block text-sm">
                ({employeeRange.min} to {employeeRange.max} employees)
              </span>
            )}
          </p>
        </div>
        {suitable === true ? (
          membershipActive === true ? (
            <div className="text-center font-semibold text-green-600">This plan has active</div>
          ) : (
            <button
              className="bg-primary mx-auto flex items-center justify-center rounded-md px-6 py-2 text-white hover:bg-green-700"
              onClick={handleUpgrade}
            >
              Upgrade
            </button>
          )
        ) : (
          <button
            className="bg-primary mx-auto flex items-center justify-center rounded-md px-6 py-2 text-white hover:bg-green-700"
            onClick={handleRequestAdmin}
          >
            Request admin
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
//
