import React from 'react';

import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

import { appButtonStyles } from './appButton.styles';

interface Props {
  title: string;

  onPress: () => void;

  disabled?: boolean;

  loading?: boolean;
}

const AppButton = ({
  title,
  onPress,
  disabled,
  loading,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        appButtonStyles.button,

        disabled &&
          appButtonStyles.disabledButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color="#FFFFFF"
        />
      ) : (
        <Text
          style={appButtonStyles.title}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;