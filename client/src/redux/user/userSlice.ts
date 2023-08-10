import { createSlice } from "@reduxjs/toolkit";
import { handleCreateUser } from "./userAction";

interface UserType {
  _id: any;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
}

export interface UserState {
  isAuthentication: boolean;
  user: UserType | undefined;
  status: {
    user: "idle" | "loading" | "succeeded" | "failed";
  };
  error: {
    user: string | object | undefined;
  };
}

const initialState: UserState = {
  isAuthentication: false,
  user: undefined,
  status: {
    user: "idle",
  },
  error: {
    user: undefined,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleCreateUser.pending, (state, _action) => {
        state.status.user = "loading";
      })
      .addCase(handleCreateUser.fulfilled, (state, action) => {
        state.status.user = "succeeded";
        state.error.user = undefined;
        state.user = action.payload;
      })
      .addCase(handleCreateUser.rejected, (state, action) => {
        state.status.user = "failed";
        state.error.user = action.error;
      });
  },
});

export default userSlice.reducer;
