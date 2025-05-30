import postImg from "@/assets/feed/post-1.png";
import user from "@/assets/feed/user-1.png";
import CommentSkeleton from "@/common/skeleton/CommentSkeleton";
import CommentInput from "@/components/user/feed/comment/CommentInput";
import { useCommentsByPostId, useCreateComment } from "@/hooks/comment/useComments";
import usePostStore from "@/store/post.store";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import CompanyCommentList from "./CompanyCommentList";


const FeedComment = ({ postId }) => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({ hasNextPage: false });
  const [newComment, setNewComment] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const { mutate: createComments } = useCreateComment();
  const setAddCommentCount = usePostStore((s) => s.setAddCommentCount);
  const t = useTranslations("FeedComment");
  const { data, isLoading, isError, error } = useCommentsByPostId(postId, true, page);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const submittedComment = {
      userId: Cookies.get("userId"),
      postId: postId,
      text: newComment,
      userType: "Company",
    };

    createComments(submittedComment, {
      onSuccess: (data) => {
        setNewComment("");
        setComments((prev) => [data.data, ...prev]);
        setAddCommentCount(postId);
      },
    });
  };

  const loadMoreComments = () => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (data) {
      const hasNext = data.pagination.page < data.pagination.pages;

      setComments(data.newComments);

      setPagination({ hasNextPage: hasNext });
      setLoadingMore(false);
    }
  }, [data]);

  if (isLoading && page === 1) {
    return <CommentSkeleton />;
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

  return (
    <div className="border-t border-black/10">
      <div className="h-full max-h-[400px] overflow-y-auto no-scrollbar pt-2">
        <CompanyCommentList comments={comments} />

        {pagination.hasNextPage && (
          <div className="flex p-4">
            <button
              onClick={loadMoreComments}
              disabled={loadingMore}
              className="px-4 py-1 text-sm font-medium text-primary hover:text-white bg-secondary border border-primary rounded hover:bg-primary/80 disabled:text-white disabled:bg-primary/60 transition-all duration-200"
            >
              {loadingMore ? "Loading..." : "Load More Comments"}
            </button>
          </div>
        )}
      </div>

      <CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default React.memo(FeedComment);
