import { ToastProps } from "./Toast.types";

export type ShowToastOptions = Omit<ToastProps, "visible" | "onClose">;

type ShowHandler = (options: ShowToastOptions) => void;
type HideHandler = () => void;

let showHandler: ShowHandler | null = null;
let hideHandler: HideHandler | null = null;

export const registerToast = (show: ShowHandler, hide: HideHandler) => {
  showHandler = show;
  hideHandler = hide;
};

export const unregisterToast = () => {
  showHandler = null;
  hideHandler = null;
};

export const showToast = (options: ShowToastOptions) => {
  showHandler?.(options);
};

export const hideToast = () => {
  hideHandler?.();
};
