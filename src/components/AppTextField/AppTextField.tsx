import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { hp, wp } from '../../utils/dimensions';
import { textAlign } from '../../utils/direction';
import { SvgView } from '../SvgView/SvgView';
import AppText from '../AppText/AppText';

const COLORS = {
  bgDefault: "#FFFFFF",
  bgFilled: '#F7F9FE', 
  bgActive: '#FFFFFF', 
  borderActive: '#18359E',
  borderError: '#E34935',
  borderResting: '#E6E6E6',
  labelResting: '#8C8C93', 
  labelFloating: '#8C8C93',
  text: '#1A1A1A',
  error: '#E34935',
};

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIcon: any;
  leftIcon?: any;
  onLeftIconPress?: () => void;
  onBlur?: (e?: any) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
};

const AppInput = ({
  label,
  value,
  onChangeText,
  rightIcon,
  leftIcon,
  onLeftIconPress,
  onBlur,
  secureTextEntry,
  keyboardType,
  error,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const isFloating = focused || hasError;
  const showLabel = isFloating || !value;
  const defaultInput = !value && !focused;

  const animatedValue = useRef(new Animated.Value(isFloating ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFloating ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFloating, animatedValue]);

  const backgroundColor = isFloating ? COLORS.bgActive : defaultInput ? COLORS.bgDefault : COLORS.bgFilled;
  const borderColor = hasError
    ? COLORS.borderError
    : focused
    ? COLORS.borderActive
    : COLORS.borderResting;

  const labelStyle = {
    position: 'absolute' as const,
    start: focused || hasError ? wp(20) : wp(55),

    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -10],
    }),

    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),

    backgroundColor: isFloating ? COLORS.bgActive : 'transparent',
    paddingHorizontal: isFloating ? wp(4) : 0,
    zIndex: 10,
    color: isFloating ? COLORS.labelFloating : COLORS.labelResting,
    lineHeight: 24,
    paddingVertical: 0,
    maxWidth: wp(220),
    overflow: 'hidden' as const,
    textAlign: textAlign(),
  };

  return (
    <View style={styles.container}>
      {showLabel ? (
        <Animated.Text
          style={labelStyle}
          numberOfLines={1}
          pointerEvents="none"
        >
          {label}
        </Animated.Text>
      ) : null}

      <View
        style={[styles.inputContainer, { backgroundColor, borderColor }]}
      >       
        <SvgView svgFile={rightIcon} width={wp(24)} height={hp(24)} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={styles.input}
        />

        {leftIcon ? (
          <TouchableOpacity onPress={onLeftIconPress}>
            <SvgView svgFile={leftIcon} width={wp(24)} height={hp(24)} />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftIconSpace} />
        )}
      </View>

      {hasError ? (
        <View style={styles.errorRow}>
          <View style={styles.errorDot} />
          <AppText size={12} weight="500" color={COLORS.error}>
            {error}
          </AppText>
        </View>
      ) : null}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(16),
  },

  inputContainer: {
    height: hp(52),
    borderWidth: 1.5,
    borderRadius: wp(18),
    alignItems: 'center',
    paddingHorizontal: wp(16),
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: wp(8),
    color: COLORS.text,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
    marginTop: hp(6),
    marginHorizontal: wp(4),
  },

  errorDot: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: COLORS.error,
  },
  leftIconSpace: {
    width: wp(24)
  },
});
