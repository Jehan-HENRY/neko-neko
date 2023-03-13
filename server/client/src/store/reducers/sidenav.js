import { createSlice } from "@reduxjs/toolkit";

export const sidenav = createSlice({
  name: "sidenav",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = sidenav.actions;

export default sidenav.reducer;
