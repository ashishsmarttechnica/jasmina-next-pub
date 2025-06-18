import { getRecentJobs } from "@/api/job.api";
import useResentJobStore from "@/store/resentjob.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetResentJob = () => {
  const { setResentJobs, setLoading, setError } = useResentJobStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recentJobs"],
    queryFn: getRecentJobs,
  });

  useEffect(() => {
    if (data) {
      setResentJobs(data.data);
    }
    setLoading(isLoading);
    if (error) {
      setError(error);
    }
  }, [data, isLoading, error, setResentJobs, setLoading, setError]);

  return { data, isLoading, error };
};

export default useGetResentJob;
