import axiosClient from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "rsuite";

const PaymentModal = ({
  stripePromise,
  paymentModal,
  selectedPlan,
  setPaymentModal,
  successModal,
  setSuccessModal,
  stripeElement,
  loginUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = paymentData;

    if (!email) {
      toast.error("Please fill in email field.");
      return;
    }

    if (!stripeElement) {
      toast.error("Payment form not initialized properly.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create payment intent with Stripe
      const stripe = await stripePromise;
      const { error: stripeError } = await stripeElement.submit();

      if (stripeError) {
        toast.error(stripeError.message);
        return;
      }

      // 2. Process the payment
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
        companyId: loginUser?._id, // Assuming loginUser._id is the company ID
        transactionId: paymentMethod.id,
        title: selectedPlan?.title,
        employeeRange: `${selectedPlan?.employeeRange?.min}-${selectedPlan?.employeeRange?.max}`,
        price: selectedPlan?.price,
        payment_status: "success",
      };

      const response = await axiosClient.post("/api/v1/purchase-plan", purchaseData);

      if (response.data.success) {
        setSuccessModal(true);
        setPaymentModal(false);
        toast.success("Payment successful! Your plan has been upgraded.");
        setPaymentData({ email: "" });
      } else {
        toast.error(response.data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed. Please try again.");
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

      <Modal open={successModal} onClose={() => setSuccessModal(false)}>
        <Modal.Header>
          <Modal.Title>Payment Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p className="mb-4">Your subscription has been successfully upgraded.</p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-primary hover:text-primary border-primary rounded-full border px-4 py-2 text-white hover:bg-white"
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentModal;
