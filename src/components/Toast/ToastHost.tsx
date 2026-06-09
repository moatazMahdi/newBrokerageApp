import { useCallback, useEffect, useState } from "react";
import {  View } from "react-native";

import Toast from ".";
import {
  registerToast,
  unregisterToast,
  ShowToastOptions,
} from "./toastService";
import { getToastStyles } from "./Toast.styles";

export default function ToastHost() {
  const [options, setOptions] = useState<ShowToastOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const baseStyles = getToastStyles();

  useEffect(() => {
    registerToast(
      next => {
        setOptions(next);
        setVisible(true);
      },
      () => setVisible(false),
    );
    return unregisterToast;
  }, []);

  const handleClose = useCallback(() => setVisible(false), []);

  if (!options || !visible) return null;

  return (
    <View style={baseStyles.host} pointerEvents="box-none">
      <Toast {...options} visible={visible} onClose={handleClose} />
    </View>
  );
}