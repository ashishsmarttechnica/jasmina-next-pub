"use client";
import { usePreviousPlans } from "@/hooks/company/usePreviousPlans";
import { format } from "date-fns";
import PlanCard from "./PlanCard";

const PreviousPlanCard = ({ companyId }) => {
  const { data, isLoading } = usePreviousPlans(companyId);
  const plans = data?.data || [];

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (plans.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="mx-auto w-full text-center text-[18px] text-gray-600">
          No Previous Plans Available
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="mb-2 text-center text-[22px] font-bold">Previous Plans</h2>
      <p className="mx-auto mb-8 w-full max-w-none text-center text-[13px] text-gray-600">
        Flexible monthly subscriptions tailored to your company's size and hiring needs.
      </p>
      <div className="grid grid-cols-1 justify-items-center gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            title={plan.title}
            dateRange={`${format(new Date(plan.purchase_date), "dd MMMM yyyy")} – ${format(new Date(plan.expire_date), "dd MMMM yyyy")}`}
            price={`€${plan.price}`}
            status={plan.payment_status}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousPlanCard;
