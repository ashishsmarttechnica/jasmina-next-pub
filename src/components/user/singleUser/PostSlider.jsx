"use client";

import noImage2 from "@/assets/feed/no-img.png";
import Comment from "@/assets/svg/feed/Comment";
import Like from "@/assets/svg/feed/Like";
import Share from "@/assets/svg/feed/Share";
import ImageFallback from "@/common/shared/ImageFallback";
import getImg from "@/lib/getImg";

import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PostSlider({ posts, userData }) {
  // const postData = posts;

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
        className="px-2 !pb-10 sm:px-4"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="shadow-card border-secondary/20 !w-[365px] border">
            <PostCardSingle post={post} userData={userData} />
          </SwiperSlide>
        ))}
        <div slot="container-end">
          {/* <CustomSwiperNavigation totalSlides={postData.length} /> */}
        </div>
      </Swiper>
    </div>
  );
}
//
function PostCardSingle({ post, userData }) {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const router = useRouter();
  const descRef = useRef(null);
  useEffect(() => {
    const element = descRef.current;
    if (element) {
      // Check if content overflows
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [post?.postDesc]);
  return (
    <div className="rounded-[5px] bg-white">
      {/* User Info */}
      <div className="flex items-center gap-2.5 border-b border-black/10 px-[17px] py-[17px]">
        <div className="relative h-10 w-10">
          <ImageFallback
            src={userData?.profile?.photo && getImg(userData?.profile?.photo)}
            fallbackSrc={noImage2}
            width={40}
            height={40}
            priority={true}
            alt={userData?.profile?.fullName ?? "user"}
            className="mb-[25px] h-10 w-10 rounded-full object-cover"
            style={{ height: "auto" }}
          />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-[13px] font-medium">{userData?.profile?.fullName}</p>
          <p className="text-grayBlueText truncate text-xs font-normal">
            {userData?.preferences?.jobRole}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-[17px]">
        <div className="min-h-[3.5rem]">
          <p
            ref={descRef}
            className={`text-grayBlueText text-[13px] leading-[1.4] font-normal ${showMore ? "" : "showline-2"}`}
          >
            {post?.postDesc}
          </p>
          {!showMore && isTruncated && (
            <button
              className="text-primary mt-1 text-xs underline"
              onClick={() => router.push(`/post/${post._id}`)}
            >
              more
            </button>
          )}
        </div>

        {/* {postImgSrc && ( */}
        <div className="overflow-hidden">
          <ImageFallback
            src={post?.postImg && getImg(post?.postImg)}
            fallbackSrc={noImage2}
            width={335}
            height={335}
            alt={userData?.profile?.fullName ?? "user"}
            priority={true}
            className="mb-[25px] h-auto max-h-[335px] w-[335px] object-cover"
          />
        </div>
        {/* )} */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-black/10 p-[17px] text-[13px] text-gray-500">
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-1">
            <Like /> {post.totalLike}
          </span>
          <span className="flex items-center gap-1">
            <Comment /> {post.totalComment}
          </span>
          <span className="flex items-center gap-1">
            <Share /> {post.totalShare}
          </span>
        </div>
        <span className="text-grayBlueText text-xs font-normal whitespace-nowrap">
          {post.timeAgo}
        </span>
      </div>
    </div>
  );
}
