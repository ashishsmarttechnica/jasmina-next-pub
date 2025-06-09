"use client";
import React, { useState } from "react";
import CreatePost from "@/common/CreatePost";
import RecentJobs from "./RecentJobs";
import DynamicPost from "./DynamicPost";
import { useAllPosts } from "@/hooks/post/usePosts";
import usePostStore from "@/store/post.store";
import { useTranslations } from "next-intl";
import PostSkeleton from '@/common/skeleton/PostSkeleton';



const FeedPost = ({ isUser = false }) => {
  const t = useTranslations("FeedComment")
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
        {isUser &&
          <CreatePost />
        }
        {renderSkeletons()}
      </div>
    );
  }

  // Show error message
  if (isError) {
    return (
      <div className="w-full xl:max-w-[547px]">
        {isUser &&
          <CreatePost />
        }
        <div className="text-center py-10 text-red-500 bg-white rounded-lg shadow p-4">
          <p className="font-bold mb-2">{t("errorposts")}</p>
          <p>{error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPage(1)}
          >
            {t("tryagain")}
          </button>
        </div>
      </div>
    );
  }

  // Handle no posts case
  if (!posts?.length) {
    return (
      <div className="w-full xl:max-w-[547px]">
       {isUser &&
          <CreatePost />
        }
        <div className="text-center py-10 bg-white rounded-lg shadow p-4">
          {t("nofound")}
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
       {isUser &&
          <CreatePost />
        }
      <div className="w-full xl:max-w-[547px] space-y-6">
        {posts.map((post, index) => (
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
        {!isFetching && pagination.total > posts.length && (
          <div className="flex justify-center">
            <button
              className="px-4 py-1 text-center bg-primary text-white rounded"
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
