import React from "react";
import Like from "@/assets/svg/feed/Like";
import Comment from "@/assets/svg/feed/Comment";
import Share from "@/assets/svg/feed/Share";
import Image from "next/image";
import user from "@/assets/feed/user-1.png";
import postImg from "@/assets/feed/post-1.png";
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

const DynamicPost = ({ post }) => {

  return (
    <div
      className="bg-white rounded-xl shadow-md"
      style={{ boxShadow: "0px 4px 25px 0px #888DA833" }}
    >
      <div className="flex items-center gap-2.5 py-4 px-5 pb-[16px] border-b border-black/10">
        <div className="relative w-12 h-12 ">
          <Image
            src={newpost.user.avatar}
            alt={newpost.user.name}
            className="rounded-full w-10 h-10 object-cover"
          />
          {newpost.user.online && (
            <span className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-primary border-[1.5px] border-white rounded-full" />
          )}
        </div>
        <div className="text-left min-w-0">
          <p className="text-[13px] font-medium truncate">{newpost.user.name}</p>
          <p className="text-xs text-grayBlueText font-normal mt-0 truncate">
            {newpost.user.title}
          </p>
        </div>
      </div>
      <div className="px-6 py-1">
        <p className="text-[13px] font-normal pt-5  pb-4 leading-[17px] tracking-normal text-grayBlueText">
          {newpost.content}{" "}
          <a href="#" className="text-[#1194FF] font-medium">
            {newpost.highlight}
          </a>
        </p>

        {newpost.image && (
          <div className="overflow-hidden mb-4 ">
            <Image
              src={newpost.image}
              alt="Post"
              className="w-full h-auto object-cover max-h-[514px] "
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-[13px] border-y py-4 px-4 border-black/10 text-gray-500 mb-4">
        <div className="flex gap-5 items-center flex-wrap">
          <span className="flex items-center gap-1">
            <Like /> {newpost.likes}
          </span>
          <span className="flex items-center gap-1">
            <Comment /> {newpost.comments}
          </span>
          <span className="flex items-center gap-1">
            <Share /> {newpost.shares}
          </span>
        </div>
        <span className="font-normal text-xs text-grayBlueText whitespace-nowrap">
          {newpost.timeAgo}
        </span>
      </div>
      <div className="flex items-start gap-3 px-4 pb-5 border-b border-black/10">
        <div className="relative">
          <Image
            src={newpost.comment.avatar}
            alt={newpost.comment.name}
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
          placeholder="Add Comment..."
          className="py-4 w-full text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DynamicPost;
