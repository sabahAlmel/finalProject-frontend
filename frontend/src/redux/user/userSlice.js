import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signIn, signout } = userSlice.actions;

export default userSlice.reducer;
