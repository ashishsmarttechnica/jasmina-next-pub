"use client";

import { useParams } from "next/navigation";
import { Loader } from "rsuite";
import UserMightKnow from "../common/UserMightKnow";
import CompanyDynamicPost from "../components/company/feed/CompanyDynamicPost";
import { useSinglePost } from "../hooks/post/usePosts";
import ConnectionsLayout from "./ConnectionsLayout";
import PostSkeleton from "../common/skeleton/PostSkeleton";
import UserCompanyProfile from "../common/UserCompanyProfile";
import { useTranslations } from "next-intl";
import MainLayout from "./MainLayout";
import Profile from "../common/Profile";
import UserConnections from "../common/UserConnections";
import DynamicPost from "../components/user/feed/DynamicPost";

const SinglePostLayout = () => {
  const params = useParams();
  const id = params?.id;
  const t = useTranslations("UserMainFeed");
  const { data: post, isLoading, isError } = useSinglePost(id);
  console.log(post, "asdas");

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


  if (isLoading) {
    return <div className="w-full space-y-6 xl:max-w-[547px]">{renderSkeletons()}</div>;
  }

  if (isLoading) return <Loader />;
  if (isError || !post) return <div>Post not found.</div>;

  return (
    <MainLayout
      leftComponents={[<Profile key="left1" />]}
      rightComponents={[<UserMightKnow key="right1" />]}
    >
      <DynamicPost post={post} />
    </MainLayout>
  );
};

export default SinglePostLayout;
