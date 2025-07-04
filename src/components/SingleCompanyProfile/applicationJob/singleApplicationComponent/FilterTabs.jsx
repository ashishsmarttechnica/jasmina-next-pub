const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All" },
    { id: "0", label: "New" },
    { id: "1", label: "Reviewed" },
    { id: "2", label: "Interviewed" },
    { id: "3", label: "Approved" },
    { id: "4", label: "Rejected" },
    { id: "5", label: "Hired" },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2 sm:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] ${
            activeTab === tab.id ? "font-medium" : ""
          } text-gray-600 shadow-sm sm:px-4`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
