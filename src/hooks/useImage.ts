import axios, { AxiosError } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../constants/API.js";
import { useAppDispatch } from "../store/hook.js";
import { makePost } from "../store/slices/postSlice.js";
import IError from '../interfaces/form/IError.js';
import { handleError } from "./useError.js";

let checkForError: IError = {
	show: false,
	message: '',
};

export const useImage = () => {
	const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
		undefined
	);
	const [isAlertVisible, setIsAlertVisible] = React.useState<IError>({
		show: false,
		message: '',
	});
	const [preview, setPreview] = React.useState<string>();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	
	React.useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	React.useEffect(() => {
		checkForError = isAlertVisible;
    },[isAlertVisible]) // <-- here put the param

	const onSelectFile = async (e: React.FormEvent<HTMLInputElement>, cardId: string) => {
		
		if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
			console.log("Error: No file selected");
			setSelectedFile(undefined);
			return;
		}

		const file = e.currentTarget.files[0];
		console.log(e.currentTarget.name);
		console.log(file);
		setSelectedFile(file);
		const formData = new FormData();
		formData.append("card-image", file, file.name);
		formData.append("_id", cardId);

		app.post("/create/card-image", formData);
	};

	const handleSubmitRequest = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		let tempCardId = "";
		try {
			const postData: AxiosError | any = await dispatch(makePost());
			if(axios.isAxiosError(postData.payload)){
				handleError(setIsAlertVisible,postData.payload.message)
				return;
			}
			// Work later with handling editing of the card image
			tempCardId = postData.payload._id;
			navigate('/edit-image', {state: {tempCardId}});
			// to update: get from the card
			
			// to change username or any user info, make sure that to update only every 14 days
			console.log("Post card uplaoded");

			// Rest of your code
		} catch (err) {
			console.error(err);
			console.log("Failed to upload image. Please try again.");
		}
	};

	return {
		onSelectFile,
		preview,
		selectedFile,
		handleSubmitRequest,
		checkForError
	};
};
