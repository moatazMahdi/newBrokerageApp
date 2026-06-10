import React from 'react';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

const LoginHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <AppText size={18} weight="600">
        {t('auth.login.welcome')}
      </AppText>
      <AppText size={14} style={{ marginTop: hp(8), marginBottom: hp(24) }}>
        {t('auth.login.subtitle')}
      </AppText>
    </>
  );
};

export default LoginHeader;
