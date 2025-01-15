import React from "react";

const SearchSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between py-6 border-b border-gray-600 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full overflow-hidden bg-gray-500"></div>
        <div>
          <div className="h-4 bg-gray-500 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-500 rounded w-16"></div>
        </div>
      </div>
      <div className="py-2 px-4 rounded-full font-semibold border border-gray-600 bg-gray-500 w-20"></div>
    </div>
  );
};

export default SearchSkeleton;
