import React from 'react';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';
import { StyleSheet } from 'react-native';

const CreateNewPasswordHeader = () => {
  const { t } = useTranslation();
  return (
    <AppText
      size={18}
      weight="400"
      style={Styles.title}
      color="#1A1A1A"
    >
      {t('auth.createNewPassword.title')}
    </AppText>
  );
};

export default CreateNewPasswordHeader;

const Styles = StyleSheet.create({
  title: {
    width: "100%",
    marginBottom: hp(24),
    lineHeight: hp(30),
    textAlign: "left"
  }
})