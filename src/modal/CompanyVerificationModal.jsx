import { Modal } from "rsuite";

const CompanyVerificationModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="sm"
      className="mx-auto w-full max-w-lg rounded-2xl !p-0"
    >
      <Modal.Header className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-white px-6 py-4">
        <Modal.Title className="text-xl font-bold text-gray-800">Verification Required</Modal.Title>
      </Modal.Header>
      <Modal.Body className="space-y-4 bg-white px-6 py-4">
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CompanyVerificationModal;
