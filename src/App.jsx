import React, { lazy, Suspense, useEffect } from "react";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Posts from "./Pages/Profile/Posts";
import Replies from "./Pages/Profile/Replies";
import Reposts from "./Pages/Profile/Reposts";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
const Home = lazy(() => import("./Pages/Home/Home"));
const Search = lazy(() => import("./Pages/Search/Search"));
const Like = lazy(() => import("./Pages/Like/Like"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
import { useCheckAuthUserQuery } from "./rtkQuery/authQuery";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "./redux/authSlice";
import { connectSocket, getSocket } from "./lib/socket";
import { addNotification } from "./redux/postSlice";
import SmallLoader from "./components/SmallLoader";
import HomeLoader from "./components/HomeLoader";

const App = () => {
  const checkAuthUser = useCheckAuthUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthUser(checkAuthUser.data));

    if (checkAuthUser?.data) {
      if (getSocket()) return;
      connectSocket(checkAuthUser?.data._id).connect();
    }
  }, [checkAuthUser]);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      socket.on("notification", (notification) => {
        dispatch(addNotification(notification));
      });
    }

    return () => {
      if (socket) {
        socket.off("notification");
      }
    };

    return null;
  }, [checkAuthUser]);

  // if (checkAuthUser.isLoading) {
  //   return <HomeLoader />;
  // }

  return (
    <Layout>
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute privateRoute={<Home />} />}
          />
          <Route
            path="/search"
            element={<ProtectedRoute privateRoute={<Search />} />}
          />
          <Route path="/activity" element={<Like />} />
          <Route
            path="/:username/"
            element={<ProtectedRoute privateRoute={<Profile />} />}
          >
            <Route path="" element={<Posts />} />
            <Route path="replies" element={<Replies />} />
            <Route path="reposts" element={<Reposts />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
