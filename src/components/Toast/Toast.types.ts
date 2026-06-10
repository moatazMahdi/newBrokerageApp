import { FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";

export interface ToastProps {
  closeIcon?: FunctionComponent<SvgProps>;
  collapsedIcon?: FunctionComponent<SvgProps>;
  message?: string;
  size?: ToastSize;
  title?: string;
  titleIcon?: FunctionComponent<SvgProps>;
  type?: ToastTypes;
  dismissible?: boolean;
  autoDismiss?: number;
  collapsed?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

export type ToastSize = "lg" | "md";

export type ToastTypes = "error" | "information" | "success";

export interface ToastVariants {
  type: Record<ToastTypes, { backgroundColor: string; text: string }>;
  size: Record<
    ToastSize,
    { width: number; fontSize: number; lineHeight: number }
  >;
}
