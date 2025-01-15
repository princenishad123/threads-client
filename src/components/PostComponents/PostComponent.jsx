import React, { useEffect, useState } from "react";

import PostUserInfo from "./PostUserInfo";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { formatDistanceToNow } from "date-fns";

// function timeAgo(date) {
//   return formatDistanceToNow(new Date(date), { addSuffix: true });
// }

import {
  Button,
  Dropdown,
  DropdownAction,
  DropdownArrow,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
} from "keep-react";
import { toast } from "react-hot-toast";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import {
  useLikePostMutation,
  useDeletePostMutation,
} from "../../rtkQuery/postQuery";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import { Link } from "react-router-dom";
import Comment from "./Comment";
const PostComponent = ({
  author,
  caption,
  image,
  likeCount,
  shareCount,
  commentCount,
  views,
  authorDetails,
  postId,
  likedBy,
  createdAt,
}) => {
  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { posts } = useSelector((state) => state.postSlice);
  const { authUser } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  // function timeAgo(date) {
  //   return formatDistanceToNow(date);
  // }

  const handleLike = async (id) => {
    const res = await likePost({ id, userId: authUser._id });
  };

  const handleDeletePost = async (postId) => {
    const res = await deletePost({ id: postId });

    if (res.data.success) {
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }
  };
  return (
    <div className="w-full h-auto border-b border-gray-800 pt-4">
      {/* post user image and name */}
      <div className="w-full h-14 flex justify-between items-center px-4">
        <Link to={`/@${authorDetails?.username}`}>
          <div className="flex items-center">
            {/* user image */}
            <div className="size-10 rounded-full overflow-hidden">
              <img
                src={authorDetails?.profilePicture}
                className="object-contain rounded-full"
                alt={"user"}
              />
            </div>
            <div className="flex items-center">
              <h3 className="px-2">{authorDetails?.username}</h3>
            </div>
            <span className="text-slate-500 text-sm">ago</span>
          </div>
        </Link>
        <div>
          <Dropdown>
            <DropdownAction asChild>
              <Button className="bg-transparent hover:bg-transparent">
                <PiDotsThreeVerticalBold size={20} />
              </Button>
            </DropdownAction>
            <DropdownContent
              align="end"
              className="bg-zinc-900 border border-zinc-700 "
            >
              <DropdownArrow />
              <DropdownItem className="text-white focus:bg-transparent py-1 text-md tracking-wide">
                Save
              </DropdownItem>
              <DropdownItem className="text-white focus:bg-transparent py-1 text-md tracking-wide">
                Not Interest
              </DropdownItem>
              <DropdownItem className="text-white focus:bg-transparent py-1 text-md tracking-wide">
                Mute
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-red-500 focus:bg-transparent py-1 text-md tracking-wide">
                Block
              </DropdownItem>
              <DropdownItem className="text-red-500 focus:bg-transparent py-1 text-md tracking-wide">
                Report
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-white focus:bg-transparent py-1 text-md tracking-wide">
                Copy Link
              </DropdownItem>
              {authUser?._id === author ? (
                <DropdownItem
                  onClick={() => handleDeletePost(postId)}
                  className="text-red-500 focus:bg-transparent py-1 text-md tracking-wide"
                >
                  Delete Post
                </DropdownItem>
              ) : null}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      {/* user's posts content */}
      <div className="sm:ml-14 mx-4 ">
        <div>
          <p>{caption || ""}</p>

          <div>
            {image == " " ? null : (
              <img
                className="sm:max-w-xs max-sm:min-w-sm h-auto object-contain rounded-xl"
                src={image}
                alt=""
              />
            )}
          </div>
        </div>
        {/* intract buttons */}
        <div className="py-3 flex gap-6">
          <button
            onClick={() => handleLike(postId)}
            className="flex items-center gap-1 "
          >
            {likedBy?.includes(authUser?._id) ? (
              <FcLike size={18} />
            ) : (
              <FaRegHeart size={18} />
            )}{" "}
            {likeCount || 0}
          </button>
          <button className="flex items-center gap-1">
            <Comment postId={postId} /> {commentCount}
          </button>
          <button className="flex items-center gap-1">
            <BiRepost size={25} />
          </button>
          <button className="flex items-center gap-1">
            <FiSend size={18} /> {shareCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
