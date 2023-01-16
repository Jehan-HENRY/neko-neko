import { createSlice } from "@reduxjs/toolkit";

export const socket = createSlice({
  name: "socket",
  initialState: {
    id: "",
    total: 0,
    user: [],
  },
  reducers: {
    initSocket: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const { initSocket } = socket.actions;

export default socket.reducer;
