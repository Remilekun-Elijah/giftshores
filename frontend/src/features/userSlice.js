import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const createUser = createAsyncThunk(
  "/auth/createUser",
  async (payload, thunkAPI) => {
    try {
      // return new BACKEND().send({
      //   type: "post",
      //   to: "/auth/user",
      //   useAlert: true,
      //   payload,
      // });
      const res = { success: true, message: "Data saved" };
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  payload: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    gender: "",
    purpose: "",
  },
  branches: [],
  loading: false,
  preloading: false,
  user: null,
  appType: Storage.get(config.authProps[2]),
  modal: { open: false, close: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      Storage.remove(config.authProps[0]);
      Storage.remove(config.authProps[1]);
    },
  },
  extraReducers: (builder) => {
    /** createUser Builder **/
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      });
    /** createUser Builder |END| **/
  },
});

export const getUserData = (state) => state.user;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
