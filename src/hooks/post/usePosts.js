import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  postShare,
  SinglePostById,
  unlikePost,
} from "@/api/post.api";
import usePostStore from "@/store/post.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllPosts = (page = 1) => {
  const setPosts = usePostStore((s) => s.setPosts);
  const posts = usePostStore((s) => s.posts);
  const setPagination = usePostStore((s) => s.setPagination);

  return useQuery({
    queryKey: ["allPosts", page],
    queryFn: async () => {
      const res = await getAllPosts(page);

      // Your API directly returns the structure we need
      const data = res?.data || {};
      const newPosts = data?.posts || [];

      // Extract pagination info from the data object (not nested pagination)
      const pagination = {
        total: data?.total || 0,
        totalPages: data?.totalPages || 1,
        currentPage: data?.currentPage || page,
        pageSize: data?.pageSize || 10,
      };

      // If it's the first page, replace posts, otherwise append
      const mergedPosts = page === 1 ? newPosts : [...posts, ...newPosts];

      setPagination(pagination);
      setPosts(mergedPosts);

      // Debug logging
     // console.log("API Response:", res);
     // console.log("Extracted data:", data);
     // console.log("Pagination object:", pagination);

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
  const posts = usePostStore((s) => s.posts);

  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      try {
        // If id is provided, fetch that specific post
        if (id) {
          const res = await getPostById(id);
          setSelectedPost(res);
          return res;
        }
        // If no id is provided, get all posts fromfirst page
        else {
          const res = await getAllPosts(1);
          const data = res?.data || {};
          const posts = data?.posts || [];

          setSelectedPost(posts);
          // Return in the same format as a singuld be
          return {
            data: posts,
          };
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Return an empty array in the expected format to avoid undefined errors
        return { data: [] };
      }
    },
    enabled: true, // Always enabled even without id
    select: (res) => {
      return res?.data || [];
    },
    onSuccess: (data) => {
      setSelectedPost(data);
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
      console.error("Post creation failed:", error?.response?.data?.message || error.message);
    },
  });
};

export const useLikePost = () => {
  const posts = usePostStore((s) => s.posts);
  const setPosts = usePostStore((s) => s.setPosts);

  return useMutation({
    mutationFn: likePost,
    onSuccess: (data, id) => {
      if (data?.data) {
        const updatedPosts = posts.map((post) =>
          post._id === id ? { ...post, isLiked: true, totalLike: post.totalLike + 1 } : post
        );

        setPosts(updatedPosts);
      }
    },
    onError: (error) => {
      console.error("Post liking failed:", error?.response?.data?.message || error.message);
    },
  });
};

export const useUnlikePost = () => {
  const posts = usePostStore((s) => s.posts);
  const setPosts = usePostStore((s) => s.setPosts);

  return useMutation({
    mutationFn: unlikePost,
    onSuccess: (data, id) => {
      if (data?.data) {
        const updatedPosts = posts.map((post) =>
          post._id === id ? { ...post, isLiked: false, totalLike: post.totalLike - 1 } : post
        );

        setPosts(updatedPosts);
      }
    },
    onError: (error) => {
      console.error("Post unliking failed:", error?.response?.data?.message || error.message);
    },
  });
};

export const useSinglePost = (id) => {
  const setSinglePost = usePostStore((s) => s.setSinglePost);
  const posts = usePostStore((s) => s.posts);

  return useQuery({
    queryKey: ["singlePost", id],
    queryFn: async () => {
      if (!id) return null; // Handle case where no ID is provided

      const res = await SinglePostById(id);
      setSinglePost(res.data);

      // If the post is not in the local store, add it
      if (!posts.some((post) => post._id === id)) {
        usePostStore.getState().addPost(res);
      }

      return res;
    },
    enabled: !!id,
    select: (res) => res?.data || null,
    onSuccess: (data) => {
      setSinglePost(data);
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const usePostShare = () => {
  const posts = usePostStore((s) => s.posts);
  const setPosts = usePostStore((s) => s.setPosts);

  return useMutation({
    mutationFn: postShare,
    onSuccess: (data, id) => {
      if (data?.data) {
        const updatedPosts = posts.map((post) =>
          post._id === id ? { ...post, totalShare: (post.totalShare || 0) + 1 } : post
        );
        setPosts(updatedPosts);
      }
    },
    onError: (error) => {
      console.error("Post sharing failed:", error?.response?.data?.message || error.message);
    },
  });
};
