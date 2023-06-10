import IError from "../interfaces/form/IError.js";

export const handleFormError = (
  setIsAlertVisible: React.Dispatch<React.SetStateAction<IError>>,
  errorMessage: string
) => {
  setIsAlertVisible((prev) => ({
    ...prev,
    show: true,
    message: errorMessage,
  }));
  setTimeout(() => {
    setIsAlertVisible((prev) => ({
      ...prev,
      show: false,
      message: "",
    }));
    console.log("stop,", errorMessage);
  }, 3000);
};
