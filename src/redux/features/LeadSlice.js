import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const getLeads = createAsyncThunk("leads/getAllLeads", async () => {
  try {
    const response = await fetch(`${API}/leads`, {
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
});

export const getUserLeads = createAsyncThunk(
  "leads/getUserLeads",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const response = await fetch(`${API}/leads/${values.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const leads = await response.json();
      console.log(leads);
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
  },
});

export default LeadSlice.reducer;
