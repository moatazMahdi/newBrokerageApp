import React from 'react';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';
import { StyleSheet } from 'react-native';

const ForgotPasswordHeader = () => {
  const { t } = useTranslation();
  return (
    <AppText
      size={18}
      weight="400"
      style={styles.title}
      color="#1A1A1A"
    >
      {t('auth.forgotPassword.title')}
    </AppText>
  );
};

export default ForgotPasswordHeader;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    marginBottom: hp(24),
    lineHeight: hp(30),
    textAlign: "left"
  }
})
