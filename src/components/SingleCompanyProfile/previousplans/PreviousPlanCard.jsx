"use client";
import { usePreviousPlans } from "@/hooks/company/usePreviousPlans";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import PlanCard from "./PlanCard";

const PreviousPlanCard = ({ companyId }) => {
  const t = useTranslations("PreviousPlans");
  const { data, isLoading } = usePreviousPlans(companyId);
  const plans = data?.data || [];

  if (isLoading) {
    return (
      <div className="mx-auto flex h-[512px] min-h-[512px] w-[828px] min-w-[828px] items-center justify-center">
        <div className="text-center">{t("loading")}</div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="mx-auto flex h-[512px] min-h-[512px] w-[828px] min-w-[828px] items-center justify-center">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-white shadow-md">

          <svg
            className="text-primary-500 mb-4 h-16 w-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 48 48"
          >
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="#f3f4f6" />
            <path
              d="M16 28c0-4 8-4 8-8s-8-4-8-8"
              stroke="#a5b4fc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M32 20c0 4-8 4-8 8s8 4 8 8"
              stroke="#818cf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <p className="mb-2 text-center text-[20px] font-semibold text-gray-700">{t("emptyTitle")}</p>
          <p className="mb-6 max-w-xs text-center text-[15px] text-gray-500">{t("emptyDesc")}</p>
        </div>
      </div>
    );
  }
  //
  return (
    <div className="mx-auto">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl">
        <h2 className="mb-2 text-center text-[22px] font-bold">{t("title")}</h2>
        <p className="mx-auto mb-8 w-full max-w-none text-center text-[13px] text-gray-600">{t("subtitle")}</p>
        <div className="grid grid-cols-1 justify-items-center gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              title={plan.title}
              dateRange={`${format(new Date(plan.purchase_date), "dd MMMM yyyy")} – ${format(new Date(plan.expire_date), "dd MMMM yyyy")}`}
              price={`€${plan.price}`}
            // status={plan.payment_status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousPlanCard;
