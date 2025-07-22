"use client";
import useNotificationStore from "@/store/notification.store";
import { useEffect, useState } from "react";

const tabs = [
  { label: "Applications" },
  { label: "Chat Alerts" },
  { label: "Profile Suggestions" },
];

const useGetNotifications = () => {
  const { notifications, loading, error, fetchNotifications, page, hasMore } =
    useNotificationStore();
  const viewerId = "6875ce7685b46853a0f1d90c";
  const limit = 5;

  useEffect(() => {
    fetchNotifications(viewerId, 1, limit, false);
  }, [fetchNotifications, viewerId]);

  const loadMore = () => {
    fetchNotifications(viewerId, page + 1, limit, true);
  };

  return { notifications, loading, error, hasMore, loadMore };
};

const Notification = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { notifications, loading, error, hasMore, loadMore } = useGetNotifications();

  return (
    <div className="rounded-lg bg-white shadow">
      {/* Tabs */}
      {/* <div className="mb-6 flex gap-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`rounded-full border px-5 py-2 font-medium transition-all duration-150 ${
              activeTab === idx
                ? "border-green-400 bg-green-100 text-green-700"
                : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      {/* Notification List */}
      <div className="flex flex-col">
        {loading && notifications.length === 0 && (
          <div className="py-4 text-center text-gray-500">Loading...</div>
        )}
        {error && <div className="py-4 text-center text-red-500">{error}</div>}
        {!loading && !error && notifications.length === 0 && (
          <div className="py-4 text-center text-gray-500">No notifications found.</div>
        )}
        {!loading &&
          !error &&
          notifications.map((n, i) => (
            <div
              key={n._id || i}
              className="flex items-center justify-between bg-white px-6 py-4 shadow-sm"
            >
              <div>
                <div className="font-semibold text-gray-900">{n.title}</div>
                <div className="mt-1 text-gray-600">{n.description}</div>
              </div>
              <div className="flex items-center gap-4">
                {/* If you want to show createdAt as time, format as needed */}
                <div className="whitespace-nowrap text-gray-400">
                  {new Date(n.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        {hasMore && !loading && !error && (
          <button
            className="mx-auto mt-4 w-fit rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
        {!hasMore && notifications.length > 0 && (
          <div className="mt-2 text-center text-gray-500">
            <p>No more notifications to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
