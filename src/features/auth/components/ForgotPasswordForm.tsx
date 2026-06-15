import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';
import { hp } from 'src/utils/dimensions';

type FormData = {
  phone: string;
};

type Props = {
  control: Control<FormData>;
  error?: string;
};

const ForgotPasswordForm = ({ control, error }: Props) => {
  const { t } = useTranslation();

  const {
    images: {
      components: { phone: phoneIcon },
    },
  } = Assets;

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        rules={{
          required: t('auth.forgotPassword.enterPhone'),
          validate: (value) => {
            if (!value) return t('auth.forgotPassword.enterPhone');
          
            if (!value.startsWith('01')) {
              return t('auth.forgotPassword.invalidPhone');
            }
          
            if (value.length !== 11) {
              return t('auth.forgotPassword.phoneDigits');
            }
          
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.forgotPassword.phone')}
            value={value}
            onChangeText={text => onChange(text.replace(/\D/g, ''))}
            onBlur={onBlur}
            rightIcon={phoneIcon}
            keyboardType="phone-pad"
            maxLength={11}
            error={error}
          />
        )}
      />
    </View>
  );
};

export default ForgotPasswordForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: hp(8)
  }
})