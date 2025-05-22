"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import CustomSwiperNavigation from "@/components/common/CustomSwiperNavigation";
import noImage2 from "@/assets/form/noImage2.webp";
import postData from "./ActivityPost.json";
import Like from "@/assets/svg/feed/Like";
import Comment from "@/assets/svg/feed/Comment";
import Share from "@/assets/svg/feed/Share";
import Image from "next/image";

export default function PostSlider() {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: "auto" },
          640: { slidesPerView: "auto" },
          768: { slidesPerView: "auto" },
          1024: { slidesPerView: "auto" },
          1280: { slidesPerView: "auto" },
          1536: { slidesPerView: "auto" },
        }}
        className="!pb-10 px-2 sm:px-4"
      >
        {postData.map((post) => (
          <SwiperSlide
            key={post.id}
            className="shadow-card border border-secondary/20 !w-[365px]"
          >
            <PostCardSingle post={post} />
          </SwiperSlide>
        ))}
        <div slot="container-end" >
          <CustomSwiperNavigation totalSlides={postData.length} />
        </div>
      </Swiper>
    </div>
  );
}

function PostCardSingle({ post }) {
  const [avatarSrc, setAvatarSrc] = useState(post.user.avatar || noImage2);
  const [postImgSrc, setPostImgSrc] = useState(post.image || null);

  return (
    <div className="bg-white rounded-[5px] ">
      {/* User Info */}
      <div className="flex items-center gap-2.5 py-[17px] px-[17px] border-b border-black/10">
        <div className="relative w-12 h-12">
          <Image
            src={avatarSrc}
            alt={post.user.name}
            width={48}
            height={48}
            onError={() => setAvatarSrc(noImage2)}
            className="rounded-full w-12 h-12 object-cover"
          />
        </div>
        <div className="text-left min-w-0">
          <p className="text-[13px] font-medium truncate">{post.user.name}</p>
          <p className="text-xs text-grayBlueText font-normal truncate">
            {post.user.title}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-[17px] ">
        <p className="text-[13px] font-normal leading-[1.4] text-grayBlueText mb-4 min-h-[80px]">
          {post.content}{" "}
          {post.highlight && (
            <a href="#" className="text-lightBlue font-medium">
              {post.highlight}
            </a>
          )}
        </p>

        {postImgSrc && (
          <div className="overflow-hidden ">
            <Image
              src={postImgSrc}
              alt="Post"
              width={335}
              height={335}
              onError={() => setPostImgSrc(noImage2)}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[13px] border-t p-[17px] border-black/10 text-gray-500">
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Like /> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <Comment /> {post.comments}
          </span>
          <span className="flex items-center gap-1">
            <Share /> {post.shares}
          </span>
        </div>
        <span className="font-normal text-xs text-grayBlueText whitespace-nowrap">
          {post.timeAgo}
        </span>
      </div>
    </div>
  );
}
