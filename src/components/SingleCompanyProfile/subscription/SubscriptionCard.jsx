import back from "@/assets/Subscription/back.png";
import Image from "next/image";

const SubscriptionCard = ({ title, price,handleUpgrade, eligibility, employeeRange, isActive }) => {
  return (
    <div
      className={`relative z-0 overflow-hidden rounded-lg bg-white p-6 ${!isActive ? "opacity-60" : ""}`}
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
          className={`bg-primary mx-auto flex items-center justify-center rounded-md px-6 py-2 text-white hover:bg-green-700 ${
            !isActive ? "cursor-not-allowed" : ""
          }`}
          disabled={!isActive}
          onClick={handleUpgrade}
        >
          {isActive ? "Get Started" : "Currently Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
//
