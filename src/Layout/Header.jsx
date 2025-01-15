import React from "react";
import { Button } from "keep-react";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <div className="w-full content-center h-12">
      <Button
        variant="link"
        className=" flex items-center gap-3 justify-center mx-auto text-md dark:text-white hover:text-gray-100"
      >
        For You <IoIosArrowDown size={20} />
      </Button>
    </div>
  );
};

export default Header;
