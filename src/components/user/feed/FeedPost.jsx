"use client";
import CreatePost from "@/common/CreatePost";
import PostSkeleton from "@/common/skeleton/PostSkeleton";
import { useAllPosts } from "@/hooks/post/usePosts";
import usePostStore from "@/store/post.store";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import DynamicPost from "./DynamicPost";
import RecentJobs from "./RecentJobs";
import Cookies from "js-cookie";
const FeedPost = ({ isUser = false }) => {
  const t = useTranslations("FeedComment");
  const [page, setPage] = useState(1);
  const posts = usePostStore((s) => s.posts);
  const pagination = usePostStore((s) => s.pagination);
  const resetPosts = usePostStore((s) => s.resetPosts);
  console.log(pagination, "pagination||||||");
  console.log("Current page:", page);
  console.log("Posts length:", posts?.length);
  const userType = Cookies.get("userRole");

  const { data, isLoading, isError, error, isFetching } = useAllPosts(page);

  // Reset store when component mounts
  useEffect(() => {
    resetPosts();
  }, [resetPosts]);

  // Function to render skeleton loaders
  const renderSkeletons = (count = 3) => {
    return (
      <div className="w-full space-y-6 xl:max-w-[547px]">
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
      <div className="w-full space-y-6 xl:max-w-[547px]">
        {isUser && <CreatePost />}
        {renderSkeletons()}
      </div>
    );
  }

  // Show error message
  if (isError) {
    return (
      <div className="w-full xl:max-w-[547px]">
        {isUser && <CreatePost />}
        <div className="rounded-lg bg-white p-4 py-10 text-center text-red-500 shadow">
          {/* <p className="mb-2 font-bold">{t("errorposts")}</p> */}
          {/* <p>{error.message}</p> */}
          {/* <button
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => setPage(1)}
          >
            {t("tryagain")}
          </button> */}
        </div>
      </div>
    );
  }

  // Handle no posts case
  if (!posts?.length) {
    return (
      <div className="w-full xl:max-w-[547px]">
        {isUser && <CreatePost />}
        <div className="rounded-lg bg-white p-4 py-10 text-center shadow">{t("nofound")}</div>
      </div>
    );
  }

  // Load more button handler
  const loadMorePosts = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {isUser && <CreatePost />}
      <div className="w-full space-y-6 xl:max-w-[547px]">
        {posts.map((post, index) => (
          <React.Fragment key={post._id + index}>
            {index === 1 && userType=="user" && <RecentJobs post={post} />}
            <DynamicPost post={post} />
          </React.Fragment>
        ))}

        {/* Show loader at bottom when fetching next page */}
        {isFetching && !isLoading && (
          <div className="rounded-lg bg-white p-4 py-4 text-center shadow">
            {renderSkeletons(1)}
          </div>
        )}

        {/* Load more button */}
        {!isFetching && pagination?.total && page < pagination?.totalPages && (
          <div className="flex justify-center">
            <button
              className="bg-primary rounded px-4 py-1 text-center text-white"
              onClick={loadMorePosts}
            >
              {t("loadmore")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPost;
