import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.js";
import { app } from "../../constants/API.js";
import { IForm, ILabels } from "../../interfaces/form/IForm.js";
import { AxiosError } from "axios";

const initialState: IForm = {
	labels: [],
	userId: "",
	user: "",
	title: "",
	description: "",
	image: null, // Check later IF you have an image here by the FILE type
};

export const makePost = createAsyncThunk(
	"usePostSlice/makePost",
	async (_, { getState }) => {
		const state = getState() as RootState;

		const { labels, userId, user, title, description, image } =
			state.usePostSlice;

		try {
			const { data } = await app.post("create", {
				labels,
				userId,
				user,
				title,
				description,
				image,
			});


			console.log(data);
			return data;
		} catch (err) {
			console.log(err)
			return err as AxiosError;
		}
	}
);

export const usePostSlice = createSlice({
	name: "usePostSlice",
	initialState,
	reducers: {
		setGeneral: (state, { payload }) => {
			console.log(payload);
			state.title = payload;
		},
		setDesc: (state, { payload }) => {
			console.log(payload);
			state.description = payload;
		},
		setUserCard: (state, { payload }) => {
			state.userId = payload._id;
			state.user = payload.first_name + " " + payload.last_name;
		},
		setAddLabel: (state, action: PayloadAction<ILabels>) => {
			state.labels?.push(action.payload);
		},

		setRemoveLabel: (state, action: PayloadAction<ILabels>) => {
			state.labels = state.labels?.filter(
				(label) =>
					label.name !== action.payload.name 
			);
		},
	},
});

export const { setUserCard, setAddLabel, setRemoveLabel, setGeneral, setDesc } =
	usePostSlice.actions;

export const card: (state: RootState) => IForm = (state: RootState) =>
	state.usePostSlice;
export default usePostSlice.reducer;
