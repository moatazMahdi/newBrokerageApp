import React from 'react';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

const ForgotPasswordHeader = () => {
  const { t } = useTranslation();
  return (
    <AppText
      size={18}
      weight="400"
      style={{
        marginBottom: hp(24),
        lineHeight: hp(30),
      }}
      color="#1A1A1A"
    >
      {t('auth.forgotPassword.title')}
    </AppText>
  );
};

export default ForgotPasswordHeader;
