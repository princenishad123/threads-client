import React from "react";
import {
  Button,
  Dropdown,
  DropdownAction,
  DropdownArrow,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
} from "keep-react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
const PostedPosts = ({ post, authUser }) => {
  return (
    <div className="border-b border-zinc-500 p-4">
      <div className="w-full h-14 flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* user image */}
          <div className="size-10 rounded-full overflow-hidden">
            <img
              src={authUser?.profilePicture || "./default-user.webp"}
              className="object-contain rounded-full"
              alt="user-image"
            />
          </div>
          <div className="flex items-center">
            <h3 className="px-4 font-semibold">{authUser?.username}</h3>
          </div>
        </div>
        <div>
          <Dropdown>
            <DropdownAction asChild>
              <Button className="bg-transparent hover:bg-transparent text-end w-8 p-0">
                <PiDotsThreeVerticalBold size={20} />
              </Button>
            </DropdownAction>
            <DropdownContent
              align="end"
              className="bg-zinc-900 border border-zinc-700 "
            >
              <DropdownArrow />
              <DropdownItem className="text-white focus:bg-transparent text-md tracking-wide">
                Save
              </DropdownItem>
              <DropdownItem className="text-white focus:bg-transparent text-md tracking-wide">
                Not Interest
              </DropdownItem>
              <DropdownItem className="text-white focus:bg-transparent text-md tracking-wide">
                Mute
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-red-500 focus:bg-transparent text-md tracking-wide">
                Block
              </DropdownItem>
              <DropdownItem className="text-red-500 focus:bg-transparent text-md tracking-wide">
                Report
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-white focus:bg-transparent text-md tracking-wide">
                Copy Link
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
      <div className="ml-14">
        <div>{post.caption}</div>

        {/* intract buttons */}
        <div className="py-3 flex gap-6">
          <button className="flex items-center gap-1">
            <FaRegHeart size={18} /> {post?.likeCount}
          </button>
          <button className="flex items-center gap-1">
            <FaRegComment size={18} /> {post?.commentCount}
          </button>
          <button className="flex items-center gap-1">
            <BiRepost size={25} />
          </button>
          <button className="flex items-center gap-1">
            <FiSend size={18} /> {post?.sharesCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostedPosts;
