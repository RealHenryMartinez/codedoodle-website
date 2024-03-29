import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IAuth.js";
import { RootState } from "../store.js";
import { app } from "../../constants/API.js";

const initialState: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  _id: "",
};
// JWT token is sent via headers so we could access from backend
export const fetchUser = createAsyncThunk(
  "useAuthSlice/fetchUser",
  async (token: string) => {
    console.log('token: ', token)
    if (token) {
      const { data } = await app.post(
        "",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      const { user } = data;
      return user;
    }
  }
);

export const useAuthSlice = createSlice({
  name: "useAuthSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (typeof payload !== "undefined" && payload !== null) {
        state.firstName = payload.first_name;
        state.lastName = payload.last_name;
        state.email = payload.email;
        state.password = payload.password;
        state._id = payload._id;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });
  },
});

export const { setUser } = useAuthSlice.actions;

export const user = (state: RootState) => state.useAuthSlice;
export default useAuthSlice.reducer;
