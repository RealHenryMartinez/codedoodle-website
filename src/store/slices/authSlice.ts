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

export const fetchUser = createAsyncThunk("useAuthSlice/fetchUser", async () => {
  const token = Cookies.get('token');
  if (token) {
    const { data } = await app.post("", {}, { withCredentials: true });
    console.log(data)
    const { user } = data;
    return user;
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
      state = { ...state, ...payload };
    });
  },
}); 

export const { setUser } = useAuthSlice.actions;

export const user = (state: RootState) => state.useAuthSlice;
export default useAuthSlice.reducer;
