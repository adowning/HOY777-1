import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  rtl: false,
};

export default Toast;