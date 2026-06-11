import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import CreateNewPasswordHeader from '../components/CreateNewPasswordHeader';
import CreateNewPasswordForm from '../components/CreateNewPasswordForm';
import PasswordRequirements, {
  isPasswordValid,
} from '../components/PasswordRequirements';
import SuccessModal from '../components/SuccessModal';
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
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const goToLogin = () => {
    setShowSuccess(false);
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.LOGIN }],
    });
  };

  const mismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const canSubmit =
    isPasswordValid(password) && password === confirmPassword;

  const handleConfirm = () => {

    resetPassword(
      buildResetPasswordRequest(phone, code, password, confirmPassword),
      {
        onSuccess: () => {
          setShowSuccess(true);
        },
      },
    );
  };

  const onCloseModal = () => {
    goToLogin();
  }

  return (
    <ScreenContainer>
      <CreateNewPasswordHeader />
      <CreateNewPasswordForm
        password={password}
        confirmPassword={confirmPassword}
        isPasswordVisible={isPasswordVisible}
        isConfirmPasswordVisible={isConfirmPasswordVisible}
        error={mismatch ? t('auth.validation.passwordsMustMatch') : undefined}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onTogglePassword={() => setIsPasswordVisible(prev => !prev)}
        onToggleConfirmPassword={() => setIsConfirmPasswordVisible(prev => !prev)}
      />

      <PasswordRequirements password={password} />

      <AppButton
        variant='primary'
        size='full'
        title={t('auth.createNewPassword.confirm')}
        onPress={handleConfirm}
        loading={isPending}
        disabled={!canSubmit}
        style={{
          marginTop: hp(32),
          marginBottom: hp(24)
        }}
      />

      <SuccessModal
        visible={showSuccess}
        onClose={onCloseModal}
        onLogin={goToLogin}
      />
    </ScreenContainer>
  );
};

export default CreateNewPassword;
