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
import { useSignupValidation } from '../hooks/useSignupValidation';
import {
  buildSignupRequest,
  buildSignupValidationRequest,
} from '../../../api/auth';
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

  const { mutate: validateSignup, isPending } = useSignupValidation();

  const handleSubmit = (values: SignupValues) => {
    if (!agreed) {
      Alert.alert('خطأ', 'يجب الموافقة على الشروط والأحكام');
      return;
    }

    // Step 1: validate name + phone with the backend before sending the OTP.
    const phoneNumber = `+2${values.phone}`;
    validateSignup(
      buildSignupValidationRequest(values.fullName, phoneNumber),
      {
        onSuccess: () => {
          // Carry the full signup payload to the OTP screen; the actual
          // signup request is performed after the code is verified.
          const signupData = buildSignupRequest(
            values.fullName,
            phoneNumber,
            values.password,
            values.confirmPassword,
          );
          navigation.navigate(Routes.OTP, {
            phone: values.phone,
            mode: 'signup',
            signupData,
          });
        },
        onError: error => {
          Alert.alert('خطأ', error.message || 'تعذر التحقق من البيانات');
        },
      },
    );
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
          }}>
              <AppButton
              width="100%"
              title="إنشاء حساب"
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
