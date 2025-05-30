const EmptyState = ({ activeTab }) => (
  <div className="text-grayBlueText p-4 text-center sm:p-6">
    No {activeTab === "people" ? "people" : "companies"} connections found
  </div>
);

export default EmptyState;
