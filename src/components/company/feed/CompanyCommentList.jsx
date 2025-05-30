import { useTranslations } from "next-intl";
import CompanyCommentItem from "./CompanyCommentItem";

const CompanyCommentList = ({ comments }) => {
  const t = useTranslations("FeedComment");
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <p className="text-gray-500">{t("nocommit")}</p>
      </div>
    );
  }

  return comments.map((comment) => <CompanyCommentItem key={comment._id} comment={comment} />);
};

export default CompanyCommentList;
