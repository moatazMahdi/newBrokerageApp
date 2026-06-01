import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from '../AppText/AppText';
import { hp, wp } from '../../utils/dimensions';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  size?: number;
  color?: string;
};

const AppCheckbox = ({
  checked,
  onChange,
  label,
  size = 20,
  color = '#1A3167',
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onChange(!checked)}
      style={styles.container}
    >
      <View
        style={[
          styles.box,
          {
            width: wp(size),
            height: wp(size),
            borderColor: checked ? color : '#8C8C93',
            backgroundColor: checked ? color : '#fff',
          },
        ]}
      >
        {checked ? (
          <AppText size={12} weight="700" color="#fff">
            ✓
          </AppText>
        ) : null}
      </View>

      {label ? (
        <AppText size={14} weight="400" color="#6F6F74" style={styles.label}>
          {label}
        </AppText>
      ) : null}
    </TouchableOpacity>
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  box: {
    borderWidth: 1.5,
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    lineHeight: hp(19),
  },
});
