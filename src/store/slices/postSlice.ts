import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.js";
import { app } from "../../constants/API.js";
import { IForm, ILabels } from "../../interfaces/form/IForm.js";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token')
const initialState: IForm = {
  labels: [],
  uid: "",
  username: "",
  title: "",
  description: "",
  image: null, // Check later IF you have an image here by the FILE type
};

export const makePost = createAsyncThunk(
  "usePostSlice/makePost",
  async (_, { getState }) => {
    const state = getState() as RootState;

    const { labels, uid, username, title, description, image } =
      state.usePostSlice;

    try {
      const { data } = await app.post(
        "create",
        {
          labels,
          uid,
          username,
          title,
          description,
          image,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return data;
    } catch (err) {
      return err as AxiosError;
    }
  }
);

export const usePostSlice = createSlice({
  name: "usePostSlice",
  initialState,
  reducers: {
    setGeneral: (state, { payload }) => {
      state.title = payload;
    },
    setContent: (state, { payload }) => {
      state.description = payload;
    },
    setUserCard: (state, { payload }) => {
      state.uid = payload._id;
      state.username = payload.first_name + " " + payload.last_name;
    },
    setAddLabel: (state, action: PayloadAction<ILabels>) => {
      state.labels?.push(action.payload);
    },

    setRemoveLabel: (state, action: PayloadAction<ILabels>) => {
      state.labels = state.labels?.filter(
        (label) => label.name !== action.payload.name
      );
    },
  },
});

export const { setUserCard, setAddLabel, setRemoveLabel, setGeneral, setContent } =
  usePostSlice.actions;

export const card: (state: RootState) => IForm = (state: RootState) =>
  state.usePostSlice;
export default usePostSlice.reducer;
