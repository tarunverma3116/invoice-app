import { toast } from 'react-toastify';

export const getSuccessNotificationMessage = (message) => {
  return (
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
      theme: "colored",
      style: {
        background: "linear-gradient(90deg, #10b981 0%, #3ADE99 100%)",
        fontSize: "13px",
        fontWeight: "bold",
      }
    })
  )
};

export const getErrorNotificationMessage = (message) => {
  return (
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
      theme: "colored",
      style: {
        background: "linear-gradient(90deg, #93291E 0%, #ff5724 100%)",
        fontSize: "13px",
        fontWeight: "bold",
        zIndex:"999999 !important"
      }
    })
  )
};
