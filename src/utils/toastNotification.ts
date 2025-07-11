import { Slide, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
};

const ToastNotification = {
  success: (message: string) => toast.success(message, config),
  error: (message: string) => toast.error(message, config),
  warning: (message: string) => toast.warning(message, config),
  info: (message: string) => toast.info(message, config),
};

export default ToastNotification;
