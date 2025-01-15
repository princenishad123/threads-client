import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../redux/postSlice";

const LikedPost = ({ username, userProfilePicture, message, postImage }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeNotification());
  }, []);

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* user image */}
          <div className="size-10 rounded-full overflow-hidden">
            <img
              src={userProfilePicture || "./default-user.webp"}
              className="object-contain rounded-full"
              alt="user-image"
            />
          </div>
          <div className="flex items-center">
            <h3 className="px-2 ">
              <span className="max-sm:text-sm "> {message}</span>
            </h3>
          </div>
        </div>

        {/* liked image or reels */}

        <div className="size-10 rounded-md overflow-hidden bg-black">
          <img
            src={postImage || "./default.webp"}
            alt="liked image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LikedPost;
