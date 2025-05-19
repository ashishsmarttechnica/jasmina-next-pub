import Image from "next/image";
import noImage2 from "@/assets/form/noImage2.webp";
import getImg from "@/lib/getImg";

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 px-4 pb-5" key={comment._id}>
      <div className="relative">
        <Image
          src={
            comment?.user?.profile?.photo
              ? getImg(comment.user.profile.photo)
              : noImage2
          }
          alt={comment?.user?.profile?.fullName || "noImage2"}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[13px] capitalize">
          {comment.user.profile.fullName}
        </p>
        <p className="text-xs font-normal text-grayBlueText mt-0.5">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
