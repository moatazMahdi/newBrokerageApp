import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp, wp } from '../../../utils/dimensions';
import SvgView from 'src/components/SvgView/SvgView';
import { Assets } from 'src/assets';

type Rule = {
  key: string;
  labelKey: string;
  test: (password: string) => boolean;
};

const RULES: Rule[] = [
  {
    key: 'minLength',
    labelKey: 'auth.createNewPassword.reqMinLength',
    test: password => password.length >= 8,
  },
  {
    key: 'specialChar',
    labelKey: 'auth.createNewPassword.reqSpecialChar',
    test: password => /[^A-Za-z0-9]/.test(password),
  },
  {
    key: 'upperLower',
    labelKey: 'auth.createNewPassword.reqUpperLower',
    test: password => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    key: 'number',
    labelKey: 'auth.createNewPassword.reqNumber',
    test: password => /[0-9]/.test(password),
  },
];

export const isPasswordValid = (password: string): boolean =>
  RULES.every(rule => rule.test(password));

type Props = {
  password: string;
};

const { circle, circleChecked } = Assets.images.components;

const PasswordRequirements = ({ password }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppText size={12} weight="600" color="#1A1A1A" style={styles.title}>
        {t('auth.createNewPassword.requirementsTitle')}
      </AppText>

      {RULES.map(rule => {
        const satisfied = rule.test(password);
        return (
          <View key={rule.key} style={styles.row}>
            <View>
              <SvgView
                svgFile={satisfied ? circleChecked : circle}
                width={16}
                height={16}
              />
            </View>
            <AppText
              size={13}
              weight="400"
              color={"#6F6F74"}
              style={styles.label}
            >
              {t(rule.labelKey)}
            </AppText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: wp(12),
    paddingHorizontal: wp(16),
    paddingVertical: hp(16),
    marginTop: hp(16),
  },
  title: {
    marginBottom: hp(12),
    lineHeight: hp(20),
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: hp(10),
    gap: hp(8),
  },
  label: {
    flex: 1,
   textAlign: "left"
  },
  check: {
    lineHeight: wp(16),
  },
});

export default PasswordRequirements;