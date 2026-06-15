import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { textAlign } from '../../utils/direction';

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
  style?: StyleProp<TextStyle>;
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
          alignSelf: 'flex-start',
          textAlign: textAlign(),
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