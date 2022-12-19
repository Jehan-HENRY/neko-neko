import { configureStore } from "@reduxjs/toolkit";
import socket from "./store/reducers/socket";

export default configureStore({
  reducer: {
    socket: socket,
  },
});
