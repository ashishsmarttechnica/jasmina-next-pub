import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSingleCompanyAppliedJobStore = create(
  devtools((set) => ({
    appliedJobs: [],
    selectedJob: null,
    pagination: null,

    setAppliedJobs: (appliedJobs) => set({ appliedJobs }),
    setSelectedJob: (selectedJob) => set({ selectedJob }),
    setPagination: (pagination) => set({ pagination }),
  }))
);

export default useSingleCompanyAppliedJobStore;
