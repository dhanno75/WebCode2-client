import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const forgotPassword = createAsyncThunk("users/getUsers", async () => {
  return fetch(`${API}/users`).then((res) => res.json());
});

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const res = await fetch(`${API}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let users = await res.json();
    return users;
  } catch (err) {
    console.log(err);
  }
});

export const getAllManagers = createAsyncThunk(
  "users/getAllManagers",
  async () => {
    try {
      const res = await fetch(`${API}/users/manager`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      let managers = await res.json();
      return managers;
    } catch (err) {
      console.log(err);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (values, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("id", data.user._id);
        return data;
      } else {
        rejectWithValue(data);
      }
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

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
    users: [],
    managers: [],
    email: "",
    firstname: "",
    role: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    loading: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [getAllManagers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllManagers.fulfilled]: (state, action) => {
      state.loading = false;
      state.managers = action.payload;
    },
    [getAllManagers.rejected]: (state, action) => {
      state.loading = false;
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.email = payload.user.email;
      state.firstname = payload.user.firstname;
      state.role = payload.user.role;
      // state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearSomeState } = UserSlice.actions;
export default UserSlice.reducer;
