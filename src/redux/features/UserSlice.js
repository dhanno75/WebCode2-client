import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

// let API = "https://mockapi.io/projects/63d78985afbba6b7c93f07b5/users";
// let API = "https://jsonplaceholder.typicode.com/users";
// let API = "https://jsonplaceholder.typicode.com/users";

export const getAllUsers = createAsyncThunk("users/getUsers", async () => {
  return fetch(`${API}/users`).then((res) => res.json());
});

export const forgotPassword = createAsyncThunk("users/getUsers", async () => {
  return fetch(`${API}/users`).then((res) => res.json());
});

export const createUser = createAsyncThunk(
  "users/signup",
  async ({ values }) => {
    return fetch(`${API}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        role: values.role,
      }),
    }).then((res) => res.json());
  }
);

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
