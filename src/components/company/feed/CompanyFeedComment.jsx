import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import user from "@/assets/feed/user-1.png";
import postImg from "@/assets/feed/post-1.png";
import { useCommentsByPostId } from "@/hooks/comment/useComments";
import useCommentStore from "@/store/comments.store";
import { useTranslations } from "next-intl";

const renderSkeletons = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Comment Block */}
      <div className="flex items-start gap-3 px-4 pb-5 border-b border-black/10">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <span className="absolute -bottom-1 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>

      {/* Input Field Skeleton */}
      <div className="px-4"></div>
    </div>
  );
};

const newpost = {
  id: 1,
  user: {
    name: "Collin Weiland",
    title: "Web Developer @Google",
    avatar: user,
    online: true,
  },
  content:
    "Lorem ipsum dolor sit amet, consectetur 😍😎 adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris consequat.",
  highlight: "laboris consequat",
  image: postImg,
  likes: 16,
  comments: 8,
  shares: 2,
  timeAgo: "5 hours ago",
  comment: {
    name: "James Spiegel",
    text:
      "Ratione voluptatem sequi unde soluta.   Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur",
    avatar: user,
  },
};

const FeedComment = ({ postId }) => {
  const [page, setPage] = useState(1);
  const comments = useCommentStore((s) => s.comments);
  const pagination = useCommentStore((s) => s.pagination);
  const t=useTranslations("FeedComment");



  const { data, isLoading, isError, error } = useCommentsByPostId(
    postId,
    true,
    page
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        {renderSkeletons()}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{t("nocommit")}</p>
      </div>
    );
  }

  const loadMoreComments = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex items-start gap-3 px-4 pb-5 border-b border-black/10">
        <div className="relative">
          <Image
            src={newpost?.comment.avatar}
            alt={newpost?.comment.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute -bottom-1 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[13px]">{newpost.comment.name}</p>
          <p className="text-xs font-normal tracking-tight leading-1.3 text-grayBlueText mt-0.5">
            {newpost.comment.text}
          </p>
        </div>
      </div>
      <div className="px-4">
        <input
          type="text"
          placeholder={t("commentPlaceholder")}
          className="py-4 w-full text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default React.memo(FeedComment);
