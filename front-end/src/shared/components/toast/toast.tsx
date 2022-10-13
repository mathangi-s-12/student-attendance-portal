import { toast as Toast, Slide, ToastOptions } from "react-toastify"

type ToastTypes = "success" | "error" | "warning" | "info"

const getToastConfig = (type: ToastTypes = "success"): ToastOptions => {
  const toastStyleMap = {
    success: {
      type: Toast.TYPE.SUCCESS,
      position: Toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      toastId: "success-toast",
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      transition: Slide,
    },
    error: {
      type: Toast.TYPE.ERROR,
      position: Toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      toastId: "error-toast",
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      transition: Slide,
    },
    warning: {
      type: Toast.TYPE.WARNING,
      position: Toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      toastId: "warning-toast",
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      transition: Slide,
    },
    info: {
      type: Toast.TYPE.INFO,
      position: Toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      toastId: "info-toast",
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      transition: Slide,
    },
  }
  return toastStyleMap[type]
}

const toast = (type: ToastTypes = "success", message: string = "-", lang: string = "en") => {
  return Toast(message, getToastConfig(type))
}

export default toast
