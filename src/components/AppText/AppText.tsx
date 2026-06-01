import React from 'react';
import {
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

type FontWeight =
  | '400'
  | '500'
  | '600'
  | '700';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: FontWeight;
  style?: TextStyle | TextStyle[];
}

const AppText = ({
  children,
  size = 16,
  color = '#000',
  weight = '400',
  style,
  ...props
}: AppTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontSize: size,
          color,
          fontWeight: weight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;