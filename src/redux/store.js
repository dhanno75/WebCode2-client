import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import LeadSlice from "./features/LeadSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    leads: LeadSlice,
  },
});
