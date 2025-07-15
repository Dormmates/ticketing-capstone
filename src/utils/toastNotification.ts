import { Slide, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseConfig: ToastOptions = {
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
  success: (message: string, closeTime?: number) => toast.success(message, { ...baseConfig, autoClose: closeTime ?? baseConfig.autoClose }),
  error: (message: string, closeTime?: number) => toast.error(message, { ...baseConfig, autoClose: closeTime ?? baseConfig.autoClose }),
  warning: (message: string, closeTime?: number) => toast.warning(message, { ...baseConfig, autoClose: closeTime ?? baseConfig.autoClose }),
  info: (message: string, closeTime?: number) => toast.info(message, { ...baseConfig, autoClose: closeTime ?? baseConfig.autoClose }),
};

export default ToastNotification;
