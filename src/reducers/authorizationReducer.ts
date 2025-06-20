import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../models/initialState";

export const fetchAuthorization = createAsyncThunk(
  "fetchAuthorization",
  async () => {
    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return await response.json();
  },
);

const initialState: InitialState<string> = {
  loading: false,
  error: false,
  data: "",
  status: "idle",
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorization.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(fetchAuthorization.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAuthorization.rejected, (state) => {
      state.error = true;
      state.status = "failed";
    });
  },
});

export default authorizationSlice.reducer;
