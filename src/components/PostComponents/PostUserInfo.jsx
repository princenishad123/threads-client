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

const PostUserInfo = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center px-4">
      <div className="flex items-center">
        {/* user image */}
        <div className="size-10 rounded-full overflow-hidden">
          <img
            src="./default-user.webp"
            className="object-contain rounded-full"
            alt="user-image"
          />
        </div>
        <div className="flex items-center">
          <h3 className="px-4">User-name</h3>
        </div>
      </div>
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
  );
};

export default PostUserInfo;
