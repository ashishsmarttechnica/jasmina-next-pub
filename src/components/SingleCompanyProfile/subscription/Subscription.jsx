"use client";
import { getAllMemberships } from "@/api/membership.api";
import { useQuery } from "@tanstack/react-query";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  const {
    data: membershipData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: getAllMemberships,
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-primary">Loading subscriptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-red-500">Error loading subscriptions. Please try again later.</div>
      </div>
    );
  }

  const subscriptionPlans = membershipData?.data || [];

  return (
    <div className="p-2">
      <h2 className="mb-2 text-center text-[22px] font-medium">
        Choose the Right Plan for Your Hiring Needs
      </h2>
      <p className="mx-auto mb-8 max-w-[400px] text-center text-[13px] text-gray-600">
        Flexible monthly subscriptions designed to match your company size and recruitment goals.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard
            key={plan._id}
            title={plan.title}
            price={plan.price}
            eligibility={plan.eligibility}
            employeeRange={plan.employeeRange}
            isActive={plan.isActive}
          />
        ))}
      </div>

      {/* Current Plan Section */}
      {subscriptionPlans.length > 0 && (
        <div className="mt-8 rounded-lg bg-white px-20 py-4">
          <h3 className="mb-4 text-center text-xl font-semibold">Current Plan</h3>
          <p className="mx-auto mb-4 max-w-[400px] text-center text-gray-600">
            Flexible monthly subscriptions tailored to your company's size and hiring needs.
          </p>
          <div className="bg-primary flex items-center justify-between rounded-lg p-4 text-white">
            <div>
              <div className="font-semibold">{subscriptionPlans[0].title}</div>
              <div className="text-sm">
                Eligibility: {subscriptionPlans[0].employeeRange.min} to{" "}
                {subscriptionPlans[0].employeeRange.max} employees
              </div>
            </div>
            <div className="text-primary hover:bg-primary rounded-sm bg-white px-6 py-2 text-[18px] hover:text-white">
              €{subscriptionPlans[0].price}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
