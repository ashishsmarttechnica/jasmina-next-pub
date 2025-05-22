import React, { useState } from "react";
import Like from "@/assets/svg/feed/Like";
import Comment from "@/assets/svg/feed/Comment";
import Share from "@/assets/svg/feed/Share";
import Image from "next/image";
import user from "@/assets/feed/user-1.png";
import postImg from "@/assets/feed/post-1.png";
import getImg from "@/lib/getImg";
import noImage2 from "@/assets/form/noImage2.webp";
import FeedComment from "./comment/FeedComment";
import { motion, AnimatePresence } from "framer-motion";
import { formatRelativeTime } from "@/lib/commondate";
import ImageFallback from "@/common/shared/ImageFallback";
import noPostImage from "@/assets/feed/no-post.png";
const DynamicPost = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [shoeCommentBoxId, setShowCommentBoxId] = useState(null);

  const fullName = post?.userId?.profile?.fullName || "Unknown User";
  const title = post?.userId?.preferences?.jobRole || "";
  const postTime = formatRelativeTime(post.createdAt);

  const handleShowComments = (id) => {
    setShowCommentBoxId(id);
    setShowComments((prev) => !prev);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md"
      style={{ boxShadow: "0px 4px 25px 0px #888DA833" }}
    >
      <div className="flex items-center gap-2.5 py-4 px-5 pb-[16px] border-b border-black/10">
        <div className="relative w-10 h-10">
          <ImageFallback
            src={
              post.userId?.profile?.photo && getImg(post.userId.profile.photo)
            }
            alt={fullName}
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>

        <div className="text-left min-w-0">
          <p className="text-[13px] font-medium truncate">{fullName}</p>
          <p className="text-xs text-grayBlueText font-normal mt-0 truncate">
            {title}
          </p>
        </div>
      </div>
      <div className="px-6 py-1">
        <p className="text-[13px] font-normal pt-5  pb-4 leading-[17px] tracking-normal text-grayBlueText">
          {post.postDesc}{" "}
        </p>

        {post.postImg && (
          <div className="overflow-hidden mb-4">
            <ImageFallback
              src={getImg(post.postImg)}
              fallbackSrc={noPostImage}
              alt="Post"
              width={500}
              height={500}
              className="w-full h-auto object-cover max-h-[514px]"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-[13px] border-t py-4 px-4 border-black/10 text-gray-500 ">
        <div className="flex gap-5 items-center flex-wrap">
          <span className="flex items-center gap-1">
            <Like /> {post.totalLike}
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => handleShowComments(post._id)}
          >
            <Comment /> {post.totalComment}
          </span>
          <span className="flex items-center gap-1">
            <Share /> {post.totalShare}
          </span>
        </div>
        <span className="font-normal text-xs text-grayBlueText whitespace-nowrap">
          {postTime}
        </span>
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
