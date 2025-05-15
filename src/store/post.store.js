// src/store/post.store.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePostStore = create(
  devtools(
    (set) => ({
      posts: [],
      selectedPost: null,
      setPosts: (posts) => set({ posts }),
      setSelectedPost: (post) => set({ selectedPost: post }),
    }),
    { name: "PostStore" }
  )
);

export default usePostStore;
