import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import dashboard from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    user,
    dashboard,
  },
});
