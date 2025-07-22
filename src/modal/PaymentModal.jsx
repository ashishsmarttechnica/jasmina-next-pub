import { purchasePlan } from "@/api/membership.api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "rsuite";
import PreviousPlanCard from "../components/SingleCompanyProfile/previousplans/PreviousPlanCard";
import PaymentSuccessModal from "./PaymentSuccessModal";
const PaymentModal = ({
  stripePromise,
  paymentModal,
  selectedPlan,
  setPaymentModal,
  successModal,
  setSuccessModal,
  stripeElement,
  loginUser,
  companyId, // Add companyId to props
  onPlanPurchased, // Add callback prop
  currentPlan, // Add currentPlan to props
}) => {


  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: "",
  });
  const [purchasedPlan, setPurchasedPlan] = useState(null); // Add state for purchased plan
  const stripeCustomerId = Cookies.get("stripeCustomerId");
  const [activePlanModalOpen, setActivePlanModalOpen] = useState(false);
  const [activePlanModalError, setActivePlanModalError] = useState("");

  console.log(stripeCustomerId, "stripeCustomerId");
  // const { mutate, isPending, error } = useLogin();
  // console.log(mutate, "mutate");
  // Store stripeCustomerId from OTP verification in paymentData.custId
  // useEffect(() => {
  //   if (otpData && otpData.data && otpData.data.stripeCustomerId) {
  //     setPaymentData((prev) => ({
  //       ...prev,
  //       custId: otpData.data.stripeCustomerId,
  //     }));
  //   }
  // }, [otpData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = paymentData;

    // Prevent purchasing the same plan again
    if (currentPlan && selectedPlan && selectedPlan._id === currentPlan._id) {
      toast.error("You have already purchased this plan.");
      return;
    }

    if (!email) {
      toast.error("Please fill in email field.");
      return;
    }

    if (!stripeElement) {
      toast.error("Payment form not initialized properly.");
      return;
    }

    if (!stripePromise) {
      toast.error("Stripe is not properly configured.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create payment intent with Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to initialize Stripe");
      }

      // 2. Process the payment - Create payment method directly from the card element
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: stripeElement,
        billing_details: {
          email: email,
        },
      });

      if (paymentError) {
        toast.error(paymentError.message);
        return;
      }

      // 3. Call your backend API to process the purchase
      const purchaseData = {
        membershipId: selectedPlan?._id,
        companyId: companyId, // Use the passed companyId instead of loginUser._id
        title: selectedPlan?.title || "",
        price: Number(selectedPlan?.price) || 0,
        employeeRange: `${selectedPlan?.employeeRange?.min || 0}-${selectedPlan?.employeeRange?.max || 0}`,
        eligibility: selectedPlan?.eligibility || "Basic support",
        custId: stripeCustomerId, // Static value as requested
        email: email,
        payment_status: "success",
        transactionId: paymentMethod?.id || `txn_${Date.now()}`,
      };

      try {
        const response = await purchasePlan(purchaseData);

        if (response.success && response.plan) {
          setPurchasedPlan(response.plan); // Store the plan details
          setSuccessModal(true);
          setPaymentModal(false);
          toast.success("Payment successful! Your plan has been upgraded.");
          setPaymentData({ email: "" });
          if (onPlanPurchased) onPlanPurchased(response.plan); // Call parent callback
        } else {
          throw new Error(response.message || "Payment failed");
        }
      } catch (error) {
        console.error("API Error:", error);
        const errorMsg = error.response?.data?.message || error.message || "";
        // Check for the specific error message
        if (
          errorMsg ===
          "You already have an active plan. Please wait until it expires before purchasing a new one."
        ) {
          setActivePlanModalError(errorMsg);
          setActivePlanModalOpen(true);
        } else {
          toast.error(errorMsg || "Payment failed. Please try again.");
        }
        throw error;
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const wrapper = document.querySelector(".rs-modal-wrapper");
    if (wrapper) {
      wrapper.classList.add("custom-no-padding");
    }

    return () => {
      if (wrapper) {
        wrapper.classList.remove("custom-no-padding");
      }
    };
  }, [paymentModal]);

  return (
    <>
      <Modal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        className="modal-p-0 w-full select-none lg:max-w-[991px]"
      >
        <div className="px-4 pb-4">
          <div className="absolute top-0 right-0 z-20 p-2">{/* <SecureBanner /> */}</div>
          <div className="sticky top-0 z-10 bg-white pt-4 pb-4">
            <h4 className="mb-6 text-xl font-semibold text-gray-800">{selectedPlan?.title}</h4>
            <p className="text-gray-600">Subscription Plan Details</p>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2 text-gray-700">
              <div className="flex items-center justify-between rounded-md border border-slate-200 px-2 py-2">
                <div className="font-medium">👥 Employee Range:</div>
                <div>
                  {selectedPlan?.employeeRange?.min} - {selectedPlan?.employeeRange?.max}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border border-slate-200 px-2 py-2">
                <div className="font-medium">✨ Eligibility:</div>
                <div>{selectedPlan?.eligibility}</div>
              </div>

              <div className="flex items-center justify-between rounded-md border border-slate-200 px-2 py-2">
                <div className="font-medium">💰 Price:</div>
                <div className="font-semibold text-green-600">€{selectedPlan?.price}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="w-full">
              <label htmlFor="card-element" className="mb-1 ml-1 text-sm text-gray-600">
                Card Details
              </label>
              <div className="rounded-md border border-gray-300 bg-white p-0">
                <div
                  id="card-element"
                  className="min-h-[45px] w-full"
                  style={{ padding: "10px" }}
                ></div>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="email" className="mb-1 ml-1 text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:ring-1 focus:ring-black focus:outline-none"
                value={paymentData.email}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="xm:text-sm bg-primary hover:text-primary border-primary rounded-full border px-4 py-2 text-center text-xs font-medium text-white transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white sm:px-6 sm:leading-[28px] xl:text-[18px]"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Success Modal extracted to its own component */}
      <PaymentSuccessModal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        purchasedPlan={purchasedPlan}
      />

      <Modal
        open={activePlanModalOpen}
        onClose={() => setActivePlanModalOpen(false)}
        className="modal-p-0 w-full select-none lg:max-w-[900px]"
      >
        <div className="p-6 text-center">
          <h4 className="mb-4 text-lg font-semibold text-red-600">{activePlanModalError}</h4>
          <PreviousPlanCard companyId={companyId} />
          <button
            className="bg-primary hover:bg-primary/80 mt-6 rounded px-4 py-2 text-white"
            onClick={() => setActivePlanModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
