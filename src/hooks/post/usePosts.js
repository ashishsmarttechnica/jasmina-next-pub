import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getPostById } from "@/api/post.api";
import usePostStore from "@/store/post.store";

export const useAllPosts = (page = 1) => {
  const setPosts = usePostStore((s) => s.setPosts);
  const posts = usePostStore((s) => s.posts);

  return useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await getAllPosts(page);
      // If it's the first page, replace posts, otherwise append
      const newPosts = page === 1 ? res.data : [...posts, ...res.data];
      setPosts(newPosts);
      return newPosts;
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
