import React from "react";
import { UploadImage } from "./UploadImage.js";

export const FormPage = () => {
	const [imagePreview, setImagePreview] = React.useState(null);
    // OPen source platform
	return (
		<div>
			<UploadImage />
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
