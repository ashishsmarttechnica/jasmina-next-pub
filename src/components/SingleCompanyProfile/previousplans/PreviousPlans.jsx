import { useTranslations } from "next-intl";

const PreviousPlans = () => {
  const t = useTranslations("PreviousPlans");
  return (
    <div>
      {t("title")}
    </div>
  )
}

export default PreviousPlans;
