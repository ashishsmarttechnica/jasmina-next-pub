import { getSeoMeta } from "@/lib/seoMetadata";
import NotificationMainFeed from "../../../../components/notifications/NotificationMainFeed";

export const metadata = getSeoMeta({
  title: "Notifications | Jasmina",
  path: "/notifications",
});

const page = () => {
  return (
    <div className="py-5">
      <NotificationMainFeed />
    </div>
  );
};

export default page;
