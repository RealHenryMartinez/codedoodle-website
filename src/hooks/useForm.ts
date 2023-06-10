import React from "react";
import { useAppDispatch } from "../store/hook.js";
import { setDesc, setGeneral } from "../store/slices/postSlice.js";

const useForm = () => {
	const [markdownText, setMarkdownText] = React.useState("");
	const [title, setTitle] = React.useState<string>("");
	const dispatch = useAppDispatch();

	const handleTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setTitle(e.target.value);
		dispatch(setGeneral(e.target.value))
	};
	const handleImagePreview = (e: any, setImage: any) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0])); // create a uri object for the image preview
		}
	};
	const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.currentTarget.value;
		setMarkdownText(newValue);
		dispatch(setDesc(newValue))
	};

	return { onInputChange, handleImagePreview, markdownText, title, handleTitleChange};
};

export default useForm;
