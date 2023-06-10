import IError from "../interfaces/form/IError.js";

interface IProps {
	checkForError: IError;
}

export const LoginError = (props: IProps) => {
	const { checkForError } = props;
	return (
		<>
			{checkForError.show ? (
				<div id="error-container">{checkForError.message}</div>
			) : null}
		</>
	);
};
