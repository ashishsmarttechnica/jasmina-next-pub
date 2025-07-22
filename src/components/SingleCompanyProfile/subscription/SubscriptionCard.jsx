import back from "@/assets/Subscription/back.png";
import Image from "next/image";

const SubscriptionCard = ({
  title,
  price,
  handleUpgrade,
  eligibility,
  employeeRange,
  isActive,
  isCurrentPlan,
}) => {
  return (
    <div
      className={`relative z-0 overflow-hidden rounded-lg bg-white p-6`}
    >
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
        <button
          className={`mx-auto flex items-center justify-center rounded-md px-6 py-2 ${
            isCurrentPlan
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-primary text-white hover:bg-green-700"
          } ${!isCurrentPlan ? "cursor-not-allowed" : ""}`}
          disabled={isCurrentPlan}
          onClick={handleUpgrade}
        >
          {isCurrentPlan ? "Current Plan" :  "Get Started" }
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
//
