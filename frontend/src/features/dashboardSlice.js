import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const getDashboard = createAsyncThunk(
  "/user/getDashboard",
  async (thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "get",
        to: "/dashboard",
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  stats: [
    {
      date: "01/11/2023",
      early: 6,
    },
    {
      date: "02/11/2023",
      early: 3,
    },
    {
      date: "01/20/2023",
      late: 2,
    },
  ],
  userId: "",
  giftId: "",
  loading: false,
  preloading: false,
  modal: { open: false, close: false },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** createUser Builder **/
    // builder
    //   .addCase(createUser.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(createUser.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     if (payload.success) {
    //       state.userId = payload?.data?._id;
    //     }
    //   })
    //   .addCase(createUser.rejected, (state) => {
    //     state.loading = false;
    //   });
    /** createUser Builder |END| **/
  },
});

export const getDashboardData = (state) => state.dashboard;
// export const { logout } = dashboardSlice.actions;
export default dashboardSlice.reducer;
