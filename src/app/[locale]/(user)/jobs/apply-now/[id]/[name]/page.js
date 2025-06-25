import ApplyNowForm from "@/components/jobs/ApplyNowForm/ApplyNowForm";
import { getSeoMeta } from "@/lib/seoMetadata";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});

const page = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="my-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <ApplyNowForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
