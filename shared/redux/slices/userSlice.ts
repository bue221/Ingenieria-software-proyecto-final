import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  value: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginTrue: (state, action) => {
      state.value = action.payload;
      state.isLogin = true;
    },
    setLoginFalse: (state) => {
      state.value = null;
      state.isLogin = false;
    },
  },
});

export const { setLoginTrue, setLoginFalse } = userSlice.actions;

export default userSlice.reducer;
