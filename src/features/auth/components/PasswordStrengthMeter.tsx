import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp, wp } from '../../../utils/dimensions';

type Strength = 'none' | 'weak' | 'medium' | 'strong';

const CHECKS: ((password: string) => boolean)[] = [
  password => password.length >= 8,
  (password) => /[!@#$%^&*(),.?":{}|<>\-_]/.test(password), 
  (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  (password) => /[0-9]/.test(password)
];

const getStrength = (password: string): Strength => {
  if (!password) return 'none';
  const met = CHECKS.filter(check => check(password)).length;
  if (met >= 4) return 'strong';
  if (met === 3) return 'medium';
  return 'weak';
};

const CONFIG: Record<
  Exclude<Strength, 'none'>,
  { color: string; bars: number; labelKey: string }
> = {
  weak: { color: '#EF4444', bars: 1, labelKey: 'auth.createNewPassword.strengthWeak' },
  medium: { color: '#F59E0B', bars: 2, labelKey: 'auth.createNewPassword.strengthMedium' },
  strong: { color: '#12B76A', bars: 3, labelKey: 'auth.createNewPassword.strengthStrong' },
};

type Props = {
  password: string;
};

const PasswordStrengthMeter = ({ password }: Props) => {
  const { t } = useTranslation();

  const strength = useMemo(
    () => getStrength(password),
    [password],
  );
  const config = strength === 'none' ? null : CONFIG[strength];

  const STRENGTH_BARS = [0, 1, 2] as const;

  return (
    <View style={styles.container}>
      <View style={styles.labelGroup}>
        <View style={styles.dot} />
        <AppText size={12} weight="400" color="#6F6F74">
          {t('auth.createNewPassword.strengthLabel')}
        </AppText>
      </View>

      <View style={styles.meterGroup}>
        {config ? (
          <AppText size={13} weight="600" color={config.color}>
            {t(config.labelKey)}
          </AppText>
        ) : null}

        <View style={styles.bars}>
          {STRENGTH_BARS.map(index => (
            <View
              key={index}
              style={[
                styles.bar,
                {
                  backgroundColor:
                    config && index < config.bars ? config.color : '#E5E7EB',
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(24),
    gap: wp(8),
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },
  meterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  dot: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#6F6F74',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  bar: {
    width: wp(47),
    height: hp(4),
    borderRadius: wp(2),
  },
});

export default PasswordStrengthMeter;