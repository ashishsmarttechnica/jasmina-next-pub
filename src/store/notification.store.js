import { getNotifications } from "@/api/notification.api";
import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  setNotifications: (notifications) => set({ notifications }),
  appendNotifications: (newNotifications) =>
    set((state) => ({ notifications: [...state.notifications, ...newNotifications] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  fetchNotifications: async (viewerId, page = 1, limit = 5, append = false) => {
    set({ loading: true, error: null });
    try {
      const res = await getNotifications(viewerId, page, limit);
      const newNotifications = res.data || [];
      if (append) {
        get().appendNotifications(newNotifications);
      } else {
        set({ notifications: newNotifications });
      }
      set({
        loading: false,
        page,
        hasMore: newNotifications.length === limit,
      });
    } catch (error) {
      set({ error: "Failed to fetch notifications", loading: false });
    }
  },
}));

export default useNotificationStore;
