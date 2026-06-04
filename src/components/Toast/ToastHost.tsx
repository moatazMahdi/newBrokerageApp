import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Toast from ".";
import {
  registerToast,
  unregisterToast,
  ShowToastOptions,
} from "./toastService";
import { hp } from "../../utils/dimensions";

/**
 * Listens to the toast singleton and renders the active toast as an overlay
 * pinned to the top of its parent (the screen content card).
 */
export default function ToastHost() {
  const [options, setOptions] = useState<ShowToastOptions | null>(null);
  const [visible, setVisible] = useState(false);

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
    <View style={styles.host} pointerEvents="box-none">
      <Toast {...options} visible={visible} onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: "absolute",
    top: hp(8),
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
});
