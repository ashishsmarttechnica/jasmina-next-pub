// src/store/post.store.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePostStore = create(
  devtools(
    (set) => ({
      posts: [],
      selectedPost: null,
       pagination: null,

      setPosts: (posts) => set({ posts }),
      setSelectedPost: (post) => set({ selectedPost: post }),
      setPagination: (pagination) => set({ pagination }),

      addPost: (newPost) =>
        set((state) => ({
          posts: [newPost, ...state.posts],
        })),
    }),
    { name: "PostStore" }
  )
);

export default usePostStore;
