import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

export const toastEmmiter = (
  message: string,
  type: "error" | "success" | "info"
) => {
  toast(message, {
    position: "top-right",
    type: type,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    theme: "light",
    autoClose: 3000,
  });
};
