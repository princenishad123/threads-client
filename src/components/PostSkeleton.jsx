import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-black text-white p-4 w-full mx-auto rounded-lg space-y-4">
      {/* Profile and Text Skeleton */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture Skeleton */}
        <div className="bg-gray-700 rounded-full w-12 h-12 animate-pulse" />
        {/* Name and Time Skeleton */}
        <div className="flex flex-col space-y-2">
          <div className="bg-gray-700 h-4 w-24 rounded animate-pulse" />
          <div className="bg-gray-700 h-3 w-16 rounded animate-pulse" />
        </div>
      </div>
      {/* Text Content Skeleton */}
      <div className="space-y-2">
        <div className="bg-gray-700 h-4 w-3/4 rounded animate-pulse" />
        <div className="bg-gray-700 h-4 w-1/2 rounded animate-pulse" />
      </div>
      {/* Icons Skeleton */}
      <div className="flex items-center justify-around mt-2">
        <div className="bg-gray-700 h-6 w-6 rounded-full animate-pulse" />
        <div className="bg-gray-700 h-6 w-6 rounded-full animate-pulse" />
        <div className="bg-gray-700 h-6 w-6 rounded-full animate-pulse" />
        <div className="bg-gray-700 h-6 w-6 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default PostSkeleton;
