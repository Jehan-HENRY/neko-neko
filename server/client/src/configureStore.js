import { configureStore } from "@reduxjs/toolkit";
import sidenav from "./store/reducers/sidenav";
import socket from "./store/reducers/socket";

export default configureStore({
  reducer: {
    sidenav: sidenav,
    socket: socket,
  },
});
