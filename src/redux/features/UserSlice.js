import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// let API = "https://mockapi.io/projects/63d78985afbba6b7c93f07b5/users";
let API = "https://jsonplaceholder.typicode.com/users";

export const getAllUsers = createAsyncThunk("users/getUsers", async () => {
  return fetch(API).then((res) => res.json());
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default UserSlice.reducer;
