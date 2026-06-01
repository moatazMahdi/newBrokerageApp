import React, { useRef } from 'react';
import {
  I18nManager,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { hp, wp } from '../../../utils/dimensions';

type Props = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
};

const OtpInput = ({ length = 6, value, onChange }: Props) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputs.current[index]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(''));

    if (digit) {
      focusInput(index + 1);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index]) {
      focusInput(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.box,
            { borderColor: digit ? '#1A3167' : '#D9D9D9' },
          ]}
        />
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    marginTop: hp(24),
  },
  box: {
    width: wp(48),
    height: hp(56),
    borderWidth: 1.5,
    borderRadius: wp(12),
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    backgroundColor: '#fff',
  },
});
