import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IAuth.js";
import { RootState } from "../store.js";

const initialState: IUser = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};
export const useAuthSlice = createSlice({
	name: "useAuthSlice",
	initialState,
	reducers: {
		setUser: (state, {payload}) => {
			state.firstName = payload.first_name
            state.lastName = payload.last_name
            state.email = payload.email
            state.password = payload.password
		},
	},
});
export const { setUser } = useAuthSlice.actions;

export const user = (state: RootState) => state.useAuthSlice;
export default useAuthSlice.reducer;