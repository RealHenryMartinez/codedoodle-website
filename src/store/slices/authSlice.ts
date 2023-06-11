import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IAuth.js";
import Cookies from "js-cookie";
import { RootState } from "../store.js";
import { app } from "../../constants/API.js";

const initialState: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  _id: "",
};
// This needs to be fixed from the cookie it sends
export const fetchUser = createAsyncThunk("useAuthSlice/fetchUser", async (token: string) => {
  console.log("Here is token from auth slice:", token);
  if (token) {
    const { data } = await app.post("", {}, { withCredentials: true });
    console.log("here is data from auth slice: ",data)
    const { user } = data;
    return user;
  }
  else {
    console.log('no token')
  }
});

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
