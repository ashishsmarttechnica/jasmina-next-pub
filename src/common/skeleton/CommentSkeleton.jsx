const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-3 px-4 pb-5 border-b border-black/10 animate-pulse">
      <div className="relative">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <span className="absolute -bottom-1 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
