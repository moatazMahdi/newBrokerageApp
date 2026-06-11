import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: false,
});

/**
 * Returns true when the device has a biometric sensor that the user has
 * already enrolled (fingerprint / face). Never throws.
 */
export const isBiometricSensorAvailable = async (): Promise<boolean> => {
  try {
    const { available } = await rnBiometrics.isSensorAvailable();
    return available;
  } catch {
    return false;
  }
};

/**
 * Shows the native biometric prompt and resolves to true when the user
 * authenticates successfully (or false if they cancel / it fails).
 */
export const promptBiometric = async (promptMessage: string): Promise<boolean> => {
  try {
    const { success } = await rnBiometrics.simplePrompt({ promptMessage });
    return success;
  } catch {
    return false;
  }
};
