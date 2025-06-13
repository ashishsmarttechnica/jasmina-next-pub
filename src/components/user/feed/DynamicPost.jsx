import noPostImage from "@/assets/feed/no-post.svg";
import Comment from "@/assets/svg/feed/Comment";
import FillLike from "@/assets/svg/feed/FillLike";
import Like from "@/assets/svg/feed/Like";
import LoaderIcon from "@/assets/svg/feed/LoaderIcon";
import Share from "@/assets/svg/feed/Share";
import ImageFallback from "@/common/shared/ImageFallback";
import { useLikePost, usePostShare, useUnlikePost } from "@/hooks/post/usePosts";
import { useRouter } from "@/i18n/navigation";
import { formatRelativeTime } from "@/lib/commondate";
import getImg from "@/lib/getImg";
import usePostStore from "@/store/post.store";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import FeedComment from "./comment/FeedComment";

const DynamicPost = ({ post, isSinglePost = false, onLike, onUnlike, isLiking, isUnliking }) => {
  const [showComments, setShowComments] = useState(false);
  const [shoeCommentBoxId, setShowCommentBoxId] = useState(null);
  const router = useRouter();
  const locale = useLocale();

  // Get store functions
  const posts = usePostStore((s) => s.posts);
  const setPosts = usePostStore((s) => s.setPosts);
  const singlePost = usePostStore((s) => s.singlePost);
  const setSinglePost = usePostStore((s) => s.setSinglePost);

  // Get mutations for non-single post view
  const { mutate: likePostMutation, isLoading: isLikingMutation } = useLikePost();
  const { mutate: unlikePostMutation, isLoading: isUnlikingMutation } = useUnlikePost();
  const { mutate: sharePost, isLoading: isShareLoading } = usePostShare();

  const fullName = post?.userId?.profile?.fullName || "Unknown User";
  const title = post?.userId?.preferences?.jobRole || "";
  const postTime = formatRelativeTime(post.createdAt);

  const handleShowComments = (id) => {
    setShowCommentBoxId(id);
    setShowComments((prev) => !prev);
  };

  const updatePostLikeState = (postId, userId, isLike = true) => {
    // Only update posts list if we're not in single post view
    if (posts.length > 0 && !isSinglePost) {
      const updatedPosts = posts.map((p) =>
        p._id === postId
          ? {
              ...p,
              isLiked: isLike,
              totalLike: isLike ? (p.totalLike || 0) + 1 : Math.max((p.totalLike || 0) - 1, 0),
              likedBy: isLike
                ? [...(p.likedBy || []), userId]
                : (p.likedBy || []).filter((id) => id !== userId),
            }
          : p
      );
      setPosts(updatedPosts);
    }

    // Update single post if we're in single post view or if the post matches
    if (isSinglePost || (singlePost && singlePost._id === postId)) {
      setSinglePost({
        ...(singlePost || post),
        isLiked: isLike,
        totalLike: isLike
          ? ((singlePost || post).totalLike || 0) + 1
          : Math.max(((singlePost || post).totalLike || 0) - 1, 0),
        likedBy: isLike
          ? [...((singlePost || post).likedBy || []), userId]
          : ((singlePost || post).likedBy || []).filter((id) => id !== userId),
      });
    }
  };

  const handleLike = (id) => {
    if (isSinglePost && onLike) {
      // Use the provided onLike handler for single post view
      onLike(id);
    } else {
      // Use the mutation for regular post view
      likePostMutation(id, {
        onSuccess: (response) => {
          if (response?.success) {
            updatePostLikeState(id, response.data.userId, true);
            // toast.success(response.message || "Post liked successfully!");
          } else {
            toast.error(response?.message || "Failed to like post");
          }
        },
        onError: (error) => {
          // toast.error(error?.response?.data?.message || "Failed to like post");
        },
      });
    }
  };

  const handleUnlike = (id) => {
    if (isSinglePost && onUnlike) {
      // Use the provided onUnlike handler for single post view
      onUnlike(id);
    } else {
      // Use the mutation for regular post view
      unlikePostMutation(id, {
        onSuccess: (response) => {
          if (response?.success) {
            updatePostLikeState(id, response.data.userId, false);
            // toast.success("Post unliked successfully!");
          } else {
            toast.error(response?.message || "Failed to unlike post");
          }
        },
        onError: (error) => {
          // toast.error(error?.response?.data?.message || "Failed to unlike post");
        },
      });
    }
  };

  const handleShare = async (id) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          text: post?.postDesc || "Amazing post!",
          url: `${window.location.origin}/${locale}/post/${id}`,
        });

        sharePost(id);
      } catch (error) {
        toast.error("Share cancelled or failed");
      }
    } else {
      toast.info("Share not supported on this device");
    }
  };

  return (
    <div className="shadow-card rounded-xl bg-white">
      <div className="flex items-center gap-2.5 border-b border-black/10 px-5 py-4 pb-[16px]">
        <div
          className="relative h-10 w-10 cursor-pointer"
          onClick={() => router.push(`/single-user/${post.userId._id}`)}
        >
          <ImageFallback
            src={post.userId?.profile?.photo && getImg(post.userId.profile.photo)}
            alt={fullName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        <div className="min-w-0 text-left">
          <div
            className="cursor-pointer truncate text-[13px] font-medium"
            onClick={() => router.push(`/single-user/${post.userId._id}`)}
          >
            {fullName}
          </div>
          <p className="text-grayBlueText mt-0 truncate text-xs font-normal">{title}</p>
        </div>
      </div>
      <div className="px-6 py-1">
        <p className="text-grayBlueText pt-5 pb-4 text-[13px] leading-[17px] font-normal tracking-normal">
          {post.postDesc}{" "}
        </p>

        {post.postImg && (
          <div className="mb-4 overflow-hidden">
            <ImageFallback
              src={getImg(post.postImg)}
              fallbackSrc={noPostImage}
              alt="Post"
              width={500}
              height={500}
              className="h-auto max-h-[514px] w-full bg-black/50 object-contain"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-black/10 px-4 py-4 text-[13px] text-gray-500">
        <div className="flex flex-wrap items-center gap-5 select-none">
          {(post.isLiked || post.isLike) ? (
            <span
              className={`flex items-center gap-1 ${(isSinglePost ? isUnliking : isUnlikingMutation) ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              onClick={() => handleUnlike(post._id)}
            >
              {(isSinglePost ? isUnliking : isUnlikingMutation) ? <LoaderIcon /> : <FillLike />}{" "}
              {post.totalLike}
            </span>
          ) : (
            <span
              className={`flex items-center gap-1 ${(isSinglePost ? isLiking : isLikingMutation) ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              onClick={() => !(isSinglePost ? isLiking : isLikingMutation) && handleLike(post._id)}
            >
              {(isSinglePost ? isLiking : isLikingMutation) ? <LoaderIcon /> : <Like />}{" "}
              {post.totalLike}
            </span>
          )}

          <span
            className="flex cursor-pointer items-center gap-1"
            onClick={() => handleShowComments(post._id)}
          >
            <Comment isActive={shoeCommentBoxId == post._id && showComments} /> {post.totalComment}
          </span>
          <span className="flex items-center gap-1">
            <button
              onClick={() => handleShare(post._id)}
              disabled={isShareLoading}
              className={`share-btn ${isShareLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <Share />
            </button>
            <div>{isShareLoading ? <LoaderIcon /> : post.totalShare}</div>
          </span>
        </div>
        <span className="text-grayBlueText text-xs font-normal whitespace-nowrap">{postTime}</span>
      </div>

      {/* comment */}
      <AnimatePresence>
        {shoeCommentBoxId == post._id && showComments && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 500, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FeedComment postId={post._id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicPost;
