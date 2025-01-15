import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ privateRoute }) => {
  const { authUser } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) return navigate("/login");
  }, [authUser]);

  return privateRoute;
};

export default ProtectedRoute;
