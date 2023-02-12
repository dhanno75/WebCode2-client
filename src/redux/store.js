import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
  },
});
