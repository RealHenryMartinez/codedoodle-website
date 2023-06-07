import IError from "../interfaces/form/IError.js";

export const handleError = (setIsAlertVisible: React.Dispatch<React.SetStateAction<IError>>, errorMessage: string) => {
	setIsAlertVisible(prev => {return{
        ...prev, show: true, message: errorMessage
    }});
	setTimeout(() => {
		setIsAlertVisible(prev => {return{
            ...prev, show: false, message: ''
        }});
        console.log('stop,', errorMessage);
	}, 3000);

};
