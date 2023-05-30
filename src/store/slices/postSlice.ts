import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store.js";
import { app } from "../../constants/API.js";
import { IForm } from "../../interfaces/form/IForm.js";

const initialState: IForm = {
	labels: null,
	userId: "",
	user: "",
	title: "",
	description: "",
	image: null,
};

export const makePost = createAsyncThunk(
	"usePostSlice/fetchUser",
	async () => {
		const token = Cookies.get();
		if (token) {
			const { data } = await app.post(
				"/cardImage",
				{},
				{ withCredentials: true }
			);
			const { user } = data;
			return user;
		}
	}
);
export const uploadCover = createAsyncThunk(
	"usePostSlice/uploadCover",
	async () => {
		const token = Cookies.get();
		if (token) {
			const { data } = await app.post(
				"/",
				{},
				{ withCredentials: true }
			);
			const { user } = data;
			return user;
		}
	}
);

export const usePostSlice = createSlice({
	name: "usePostSlice",
	initialState,
	reducers: {
		setGeneral: (state, { payload }) => {
			if (typeof payload !== "undefined" && payload !== null) {
				state.title = payload.title;
				state.description = payload.description;
			}
		},
		setUser: (state, { payload }) => {
			state.userId = payload.userId;
			state.user = payload.user;
		},
		setImage: (state, { payload }) => {
			state.image = payload.image;
		},
	},
});

export const { setUser } = usePostSlice.actions;

export const user = (state: RootState) => state.usePostSlice;
export default usePostSlice.reducer;
