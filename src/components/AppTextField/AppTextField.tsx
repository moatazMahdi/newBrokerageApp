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
import { SvgView } from '../SvgView/SvgView';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIcon: any;
  leftIcon?: any;
  onLeftIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const AppInput = ({
  label,
  value,
  onChangeText,
  rightIcon,
  leftIcon,
  onLeftIconPress,
  secureTextEntry,
  keyboardType,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const animatedValue = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    ...(I18nManager.isRTL ? { left: wp(55) } : { right: wp(55) }),

    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -10],
    }),

    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),

    backgroundColor: '#fff',
    zIndex: 10,
    color: 'black',
    lineHeight: 24,
    paddingVertical: 0,
    maxWidth: wp(220),
    overflow: 'hidden' as const,
    textAlign: I18nManager.isRTL ? ('right' as const) : ('left' as const),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle} numberOfLines={1}>
        {label}
      </Animated.Text>

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focused ? '#2345B5' : '#D9D9D9',
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          },
        ]}
      >
        {leftIcon ? (
          <TouchableOpacity onPress={onLeftIconPress}>
            <SvgView
              svgFile={leftIcon}
              width={wp(24)}
              height={hp(24)}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: wp(24) }} />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />

        {/* <View style={styles.separator} /> */}

        <SvgView
          svgFile={rightIcon}
          width={wp(24)}
          height={hp(24)}
          
        />
      </View>
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(20),
  },

  inputContainer: {
    height: hp(52),
    borderWidth: 1.5,
    borderRadius: wp(18),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    fontSize: 18,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  separator: {
    width: 1,
    height: hp(30),
    backgroundColor: '#fff',
    // marginHorizontal: wp(12),
  },
});