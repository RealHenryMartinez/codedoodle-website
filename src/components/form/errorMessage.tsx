import { useImage } from "../../hooks/useImage.js";
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
