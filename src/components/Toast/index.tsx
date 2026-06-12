import { FunctionComponent, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SvgProps } from "react-native-svg";

import { Assets } from "../../assets";
import AppText from "../AppText/AppText";
import SvgView from "../SvgView/SvgView";
import { getToastStyles, toastVariants } from "./Toast.styles";
import { ToastProps, ToastTypes } from "./Toast.types";

const { Close, Error, Information } = Assets.images.components;

const defaultTitleIcons: Record<
  ToastTypes,
  FunctionComponent<SvgProps> | undefined
> = {
  error: Error,
  information: Information,
  success: undefined,
};

export default function Toast({
  closeIcon,
  collapsedIcon,
  message,
  size = "lg",
  title,
  titleIcon,
  type = "success",
  dismissible = true,
  autoDismiss = 5000,
  collapsed = false,
  visible = true,
  onClose,
}: ToastProps) {
  const baseStyles = getToastStyles();
  const typeStyle = toastVariants.type[type];
  const sizeStyle = toastVariants.size[size];

  const [isVisible, setIsVisible] = useState(visible);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const resolvedTitleIcon = titleIcon ?? defaultTitleIcons[type];
  const resolvedCloseIcon = closeIcon ?? Close;
  const hasTitle = !!title;

  const dismiss = () => {
    setIsVisible(false);
    onClose?.();
  };

  const toastStyle = {
    ...baseStyles.container,
    backgroundColor: typeStyle.backgroundColor,
    borderColor: typeStyle.text,
    width: sizeStyle.width,
  };

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (autoDismiss) {
      const time = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoDismiss);
      return () => clearTimeout(time);
    }
  }, [autoDismiss, onClose]);

  if (!isVisible) return null;

  const renderIcon = (svg: FunctionComponent<SvgProps>) => (
    <SvgView
      svgFile={svg}
      fill={typeStyle.text}
      width={baseStyles.icon.width}
      height={baseStyles.icon.height}
    />
  );

  const titleNode = (
    <View style={baseStyles.titleContainer}>
      {resolvedTitleIcon && renderIcon(resolvedTitleIcon)}
      <AppText
        style={baseStyles.title}
        color={typeStyle.text}
        size={sizeStyle.fontSize}
        weight="700"
      >
        {title}
      </AppText>
    </View>
  );

  if (isCollapsed) {
    return (
      <View style={[toastStyle, baseStyles.collapsedContainer]}>
        <View style={baseStyles.topRow}>
          {titleNode}
          {collapsedIcon && (
            <Pressable onPress={() => setIsCollapsed(false)}>
              {renderIcon(collapsedIcon)}
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[toastStyle, baseStyles.centeredRow]}>
      <View style={[baseStyles.contentRow, {alignItems: ((dismissible == false) && !hasTitle) ? "center" : "flex-start"}]}>
        {resolvedTitleIcon && renderIcon(resolvedTitleIcon)}
        <View style={baseStyles.textContent}>
          {hasTitle && (
            <AppText color={typeStyle.text} size={sizeStyle.fontSize} weight="700">
              {title}
            </AppText>
          )}
          <AppText
            style={baseStyles.messageInline}
            color={typeStyle.text}
            size={14}
          >
            {message}
          </AppText>
        </View>
      </View>
      {dismissible && resolvedCloseIcon && (
        <Pressable onPress={dismiss}>{renderIcon(resolvedCloseIcon)}</Pressable>
      )}
    </View>
  );
}
