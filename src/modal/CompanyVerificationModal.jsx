import { useRouter } from "@/i18n/navigation";
import { Modal } from "rsuite";
import useAuthStore from "../store/auth.store";

const CompanyVerificationModal = ({ isOpen, onClose, message }) => {
  const subscriptionMessage =
    "You've used your 2 free job post. To post more, please upgrade your plan.";
  const expiredPlanMessage = "Your plan has expired. Please upgrade to continue.";
  const title =
    message === subscriptionMessage || message === expiredPlanMessage
      ? "Subscription Required"
      : "Verification Required";

  const router = useRouter();
  const { user } = useAuthStore();
  const userId = user?._id;
  const handleSubscriptionClick = () => {
    router.push(`/company/single-company/${userId}/subscription`);
    onClose && onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="sm"
      className="mx-auto w-full max-w-lg rounded-2xl !p-0"
    >
      <Modal.Header className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-white px-6 py-4">
        <Modal.Title className="text-xl font-bold text-gray-800">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="space-y-4 bg-white px-6 py-4">
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-end">
          {message === subscriptionMessage || message === expiredPlanMessage ? (
            <button
              onClick={handleSubscriptionClick}
              className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white transition-colors"
            >
              Subscription Purchase
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CompanyVerificationModal;
