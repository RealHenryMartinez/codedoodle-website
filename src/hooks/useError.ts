import IError from "../interfaces/form/IError.js";

export const handleError = (
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
  });
  setTimeout(() => {
    setIsAlertVisible((prev) => ({
      ...prev,
      show: false,
      message: "",
    }));
  }, 3000);
};
