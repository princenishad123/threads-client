import React, { useEffect } from "react";
import LikedPost from "../../components/LikedPostComponents/LikedPost";
import { useLazyGetNotificationQuery } from "../../rtkQuery/postQuery";
import SearchSkeleton from "../../components/SearchComponents/SearchSkeleton";
const Like = () => {
  const [getNotificationTrigger, { data, isLoading }] =
    useLazyGetNotificationQuery();

  useEffect(() => {
    getNotificationTrigger();
  }, []);

  if (isLoading) {
    return (
      <>
        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />
      </>
    );
  }

  return (
    <div className="p-4">
      {data?.map((e) => (
        <div key={e._id}>
          <LikedPost
            username={e.userDetails.username}
            userProfilePicture={e.userDetails.profilePicture}
            message={e.message}
            postImage={e.postDetails.image}
          />
        </div>
      ))}
    </div>
  );
};

export default Like;
