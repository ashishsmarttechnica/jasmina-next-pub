"use client";
import { getAllMemberships } from "@/api/membership.api";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaymentModal from "../../../modal/PaymentModal";
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
  console.log(membershipData, "membershipData");
  // Initialize Stripe outside of render
  // const [stripePromise] = useState(() => loadStripe(import.meta.env.VITE_PK_PAYMENT_KEY || ""));
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const [paymentScreen, setPaymentScreen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [stripeElement, setStripeElement] = useState(null);

  const handleUpgrade = (plan) => {
    if (plan) {
      console.log("Setting selected plan:", plan);
      setSelectedPlan(plan);
      console.log("Opening payment screen");
      setPaymentScreen(true);
    }
  };

  // Only initialize Stripe element when payment modal is opened
  useEffect(() => {
    if (selectedPlan) {
      const initializeStripeElement = async () => {
        const appearance = {
          variables: {
            fontFamily: "Sohne, system-ui, sans-serif",
            fontWeightNormal: "500",
            borderRadius: "8px",
            colorPrimary: "#7C81EB",
            colorText: "white",
            colorTextSecondary: "white",
            colorTextPlaceholder: "#727F96",
            tabIconColor: "white",
            tabIconSelectedColor: "#1A1B25",
            logoColor: "dark",
          },
          rules: {
            ".Tab": {
              backgroundColor: "#0A2540",
            },
            ".Tab--selected": {
              backgroundColor: "#7C81EB",
              color: "#1A1B25",
            },
            ".Input": {
              backgroundColor: "transparent",
              border: "1.5px solid #7C81EB",
            },
          },
        };

        try {
          const stripe = await stripePromise;
          if (!stripe) {
            console.error("Failed to initialize Stripe");
            return;
          }

          const elements = stripe.elements({ appearance });
          const card = elements.create("card", {
            style: {
              base: {
                fontFamily: appearance.variables.fontFamily,
                fontWeight: appearance.variables.fontWeightNormal,
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
                backgroundColor: "transparent",
                padding: "12px",
                ":-webkit-autofill": {
                  color: "#424770",
                },
              },
              invalid: {
                color: "#9e2146",
                ":focus": {
                  color: "#9e2146",
                },
              },
            },
          });

          console.log("Mounting card element...");
          card.mount("#card-element");
          console.log("Card element mounted");
          setStripeElement(card);
        } catch (error) {
          console.error("Error initializing Stripe:", error);
          toast.error("Failed to initialize payment form. Please try again.");
        }
      };

      initializeStripeElement();
    }
  }, [paymentScreen, selectedPlan, stripePromise]);

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

  // Check for Stripe key before rendering
  // if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  //   return (
  //     <div className="flex h-[400px] items-center justify-center">
  //       <div className="text-red-500">
  //         Payment system configuration error. Please contact support.
  //       </div>
  //     </div>
  //   );
  // }

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
            handleUpgrade={() => handleUpgrade(plan)}
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

      <PaymentModal
        stripePromise={stripePromise}
        paymentModal={paymentScreen}
        selectedPlan={selectedPlan}
        setPaymentModal={setPaymentScreen}
        setSuccessModal={setSuccessModal}
        successModal={successModal}
        stripeElement={stripeElement}
        loginUser={membershipData?.user} // Pass user data from API response
      />
    </div>
  );
};

export default Subscription;
