import { ToastProps } from "./Toast.types";

/**
 * Options accepted when triggering a toast imperatively.
 * `visible` / `onClose` are managed by the host, so they are omitted here.
 */
export type ShowToastOptions = Omit<ToastProps, "visible" | "onClose">;

type ShowHandler = (options: ShowToastOptions) => void;
type HideHandler = () => void;

let showHandler: ShowHandler | null = null;
let hideHandler: HideHandler | null = null;

/** Called once by <ToastHost /> to wire the singleton to React state. */
export const registerToast = (show: ShowHandler, hide: HideHandler) => {
  showHandler = show;
  hideHandler = hide;
};

export const unregisterToast = () => {
  showHandler = null;
  hideHandler = null;
};

/**
 * Show a toast from anywhere — including non-React code such as API
 * response/error handlers.
 */
export const showToast = (options: ShowToastOptions) => {
  showHandler?.(options);
};

export const hideToast = () => {
  hideHandler?.();
};
