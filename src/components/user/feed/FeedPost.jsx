"use client";
import React, { useState } from "react";
import CreatePost from "@/common/CreatePost";
import RecentJobs from "./RecentJobs";
import user from "@/assets/feed/user-1.png";
import postImg from "@/assets/feed/post-1.png";
import Cookies from "js-cookie";
import DynamicPost from "./DynamicPost";
import { useAllPosts } from "@/hooks/post/usePosts";

// Skeleton loader component for posts
const PostSkeleton = () => (
  <div className="w-full bg-white rounded-lg shadow p-4 animate-pulse">
    <div className="flex items-center space-x-3 mb-4">
      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="h-40 bg-gray-200 rounded w-full mb-4"></div>
    <div className="flex justify-between">
      <div className="h-6 bg-gray-200 rounded w-16"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

const FeedPost = () => {
  const [page, setPage] = useState(1);
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useAllPosts(page);

  // Function to render skeleton loaders
  const renderSkeletons = (count = 3) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <PostSkeleton key={`skeleton-${index}`} />);
  };

  // Show loader for initial fetch
  if (isLoading) {
    return (
      <div className="w-full xl:max-w-[547px] space-y-6">
        <CreatePost />
        {renderSkeletons()}
      </div>
    );
  }

  // Show error message
  if (isError) {
    return (
      <div className="w-full xl:max-w-[547px]">
        <CreatePost />
        <div className="text-center py-10 text-red-500 bg-white rounded-lg shadow p-4">
          <p className="font-bold mb-2">Error loading posts</p>
          <p>{error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPage(1)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Handle no posts case
  // if (!posts?.posts?.length) {
  //   return (
  //     <div className="w-full xl:max-w-[547px]">
  //       <CreatePost />
  //       <div className="text-center py-10 bg-white rounded-lg shadow p-4">
  //         No posts found.
  //       </div>
  //     </div>
  //   );
  // }

  // Load more button handler
  const loadMorePosts = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <CreatePost />
      <div className="w-full xl:max-w-[547px] space-y-6">
        {posts.posts.map((post, index) => (
          <React.Fragment key={post._id + index}>
            {index === 1 && <RecentJobs post={post} />}
            <DynamicPost post={post} />
          </React.Fragment>
        ))}

        {/* Show loader at bottom when fetching next page */}
        {isFetching && !isLoading && (
          <div className="text-center py-4 bg-white rounded-lg shadow p-4">
            {renderSkeletons(1)}
          </div>
        )}

        {/* Load more button */}
        {/* {!isFetching && posts.pagination.total > posts.posts.length && ( */}
          <div className="flex justify-center">
            <button
              className="px-4 py-1 text-center bg-primary text-white rounded"
              onClick={loadMorePosts}
            >
              Load More
            </button>
          </div>
        {/* )} */}
      </div>
    </>
  );
};

export default FeedPost;
