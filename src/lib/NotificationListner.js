import React, { useEffect } from "react";
import socket from "./socket";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/postSlice";

const NotificationListner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("notification", (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off("notification");
    };

    return null;
  }, [dispatch]);

};

export default NotificationListner;
