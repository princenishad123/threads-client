import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import {
  Button,
  toast,
  Tooltip,
  TooltipAction,
  TooltipContent,
  TooltipProvider,
} from "keep-react";
import { useLogoutMutation } from "../rtkQuery/authQuery";
import { setAuthUser } from "../redux/authSlice";

import { useDispatch, useSelector } from "react-redux";
import UploadPostPopup from "../components/UploadPostPopup";
import { disconnectSocket } from "../lib/socket";

const Navbar = () => {
  // const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.authSlice);
  const { notifications } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();

    if (res.data) {
      toast.success(res.data.message);
      dispatch(setAuthUser(null));

      disconnectSocket();

      navigate("/");
    }
  };

  return (
    <nav className="sm:h-screen max-sm:h-16 flex sm:flex-col justify-between w-20 items-center max-sm:w-full max-sm:fixed bottom-0 bg-black">
      <div className="w-full max-sm:hidden">
        <img
          src="https://i.pinimg.com/originals/9f/ce/f7/9fcef7b1abac126b507befcc77a0c277.png"
          alt="thread logo"
          className="w-20"
        />
      </div>
      <div className="max-sm:w-full">
        <ul className="max-sm:flex max-sm:justify-around">
          <li className="text-gray-600 sm:my-10 max-sm:scale-75 max-sm:inline-block">
            <NavLink
              className={({ isActive }) => (isActive ? "text-white" : "")}
              to={"/"}
            >
              <AiFillHome size={30} />
            </NavLink>
          </li>
          <li className="text-gray-600 sm:my-10 max-sm:scale-75 max-sm:inline-block">
            <NavLink
              className={({ isActive }) => (isActive ? "text-white" : "")}
              to={"/search"}
            >
              <IoSearchSharp size={30} />
            </NavLink>
          </li>
          <li className="text-gray-600 scale-125 cursor-pointer flex justify-center  sm:my-10">
            <UploadPostPopup />
          </li>
          <li className="text-gray-600 sm:my-10 max-sm:scale-75 max-sm:inline-block relative">
            <NavLink
              className={({ isActive }) => (isActive ? "text-white" : "")}
              to={"/activity"}
            >
              {notifications.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white size-5 flex justify-center items-center rounded-full text-[10px]">
                  {notifications.length > 99 ? "99+" : notifications.length}
                </div>
              )}
              <FiHeart size={30} />
            </NavLink>
          </li>
          <li className="text-gray-600 sm:my-10 max-sm:scale-75 max-sm:inline-block">
            <NavLink
              className={({ isActive }) => (isActive ? "text-white" : "")}
              to={`/@${authUser?.username}`}
            >
              <FaRegUser size={30} />
            </NavLink>
          </li>
        </ul>
      </div>

      <div className=" w-full max-sm:hidden mb-12">
        <TooltipProvider delayDuration={500}>
          <Tooltip className="">
            <TooltipAction asChild>
              <Button
                onClick={handleLogout}
                className="bg-transparent hover:bg-transparent "
              >
                <LuLogOut size={25} color="red" />
              </Button>
            </TooltipAction>
            <TooltipContent side="right">
              <p className="text-body-5 font-medium text-white">Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;
