import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';

type Props = {
  phone: string;
  onPhoneChange: (text: string) => void;
};

const ForgotPasswordForm = ({ phone, onPhoneChange }: Props) => {
  const { t } = useTranslation();
  const {
    images: {
      components: { phone: phoneIcon },
    },
  } = Assets;

  return (
    <View style={{ width: '100%' }}>
      <AppTextField
        label={t('auth.forgotPassword.phone')}
        value={phone}
        onChangeText={onPhoneChange}
        rightIcon={phoneIcon}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default ForgotPasswordForm;
