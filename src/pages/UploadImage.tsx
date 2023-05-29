import React from "react";
import { useImage } from "../hooks/useImage.js";
import '../styles/form/image.css';

export const UploadImage = () => {
	const { onSelectFile, selectedFile, preview } = useImage();
	return (
		<>
			<form
				encType="multipart/form-data"
				action="/"
				method="post"
                id="form"
			>
				<div>
                    <h1 id="header">Cover Image</h1>
					<input type="file" onChange={(e:any) => onSelectFile(e)} />
					{selectedFile && <img src={preview} />}
				</div>
			</form>
		</>
	);
};
