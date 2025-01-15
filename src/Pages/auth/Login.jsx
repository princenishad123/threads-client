import React, { useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../rtkQuery/authQuery";
import SmallLoader from "../../components/SmallLoader";
import { setAuthUser } from "../../redux/authSlice";
import { connectSocket } from "../../lib/socket";
const Login = () => {
  const { authUser } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, isSuccess, status }] = useLoginMutation();
  useEffect(() => {
    if (authUser) return navigate("/");
  }, [authUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.email) return toast.error("Please Enter Email");
    if (!data.password) return toast.error("Please Enter Password");

    const res = await login(data);

    if (res.error) return toast.error(res.error.data.message);

    connectSocket(res.data._id).connect();

    dispatch(setAuthUser(res.data));
  };
  return (
    <div className="w-full h-screen content-center fixed top-0 left-0 z-50 bg-black ">
      <div className="w-full absolute -top-32 left-0">
        <img
          src="https://static.cdninstagram.com/rsrc.php/y7/r/suYRpvQuylX.avif"
          alt=""
        />
      </div>
      <div className="relative  py-3 sm:max-w-md sm:mx-auto">
        <form
          onSubmit={handleLogin}
          className="min-h-96 px-8 py-6 mt-4 text-left  rounded-xl shadow-lg"
        >
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <p className="m-0 text-xl font-semibold ">
                Login to your Account
              </p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <input
                placeholder="email"
                type="text"
                name="email"
                className="border rounded-lg px-3 py-4 mb-5 text-sm w-full outline-none bg-zinc-900 "
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <input
              placeholder="password"
              name="password"
              className="border rounded-lg px-3 py-4 mb-5 text-sm w-full outline-none bg-zinc-900 "
              type="password"
            />
          </div>
          <span className="my-4 font-semibold text-gray-500">
            <NavLink>Forget Password ?</NavLink>
          </span>
          <div>
            <button
              type="submit"
              className="py-2 flex justify-center px-8 bg-white  focus:ring-offset-blue-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none my-4"
            >
              {isLoading ? <SmallLoader /> : "Login"}
            </button>

            <span className=" font-semibold text-center block">
              <NavLink to={"/signup"}>Not yet account ?</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
