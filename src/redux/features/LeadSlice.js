import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const getLeads = createAsyncThunk("leads/getAllLeads", async () => {
  try {
    const response = await fetch(`${API}/leads`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const leads = await response.json();
    return leads;
  } catch (err) {
    console.log(err);
  }
});

export const getLeadsPerMonth = createAsyncThunk(
  "leads/getLeadsPerMonth",
  async () => {
    try {
      const response = await fetch(`${API}/leads/getLeadsPerMonth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const leads = await response.json();
      return leads;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUserLeads = createAsyncThunk(
  "leads/getUserLeads",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/leads/${values.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const leads = await response.json();
      return leads;
    } catch (err) {
      console.log(err);
    }
  }
);

const LeadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    leadsPerMonth: [],
    loading: false,
  },
  extraReducers: {
    [getLeads.pending]: (state) => {
      state.loading = true;
    },
    [getLeads.fulfilled]: (state, action) => {
      state.loading = false;
      state.leads = action.payload;
    },
    [getLeads.rejected]: (state, action) => {
      state.loading = false;
    },
    [getLeadsPerMonth.pending]: (state) => {
      state.loading = true;
    },
    [getLeadsPerMonth.fulfilled]: (state, action) => {
      state.loading = false;
      state.leadsPerMonth = action.payload;
    },
    [getLeadsPerMonth.rejected]: (state, action) => {
      state.loading = false;
    },
    [getUserLeads.pending]: (state) => {
      state.loading = true;
    },
    [getUserLeads.fulfilled]: (state, action) => {
      state.loading = false;
      state.leads = action.payload;
    },
    [getUserLeads.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default LeadSlice.reducer;
