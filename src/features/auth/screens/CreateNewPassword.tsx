import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import CreateNewPasswordHeader from '../components/CreateNewPasswordHeader';
import CreateNewPasswordForm from '../components/CreateNewPasswordForm';
import SignupButton from '../components/SignupButton';
import { useResetPassword } from '../hooks/useResetPassword';
import { buildResetPasswordRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp } from '../../../utils/dimensions';

const CreateNewPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } =
    useRoute<RouteProp<AppStackParamList, 'CreateNewPassword'>>();
  const { t } = useTranslation();
  const { phone, code } = params;

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const mismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleConfirm = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert(t('common.error'), t('common.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('auth.validation.passwordsMustMatch'));
      return;
    }

    resetPassword(
      buildResetPasswordRequest(phone, code, password, confirmPassword),
      {
        onSuccess: () => {
          Alert.alert(t('common.success'), t('auth.createNewPassword.success'));
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.LOGIN }],
          });
        },
        onError: error => {
          Alert.alert(t('common.error'), error.message || t('auth.createNewPassword.failed'));
        },
      },
    );
  };

  return (
    <ScreenContainer>
      <CreateNewPasswordHeader />
      <CreateNewPasswordForm
        password={password}
        confirmPassword={confirmPassword}
        openPassword={openPassword}
        openConfirmPassword={openConfirmPassword}
        error={mismatch ? t('auth.validation.passwordsMustMatch') : undefined}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onTogglePassword={() => setOpenPassword(prev => !prev)}
        onToggleConfirmPassword={() => setOpenConfirmPassword(prev => !prev)}
      />

      <AppButton
        variant='primary'
        size='full'
        title={t('auth.createNewPassword.confirm')}
        onPress={handleConfirm}
        loading={isPending}
        style={{
          marginTop: hp(32),
          marginBottom: hp(24)
        }}
      />
      <SignupButton />
    </ScreenContainer>
  );
};

export default CreateNewPassword;
