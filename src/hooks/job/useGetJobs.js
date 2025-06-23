import { createJob, getJobs, getRecentJobs } from "@/api/job.api";
import useJobStore from "@/store/job.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllJobs = ({ search = "", location = "", lgbtq, page = 1, limit = 10 } = {}) => {
  const setJobs = useJobStore((s) => s.setJobs);
  const jobs = useJobStore((s) => s.jobs);
  const setLoading = useJobStore((s) => s.setLoading);
  const setError = useJobStore((s) => s.setError);

  return useQuery({
    queryKey: ["jobs", { search, location, lgbtq, page, limit }],
    queryFn: async () => {
      try {
        const res = await getJobs({ search, location, lgbtq, page, limit });

        // Extract data from response
        const data = res?.data || {};
        const newJobs = data?.jobs || [];
        const pagination = data?.pagination || {};

        // If it's the first page, replace jobs, otherwise append
        const mergedJobs = page === 1 ? newJobs : [...jobs, ...newJobs];

        // Update store
        setJobs(mergedJobs);
        setLoading(false);
        setError(null);

        // Calculate if we're on the last page based on pagination info
        const isLastPage = page >= (pagination.totalPages || 1);

        return {
          jobs: mergedJobs,
          pagination,
          isLastPage,
        };
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    keepPreviousData: true, // Keep previous data while fetching new page
  });
};

export const useRecentJobs = () => {
  const setJobs = useJobStore((s) => s.setJobs);
  const setLoading = useJobStore((s) => s.setLoading);
  const setError = useJobStore((s) => s.setError);

  return useQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      try {
        const res = await getRecentJobs();
        const jobs = res?.data?.jobs || [];

        setJobs(jobs);
        setLoading(false);
        setError(null);

        return jobs;
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const addJob = useJobStore((s) => s.addJob); // You might need to add this to your store

  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      if (data?.data) {
        // Add the new job to the store if addJob function exists
        if (addJob) {
          addJob(data.data);
        }
      }
      // Invalidate jobs queries to refetch
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error("Job creation failed:", error?.response?.data?.message || error.message);
    },
  });
};

// Legacy hook for backward compatibility
const useGetJobs = ({ search = "", location = "", lgbtq, page = 1, limit = 10 } = {}) => {
  const { data, isLoading, error } = useAllJobs({ search, location, lgbtq, page, limit });
  return { data, isLoading, error };
};

export default useGetJobs;
