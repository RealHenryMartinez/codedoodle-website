import React from "react";

const useForm = () => {
	const [markdownText, setMarkdownText] = React.useState("");
	const handleImagePreview = (e, setImage, image) => {
		console.log("files targeted: ", e.target.files);
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0])); // create a uri object for the image preview
		}
	};
	const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.currentTarget.value;
		setMarkdownText(newValue);
    const obj = {
      text: newValue
    }
    console.log(obj);
	};

	// const handleSubmitForm = async (e) => {
	//     e.preventDefault();
	//     const cloneBusiness = Object.assign({}, mainFormStructure);
	//     const business = {
	//       ...cloneBusiness,
	//       //userId: auth.currentUser.uid,
	//     };

	//     // try {
	//     //   dispatch(addBusiness(business));
	//     // } catch (e) {
	//     //   console.log(e);
	//     // }

	//     console.log("submitted:", mainFormStructure);
	//   };

	return { onInputChange, handleImagePreview, markdownText };
};

export default useForm;
