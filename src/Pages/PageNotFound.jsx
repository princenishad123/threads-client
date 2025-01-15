import { Link, NavLink } from "react-router-dom";

import {
  Button,
  buttonVariants,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle,
} from "keep-react";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-black content-center">
      <Empty>
        <EmptyTitle className="mb-[14px] mt-5">
          Oops! You seem to be lost
        </EmptyTitle>
        <EmptyDescription className="mb-8">
          The link you followed may be broken, or the page may have been
          removed.
        </EmptyDescription>
        <NavLink to={"/"}>
          <button className="px-4 py-2 bg-white text-black font-semibold rounded-xl">
            Back to home
          </button>
        </NavLink>
      </Empty>
    </div>
  );
};

export default PageNotFound;
