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

  backgroundColor?: string;

  width?: string | number;
  style?: any;
}

const AppButton = ({
  style,
  title,
  onPress,
  disabled,
  loading,
  backgroundColor = '#1A3167',
  width,
}: Props) => {
  const titleColor =
    backgroundColor === '#F2F2F2' || backgroundColor === '#EDF4FF'
      ? '#000000'
      : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        appButtonStyles.button,
        { backgroundColor, width: width as any },
        (disabled || loading) && appButtonStyles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[appButtonStyles.title, { color: titleColor }]}> 
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;