import { StyleSheet } from "react-native";
import { fs, hp, wp } from "../../utils/dimensions";
import { ToastSize, ToastTypes } from "./Toast.types";

/**
 * Per-variant colors (local replacement for a Theme file).
 */
export const toastVariants: {
  type: Record<ToastTypes, { backgroundColor: string; text: string }>;
  size: Record<
    ToastSize,
    { width: number; fontSize: number; lineHeight: number }
  >;
} = {
  type: {
    error: { backgroundColor: "#FFF6F5", text: "#FC3B30" },
    information: { backgroundColor: "#FFF4E5", text: "#E08700" },
    success: { backgroundColor: "#EAF7EE", text: "#2E7D32" },
  },
  size: {
    lg: {
      width: wp(343),
      fontSize: fs(14),
      lineHeight: fs(20),
    },
    md: {
      width: wp(343),
      fontSize: fs(12),
      lineHeight: fs(18),
    },
  },
};

export const getToastStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: hp(48),
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: wp(12),
      marginHorizontal: "auto",
      paddingHorizontal: wp(16),
      paddingVertical: hp(8),
      borderRadius: wp(8),
      borderWidth: 0.5,
    },
    centeredRow: {
      alignItems: "center",
    },
    contentRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(8),
      flexShrink: 1,
      flexGrow: 1,
    },
    messageInline: {
      flex: 1,
      textAlign: "center",
    },
    collapsedContainer: {
      width: wp(343),
      height: hp(36),
      justifyContent: "center",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(8),
    },
    title: {
      flex: 1,
    },
    icon: {
      height: hp(20),
      width: wp(20),
    },
  });
