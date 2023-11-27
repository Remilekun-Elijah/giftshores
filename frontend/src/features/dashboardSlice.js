import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const getDashboardStats = createAsyncThunk(
  "/admin/getDashboard",
  async (thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "get",
        to: "/admin/stats",
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const getReport = createAsyncThunk(
  "/admin/getReport",
  async ({ pageSize } = {}, thunkAPI) => {
    const { pagination } = thunkAPI.getState().dashboard;
    try {
      return new BACKEND().send({
        type: "get",
        to: `/admin/report/?pageNumber=${pagination.page}&pageSize=${
          pageSize || pagination.pageSize
        }&search=${pagination.search || pagination.filter || ""}`,
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  analytics: [
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
  reports: [],
  userId: "",
  giftId: "",
  loading: false,
  modalLoading: false,
  preloading: false,
  modal: { open: false, close: false },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    length: 0,
    search: "",
    filter: "",
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPagination: (state, { payload }) => {
      state.pagination = { ...state.pagination, ...payload };
    },
  },
  extraReducers: (builder) => {
    /** createUser Builder **/
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.stats = payload?.data?.stats;
          state.analytics = payload?.data?.analytics;
        }
      })
      .addCase(getDashboardStats.rejected, (state) => {
        state.loading = false;
      });
    /** createUser Builder |END| **/
    /** getReport Builder **/
    builder
      .addCase(getReport.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(getReport.fulfilled, (state, { payload }) => {
        state.modalLoading = false;
        if (payload.success) {
          state.reports = payload?.data?.reports;

          state.pagination.total = payload.data.count;
          state.pagination.length =
            state.pagination.pageSize * state.pagination.page;
        }
      })
      .addCase(getReport.rejected, (state) => {
        state.modalLoading = false;
      });
    /** createUser Builder |END| **/
  },
});

export const getDashboardData = (state) => state.dashboard;
export const { setPagination } = dashboardSlice.actions;
export default dashboardSlice.reducer;
