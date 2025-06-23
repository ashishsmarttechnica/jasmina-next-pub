import {
  getSavedJob as getSavedJobApi,
  getSavedJobs as getSavedJobsApi,
  saveJob as saveJobApi,
} from "@/api/job.api";
import { create } from "zustand";

const useJobStore = create((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,
  pagination: {},
  setJobs: (jobs) => set({ jobs }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setPagination: (pagination) => set({ pagination }),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  clearJobs: () => set({ jobs: [], pagination: {} }),
  getSavedJobs: async ({ userId, onSuccess, onError }) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getSavedJobsApi(userId);

      // Extract jobs from savedJobs array
      if (response.data && response.data.savedJobs) {
        const savedJobs = response.data.savedJobs.map((item) => ({
          ...item.jobId,
          savedId: item._id,
          savedAt: item.createdAt,
        }));
        set({ jobs: savedJobs, isLoading: false });
      } else {
        set({ jobs: [], isLoading: false });
      }

      if (onSuccess) onSuccess(response);
    } catch (error) {
      set({ error, isLoading: false });
      if (onError) onError(error);
    }
  },
  getSavedJob: async ({ id, onSuccess, onError }) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getSavedJobApi(id);

      // Process the saved job data
      if (response.data && response.data.savedJobs && response.data.savedJobs.length > 0) {
        const savedJob = response.data.savedJobs[0];
        const jobData = {
          ...savedJob.jobId,
          savedId: savedJob._id,
          savedAt: savedJob.createdAt,
        };
        set({ jobs: [jobData], isLoading: false });
      } else {
        set({ jobs: [], isLoading: false });
      }

      if (onSuccess) onSuccess(response);
    } catch (error) {
      set({ error, isLoading: false });
      if (onError) onError(error);
    }
  },
  saveJob: async ({ jobId, userId, onSuccess, onError }) => {
    try {
      const res = await saveJobApi({ jobId, userId });
      // Optionally update jobs state here if you want to mark as saved/bookmarked
      if (onSuccess) onSuccess(res);
    } catch (error) {
      if (onError) onError(error);
    }
  },
}));

export default useJobStore;
