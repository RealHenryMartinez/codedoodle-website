import { ErrorMessage } from "../components/form/errorMessage.js";
import { LabelConfig } from "../components/form/labelConfig.js";
import { MarkdownTextInput } from "../components/form/markdownTextInput.js";
import useForm from "../hooks/useForm.js";
import { useImage } from "../hooks/useImage.js";
import '../styles/form/form.css'

export const FormPage = () => {
	const { handleTitleChange, title} = useForm();
	const { handleSubmitRequest} = useImage();
    // OPen source platform
	return (
		<div id="page">
			<ErrorMessage />
			<div id="title-form">
				<h3>Title</h3>
				<input required placeholder="Awesome Website 🔥" type="text" value={title} onChange={(e) => handleTitleChange(e)}/>
			</div>
			
			<MarkdownTextInput />
			<LabelConfig />
			<button type="button" id="form-submit" onClick={(e) => handleSubmitRequest(e)}>Next Page</button>
		</div>
	);
};
