import { useImage } from "../../hooks/useImage.js";
import "../../styles/form/image.css";

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
					<label className="custom-file-upload">
						<input
							type="file"
							onChange={(e: any) => onSelectFile(e)}
						/>
						Upload Card Cover
					</label>
					<div>{selectedFile && <img id="card-preview" src={preview} />}</div>
				</div>
			</form>
		</>
	);
};
