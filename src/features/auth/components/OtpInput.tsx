import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { hp, wp } from '../../../utils/dimensions';

type Props = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
};

const OtpInput = ({ length = 6, value, onChange }: Props) => {
  const inputRef = useRef<TextInput | null>(null);
  const [focused, setFocused] = useState(false);
  const caretOpacity = useRef(new Animated.Value(1)).current;

  const digits = Array.from({ length }, (_, i) => value[i] ?? '');
  const activeIndex = Math.min(value.length, length - 1);

  // Blink the caret (500ms fade in / out) while the field is focused.
  useEffect(() => {
    if (!focused) {
      return;
    }
    caretOpacity.setValue(1);
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(caretOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(caretOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    blink.start();
    return () => blink.stop();
  }, [focused, caretOpacity]);

  const handleChange = (text: string) => {
    const sanitized = text.replace(/[^0-9]/g, '').slice(0, length);
    onChange(sanitized);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => inputRef.current?.focus()}
    >
      {digits.map((digit, index) => {
        const isActive = focused && index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.box,
              { borderColor: isActive ? '#E6E6E6' : '#E6E6E6' },
              { backgroundColor: digit ? '#F7F9FE' : '#FFFFFF' },
            ]}
          >
            {isActive && !digit ? (
              <Animated.View
                style={[styles.caret, { opacity: caretOpacity }]}
              />
            ) : (
              <Text style={styles.digit}>{digit}</Text>
            )}
          </View>
        );
      })}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        caretHidden
        textContentType="oneTimeCode"
        style={styles.hiddenInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Pressable>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: hp(24),
  },
  box: {
    width: wp(50),
    height: hp(50),
    borderWidth: 1,
    borderRadius: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  digit: {
    fontSize: hp(24),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  caret: {
    width: wp(2),
    height: hp(24),
    borderRadius: wp(1),
    backgroundColor: '#1A3167',
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
