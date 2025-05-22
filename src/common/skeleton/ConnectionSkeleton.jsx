import React from "react";

const PeopleCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-4 px-2 border-b border-black/10 bg-white animate-pulse">
      {/* Avatar and Info Skeleton */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="space-y-1 min-w-0">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>

      {/* Button and Date Skeleton */}
      <div className="flex flex-col items-end min-w-[140px] space-y-2">
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

const ConnectionsSkeleton = () => {
  return (
    <div className="bg-white shadow rounded-md">
      {/* Header */}
      <div className="bg-white z-10">
        <div className="border-b border-black/10">
          <h2 className="text-xl font-medium py-4 px-4 sm:px-6">
            <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
          </h2>
        </div>

        {/* Fake Tabs */}
        <div className="flex gap-4 border-b border-black/10 px-4 sm:px-6 py-3.5">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Skeleton List */}
      <div className="px-4 sm:px-6">
        {[...Array(5)].map((_, index) => (
          <PeopleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ConnectionsSkeleton;
