import React from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import SignupHeader from '../components/SignupHeader';
import SignupForm from '../components/SignupForm';
import TermsCheckbox from '../components/TermsCheckbox';
import GuestButton from '../components/GuestButton';
import { useSignup } from '../hooks/useSignup';
import { buildSignupRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { signupSchema, SignupValues } from '../validation/signupSchema';
import { hp } from '../../../utils/dimensions';

const initialValues: SignupValues = {
  fullName: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();

  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);

  const { mutate: signup, isPending } = useSignup();

  const handleSubmit = (values: SignupValues) => {
    if (!agreed) {
      Alert.alert(t('common.error'), t('auth.signup.mustAcceptTerms'));
      return;
    }

    const payload = buildSignupRequest(
      values.fullName,
      values.phone,
      values.password,
      values.confirmPassword,
    );

    signup(payload, {
      onSuccess: () => {
        navigation.navigate(Routes.OTP, { phone: values.phone });
      },
      onError: error => {
        Alert.alert(t('common.error'), error.message || t('auth.signup.failed'));
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema(t)}
      onSubmit={handleSubmit}
    >
      {form => (
        <ScreenContainer>
          <SignupHeader />
          <SignupForm
            form={form}
            openPassword={openPassword}
            openConfirmPassword={openConfirmPassword}
            onTogglePassword={() => setOpenPassword(prev => !prev)}
            onToggleConfirmPassword={() =>
              setOpenConfirmPassword(prev => !prev)
            }
          />
          <TermsCheckbox agreed={agreed} onChange={setAgreed} />

          <View style={{ flex: 1 }} />

          <View style= {{
              flexDirection: 'column',
              gap: hp(16),
              marginVertical: hp(16),
              backgroundColor: "#FFFFFF",
              paddingVertical: hp(16),
              alignItems: 'center',
          }}>
              <AppButton
              variant='primary'
              size="full"
              title={t('auth.signup.createAccount')}
              onPress={() => form.handleSubmit()}
              loading={isPending}
            />
            <GuestButton />
          </View>
        </ScreenContainer>
      )}
    </Formik>
  );
};

export default Signup;
