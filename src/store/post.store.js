// src/store/post.store.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePostStore = create(
  devtools(
    (set) => ({
      posts: [],
      selectedPost: null,
      pagination: null,
      hasMore: true,

      setPosts: (posts) => set({ posts }),
      setSelectedPost: (post) => set({ selectedPost: post }),
      setPagination: (pagination) => set({ pagination }),
      setHasMore: (hasMore) => set({ hasMore }),
      setAddCommentCount: (postId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post._id === postId
              ? { ...post, totalComment: (post.totalComment || 0) + 1 }
              : post
          ),
        })),
      // Add a new post to the beginning of the list
      addPost: (newPost) =>
        set((state) => ({
          posts: [newPost, ...state.posts],
        })),

      // Reset store (useful when navigating away or logging out)
      resetPosts: () =>
        set({
          posts: [],
          pagination: null,
          hasMore: true,
        }),
    }),
    { name: "PostStore" }
  )
);

export default usePostStore;
