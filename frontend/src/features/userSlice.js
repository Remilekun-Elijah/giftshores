import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const createUser = createAsyncThunk(
  "/user/createUser",
  async (payload, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "post",
        to: "/user",
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const createGift = createAsyncThunk(
  "/user/createGift",
  async (payload, thunkAPI) => {
    const { userId } = thunkAPI.getState().user;
    try {
      return new BACKEND().send({
        type: "post",
        to: `/gift/${userId}`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const sendGift = createAsyncThunk(
  "/user/sendGift",
  async (payload, thunkAPI) => {
    const { giftId } = thunkAPI.getState().user;
    try {
      return new BACKEND().send({
        type: "post",
        to: `/send/${giftId}`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  payload: {
    firstName: "Remilekun",
    lastName: "Elijah",
    email: "remilekunelijah97@gmail.com",
    country: "Nigeria",
    gender: "male",
    purpose: "new Year",
  },
  userId: "",
  giftId: "",
  loading: false,
  preloading: false,
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
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.userId = payload?.data?._id;
        }
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      });
    /** createUser Builder |END| **/

    /** createGift Builder **/
    builder
      .addCase(createGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGift.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.giftId = payload?.data?._id;
        }
      })
      .addCase(createGift.rejected, (state) => {
        state.loading = false;
      });
    /** createGift Builder |END| **/

    /** sendGift Builder **/
    builder
      .addCase(sendGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendGift.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendGift.rejected, (state) => {
        state.loading = false;
      });
    /** sendGift Builder |END| **/
  },
});

export const getUserData = (state) => state.user;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
