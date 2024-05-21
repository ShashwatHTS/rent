import { toast } from "react-toastify";

function errorToast(message) {
  toast.dismiss();
  toast.error(message);
}

function successToast(message) {
  toast.dismiss();
  toast.success(message);
}

export { errorToast, successToast };
