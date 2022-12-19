import { createSlice } from "@reduxjs/toolkit";

export const socket = createSlice({
  name: "socket",
  initialState: {
    me: {},
  },
  reducers: {
    initSocket: (state, action) => {
      state.me = action.payload;
    },
  },
});

export const { initSocket } = socket.actions;

export default socket.reducer;
