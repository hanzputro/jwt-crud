import { createAsyncThunk } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../features/mutation/user";

interface CreateUserType {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
}

export const handleCreateUser = createAsyncThunk(
  "createUser",
  async ({ username, email, password }: CreateUserType) => {
    const [createUser, { data }] = useMutation(CREATE_USER);
    await createUser({ variables: { username, email, password } });
    return data;
  }
);
