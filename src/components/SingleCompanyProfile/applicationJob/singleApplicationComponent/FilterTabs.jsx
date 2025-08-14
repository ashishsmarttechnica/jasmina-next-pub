import { useTranslations } from "next-intl";

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const t = useTranslations("Applications");
  const tabs = [
    { id: "all", label: t("tabs.all") },
    { id: "0", label: t("tabs.new") },
    { id: "1", label: t("tabs.reviewed") },
    { id: "2", label: t("tabs.interviewed") },
    { id: "3", label: t("tabs.approved") },
    { id: "4", label: t("tabs.rejected") },
    { id: "5", label: t("tabs.hired") },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2 sm:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] ${activeTab === tab.id ? "font-medium" : ""
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
