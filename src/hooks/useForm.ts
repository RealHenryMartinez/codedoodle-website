import React from "react";
import { useAppDispatch } from "../store/hook.js";
import { setContent, setGeneral } from "../store/slices/postSlice.js";

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

	/**
	 * Handle text input of the markdown content
	 * @param element Detect changes in text of the input element
	 */
	const handleContent = (element: React.ChangeEvent<HTMLTextAreaElement>) => {
		const currentValue = element.currentTarget.value;
		setMarkdownText(currentValue);
		dispatch(setContent(currentValue))
	};

	return { handleContent, markdownText, title, handleTitleChange};
};

export default useForm;
