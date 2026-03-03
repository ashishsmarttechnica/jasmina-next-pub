"use client";
import useNotificationStore from "@/store/notification.store";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
const useGetNotifications = () => {
  const { notifications, loading, error, fetchNotifications, page, hasMore } =
    useNotificationStore();
  const viewerId = Cookies.get("userId");
  const limit = 100000; // Load all so we can control visibility with `visibleCount`
  useEffect(() => {
    fetchNotifications(viewerId, 1, limit, false);
  }, [fetchNotifications, viewerId]);



  return { notifications, loading, error };
};

const Notification = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const { notifications, loading, error } = useGetNotifications();
  const t = useTranslations("Jobs");

  const notificationList = Array.isArray(notifications?.results)
    ? notifications.results
    : Array.isArray(notifications)
      ? notifications
      : [];

  const visibleNotifications = notificationList.slice(0, visibleCount);

  return (
    <div className="items-center justify-center rounded-lg">
      <div className="flex flex-col">
        {loading && notificationList.length === 0 && (
          <div className="py-4 text-center text-gray-500">Loading...</div>
        )}
        {error && <div className="py-4 text-center text-red-500">{error}</div>}
        {!loading && !error && notificationList.length === 0 && (
          <div className="py-4 text-center text-gray-500">No notifications found.</div>
        )}

        {visibleNotifications.map((n, i) => (
          <div
            key={n._id || i}
            className="flex items-center justify-between bg-white px-6 py-4 shadow-sm"
          >
            <div>
              <div className="font-semibold text-gray-900">{n.title}</div>
              <div className="mt-1 text-gray-600">{n.description}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="whitespace-nowrap text-gray-400">
                {new Date(n.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < notificationList.length && (
        <button
          className="mx-auto mt-5 flex items-center justify-center rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
          onClick={() => setVisibleCount((prev) => prev + 5)}
        >
          {t("loadMore")}
        </button>
      )}

      {visibleCount >= notificationList.length && notificationList.length > 0 && (
        <div className="mt-2 text-center text-gray-500">
          <p>No more notifications to load.</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
