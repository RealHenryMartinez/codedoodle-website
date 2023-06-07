import { useImage } from "../../hooks/useImage.js";
import "../../styles/form/image.css";

interface IProps {
	cardId: string;
}

export const UploadImage = (props: IProps) => {
	const { cardId } = props;
	const { onSelectFile, selectedFile, preview } = useImage();

	return (
		<>
			<form
				encType="multipart/form-data"
				// action="/"
				// method="post"
				id="form"
			>
				<div>
					<h1 id="header">Cover Image</h1>
					<label className="custom-file-upload">
						<input
							accept="image/png, .jpg, .jpeg"
							name="card-image"
							type="file"
							onChange={(e) => onSelectFile(e, cardId)}
						/>
						Upload Card Cover
					</label>
					<div>{selectedFile && <img id="card-preview" src={preview} />}</div>
				</div>
			</form>
		</>
	);
};
