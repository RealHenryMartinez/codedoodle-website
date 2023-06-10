import useForm from "../../hooks/useForm.js";
import "../../styles/form/markdown.css";
import { Markdown } from "./markdown.js";
export const MarkdownTextInput = () => {
	const { onInputChange, markdownText } = useForm();
	return (
		<div id="form-container">
			
			<div id="editor">
			<h1 className="header">Editor</h1>
				<textarea
					onChange={onInputChange}
					placeholder="Uses markdown ex:## Hello World Application"
				/>
			</div>

			<Markdown markdownText={markdownText} />
		</div>
	);
};
