import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/PostSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
  },
});
