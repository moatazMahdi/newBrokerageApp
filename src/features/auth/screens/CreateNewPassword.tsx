import React from 'react';
import { Alert } from 'react-native';
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
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'يجب أن تتطابق كلمتا المرور');
      return;
    }

    resetPassword(
      buildResetPasswordRequest(phone, code, password, confirmPassword),
      {
        onSuccess: () => {
          Alert.alert('نجح', 'تم إعادة تعيين كلمة المرور بنجاح');
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.LOGIN }],
          });
        },
        onError: error => {
          Alert.alert('خطأ', error.message || 'تعذر إعادة تعيين كلمة المرور');
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
        error={mismatch ? 'يجب أن تتطابق كلمتا المرور' : undefined}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onTogglePassword={() => setOpenPassword(prev => !prev)}
        onToggleConfirmPassword={() => setOpenConfirmPassword(prev => !prev)}
      />

      <AppButton
        width="100%"
        title="تأكيد"
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
