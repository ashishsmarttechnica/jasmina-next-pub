"use client";
import React, { useState } from "react";
import { useAllPosts } from "@/hooks/post/usePosts";
import usePostStore from "@/store/post.store";
import CompanyDynamicPost from "./CompanyDynamicPost";

// Skeleton loader component for posts
const PostSkeleton = ({ count = 1 }) => {
  return (
    <div className="w-full space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg shadow p-4 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-48 bg-gray-200 rounded-lg w-full mb-4"></div>
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

const CompanyFeedPost = () => {
  const [page, setPage] = useState(1);
  const posts = usePostStore((s) => s.posts);
  const pagination = usePostStore((s) => s.pagination);

  const { data, isLoading, isError, error, isFetching } = useAllPosts(page);

  // Function to render skeleton loaders
  const renderSkeletons = (count = 3) => {
    return (
      <div className="w-full xl:max-w-[547px] space-y-6">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <PostSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
    );
  };

  // Show loader for initial fetch
  if (isLoading) {
    return (
      <div className="w-full xl:max-w-[547px] space-y-6">
        {renderSkeletons()}
      </div>
    );
  }

  // Show error message
  if (isError) {
    return (
      <div className="w-full xl:max-w-[547px]">
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
  if (!posts?.length) {
    return (
      <div className="w-full xl:max-w-[547px]">
        <div className="text-center py-10 bg-white rounded-lg shadow p-4">
          No posts found.
        </div>
      </div>
    );
  }

  // Load more button handler
  const loadMorePosts = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="w-full xl:max-w-[547px] space-y-6">
        {posts.map((post, index) => (
          <React.Fragment key={post._id + index}>
            <CompanyDynamicPost post={post} />
          </React.Fragment>
        ))}

        {/* Show loader at bottom when fetching next page */}
        {isFetching && !isLoading && (
          <div className="text-center py-4 bg-white rounded-lg shadow p-4">
            {renderSkeletons(1)}
          </div>
        )}

        {/* Load more button */}
        {!isFetching && pagination.total > posts.length && (
          <div className="flex justify-center">
            <button
              className="px-4 py-1 text-center bg-primary text-white rounded"
              onClick={loadMorePosts}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyFeedPost;
