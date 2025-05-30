import React from "react";

const PeopleCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-4 px-2 border-b border-black/10 bg-white animate-pulse">
      {/* Avatar and Info Skeleton */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
        <div className="space-y-2 min-w-0 flex-1">
          {/* Name */}
          <div className="h-4 bg-gray-300 rounded w-32" />
          {/* Job Title */}
          <div className="h-3 bg-gray-300 rounded w-24" />
          {/* Mutual Connections */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-300 rounded-full flex-shrink-0" />
            <div className="h-3 bg-gray-300 rounded w-20" />
          </div>
        </div>
      </div>

      {/* Button and Date Skeleton */}
      <div className="flex flex-col items-end min-w-[140px] space-y-2 flex-shrink-0">
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-300 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-3 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

const ConnectionsSkeleton = ({ count = 5 }) => {
  return (
    <div className="bg-white shadow rounded-md animate-pulse">
      {/* Header */}
      <div className="bg-white z-10">
        <div className="border-b border-black/10">
          <div className="py-4 px-4 sm:px-6">
            <div className="h-6 w-44 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-4 border-b border-black/10 px-4 sm:px-6 py-3.5">
          <div className="h-5 w-20 bg-gray-300 rounded" />
          <div className="h-5 w-24 bg-gray-300 rounded" />
          <div className="h-5 w-16 bg-gray-300 rounded" />
        </div>
      </div>

      {/* People List Skeleton */}
      <div className="px-4 sm:px-6">
        {Array.from({ length: count }, (_, index) => (
          <PeopleCardSkeleton key={index} />
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="px-4 sm:px-6 py-4 border-t border-black/10">
        <div className="h-10 w-32 bg-gray-300 rounded mx-auto" />
      </div>
    </div>
  );
};

export default ConnectionsSkeleton;