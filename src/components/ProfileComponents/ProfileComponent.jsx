import React, { useEffect } from "react";
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from "keep-react";
import { FaInstagram } from "react-icons/fa";
import { CgInsights } from "react-icons/cg";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../rtkQuery/postQuery";
import { useDoFollowToUserMutation } from "../../rtkQuery/postQuery";

const ProfileComponent = () => {
  const { authUser } = useSelector((state) => state.authSlice);
  const { username } = useParams();

  const user = useGetUserByUsernameQuery(username.slice(1, username.length));
  const [doFollowToUser] = useDoFollowToUserMutation();

  const handleFollow = async () => {
    await doFollowToUser({
      username: username.slice(1, username.length),
      userId: authUser._id,
    });
  };

  return (
    <div className="w-full  px-4 sm:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="sm:text-3xl text-xl font-bold">
            {user?.data?.user?.username}
          </h1>
          <h3 className="sm:text-xl text-md font-semibold">
            {user?.data?.user?.fullName}
          </h3>
        </div>
        <div className="sm:size-20 size-16 border rounded-full overflow-hidden">
          <img
            src={user?.data?.user?.profilePicture || "./default-user.webp"}
            alt="user-image"
            className="object-contain"
          />
        </div>
      </div>
      {/* bio */}
      <div>
        <p className="sm:w-80 w-full font-semibold mt-2 ">
          {user?.data?.user?.bio || "Add Bio"}
        </p>
      </div>

      {/* followers and badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AvatarGroup className="my-4">
            {user?.data?.followers.map((e) => (
              <Avatar key={e._id} className="size-8">
                <AvatarImage src={e.profilePicture || "/default-user"} />
              </Avatar>
            ))}
          </AvatarGroup>

          <h3 className="font-semibold">
            {user?.data?.user?.followersCount} Followers
          </h3>
        </div>

        <div>
          <button className="mx-2">
            <FaInstagram size={28} />
          </button>
          <button>
            <CgInsights size={28} />
          </button>
        </div>
      </div>

      {authUser?._id != user?.data?.user?._id ? (
        <button
          onClick={handleFollow}
          className="w-full py-2 bg-transparent text-white rounded-xl border"
        >
          {user?.data?.user?.followers.includes(authUser._id)
            ? "Unfollow"
            : "Follow"}
        </button>
      ) : (
        <UpdateProfile />
      )}
    </div>
  );
};

export default ProfileComponent;
