import React from "react";

export const useImage = () => {
	const [selectedFile, setSelectedFile] = React.useState<File>();
	const [preview, setPreview] = React.useState<string>();

	// create a preview as a side effect, whenever selected file is changed
	React.useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = (e: React.FormEvent<HTMLFormElement>) => {
		if (
			!(<HTMLInputElement>e.target).files ||
			(<HTMLInputElement>e.target).files!.length === 0
		) {
			setSelectedFile(undefined);
			return;
		}

		// I've kept this example simple by using the first image instead of multiple
		setSelectedFile((<HTMLInputElement>e.target).files![0]);
	};
	// const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>, setImage: (image: string) => {}) => {
	// 	console.log("files targeted: ", e.target.files);
	// 	if (e.target.files && e.target.files[0]) {
	// 		setImage(URL.createObjectURL(e.target.files[0])); // create a uri object for the image preview
	// 	}
	// };
	return {
		onSelectFile,
		selectedFile,
		preview,
	};
};
