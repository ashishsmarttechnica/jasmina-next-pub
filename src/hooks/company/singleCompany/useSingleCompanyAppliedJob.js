import { getCompanyAppliedJob } from "@/api/company.api";
import useSingleCompanyAppliedJobStore from "@/store/singleCopanyAppliedJob.store";
import { useQuery } from "@tanstack/react-query";

const useSingleCompanyAppliedJob = (id, searchQuery = "", status = "") => {
  const { appliedJobs, setAppliedJobs, setPagination } = useSingleCompanyAppliedJobStore();
  return useQuery({
    queryKey: ["singleCompanyAppliedJob", id, searchQuery, status],
    queryFn: async () => {
      const res = await getCompanyAppliedJob(id, searchQuery, status, 1, 100);

      if (res.success) {
        const newData = res.data.jobs || [];
        const pagination = res.data.pagination;

        setAppliedJobs(newData);
        setPagination(pagination);

        return {
          data: newData,
          pagination: pagination,
        };
      }

      throw new Error(res?.message || "Failed to fetch applied jobs");
    },
    select: (res) => res.data,
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useSingleCompanyAppliedJob;
