import React from "react";
import { MarkdownTextInput } from "../components/form/markdownTextInput.js";
import { UploadImage } from "../components/form/uploadImage.js";

export const FormPage = () => {
	const [imagePreview, setImagePreview] = React.useState(null);
    // OPen source platform
	return (
		<div>
			<UploadImage />
			<MarkdownTextInput />
			{/* <form
				onSubmit={handleSubmitForm}
				encType="multipart/form-data"
				action="/"
				method="post"
			>
				{imageBusinessPreview === null ? null : (
					<img
						src={imageBusinessPreview}
						alt="preview image"
						className="imagePreview"
					/>
				)}
			</form> */}
		</div>
	);
};
