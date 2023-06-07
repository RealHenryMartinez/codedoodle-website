import { useEffect } from "react";
import { useImage } from "../../hooks/useImage.js";
import IError from "../../interfaces/form/IError.js";
import "../../styles/form/form.css";

export const ErrorMessage = () => {
	const { checkForError } = useImage();
	return (
		<>
			{checkForError .show ? (
				<div id="error-container">{checkForError .message}</div>
			) : null}
		</>
	);
};
