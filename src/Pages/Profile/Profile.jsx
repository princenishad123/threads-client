import React from "react";
import ProfileComponent from "../../components/ProfileComponents/ProfileComponent";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className=" ">
      <ProfileComponent />

      <div>
        {/* tabs */}
        <nav className="  sticky top-0 bg-zinc-900">
          <ul className="flex justify-around ">
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "w-full border-b text-center" : "w-full  text-center"
              }
            >
              <li className="inline-block">Posts</li>
            </NavLink>
            <NavLink
              to={"replies"}
              className={({ isActive }) =>
                isActive ? "w-full border-b text-center" : "w-full  text-center"
              }
            >
              <li className="inline-block">Replies</li>
            </NavLink>
            <NavLink
              to={"reposts"}
              className={({ isActive }) =>
                isActive ? "w-full border-b text-center" : "w-full  text-center"
              }
            >
              <li className="inline-block">Reposts</li>
            </NavLink>
          </ul>
        </nav>

        {/* posted posts */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
