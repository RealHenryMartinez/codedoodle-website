import React from "react";

const useForm = () => {
	const handleImagePreview = (e, setImage, image) => {
		console.log("files targeted: ", e.target.files);
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0])); // create a uri object for the image preview
		}
	};

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const cloneBusiness = Object.assign({}, mainFormStructure);
        const business = {
          ...cloneBusiness,
          //userId: auth.currentUser.uid,
        };

        // try {
        //   dispatch(addBusiness(business));
        // } catch (e) {
        //   console.log(e);
        // }
    
        console.log("submitted:", mainFormStructure);
      };

	return {handleSubmitForm, handleImagePreview};
};

export default useForm;
