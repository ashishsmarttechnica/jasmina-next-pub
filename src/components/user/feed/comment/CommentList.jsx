import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <p className="text-gray-500">No comments yet.</p>
      </div>
    );
  }

  return comments.map((comment) => (
    <CommentItem key={comment._id} comment={comment} />
  ));
};

export default CommentList;
