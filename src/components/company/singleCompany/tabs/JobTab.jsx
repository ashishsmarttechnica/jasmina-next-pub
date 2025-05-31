import { useTranslations } from "next-intl";

const JobTab = () => {
  const t= useTranslations("CompanyProfile.singleCompanyTab");
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="px-[30px] my-20">
          <p className="text-gray-500">{t("nosuggestion")}</p>
        </div>
      </div>
    </div>
  );
};

export default JobTab;
