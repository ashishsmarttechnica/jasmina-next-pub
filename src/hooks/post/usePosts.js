import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getAllPosts, getPostById } from "@/api/post.api";
import usePostStore from "@/store/post.store";

export const useAllPosts = (page = 1) => {
  const setPosts = usePostStore((s) => s.setPosts);
  const posts = usePostStore((s) => s.posts);
  const setPagination = usePostStore((s) => s.setPagination);

  return useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await getAllPosts(page);

      // Your API directly returns the structure we need
      const data = res?.data || {};
      const newPosts = data?.posts || [];
      const pagination = data?.pagination || {};

      // If it's the first page, replace posts, otherwise append
      const mergedPosts = page === 1 ? newPosts : [...posts, ...newPosts];

      setPagination(pagination);
      setPosts(mergedPosts);

      // Calculate if we're on the last page based on pagination info
      const isLastPage = page >= pagination.totalPages;

      return {
        newPosts: mergedPosts,
        pagination,
        isLastPage,
      };
    },
    retry: 1,
    refetchOnWindowFocus: false,
    keepPreviousData: true, // Keep previous data while fetching new page
  });
};

export const usePostById = (id) => {
  const setSelectedPost = usePostStore((s) => s.setSelectedPost);

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
    select: (res) => res.data,
    onSuccess: (data) => {
      setSelectedPost(data); // ✅ Save to Zustand
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const addPost = usePostStore((s) => s.addPost); // optional if you want to add to local state

  return useMutation({
    mutationFn: createPost,

    onSuccess: (data) => {
      if (data?.data) {
        addPost(data.data);
      }

      // queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error) => {
      console.error(
        "Post creation failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
};
