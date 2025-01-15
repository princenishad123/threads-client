import React from "react";
import { useNavigate } from "react-router-dom";

const SearchedResults = ({ username, profilePicture, fullname }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between py-6  border-b border-gray-600">
      <div
        onClick={() => navigate(`/@${username}`)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="size-10 rounded-full overflow-hidden">
          <img src={profilePicture || "./default-user.webp"} alt="searches" />
        </div>
        <div>
          <h3 className="leading-3 text-md font-semibold">{fullname}</h3>
          <span className="text-md text-gray-400">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchedResults;
