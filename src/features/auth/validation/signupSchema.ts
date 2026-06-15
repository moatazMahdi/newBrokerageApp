import * as Yup from 'yup';
import type { TFunction } from 'i18next';

export type SignupValues = {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const signupSchema = (t: TFunction) =>
  Yup.object({
    username: Yup.string()
      .required(t('auth.validation.usernameRequired'))
      .min(7, t('auth.validation.usernameMin'))
      .max(29, t('auth.validation.usernameMax'))
      .matches(
        /^(?=.{7,29}$)[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*$/,
        t('auth.validation.usernameInvalid'),
      ),

    phone: Yup.string()
      .required(t('auth.validation.phoneRequired'))
      .matches(
        /^(010|011|012|015)\d{8}$/,
        t('auth.validation.invalidPhone'),
      ),

    password: Yup.string()
      .required(t('auth.validation.passwordRequired'))
      .min(8, t('auth.validation.passwordMin'))
      .matches(/[0-9]/, t('auth.validation.passwordNumber'))
      .matches(/[a-z]/, t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, t('auth.validation.passwordUppercase'))
      .matches(
        /[^A-Za-z0-9]/,
        t('auth.validation.passwordSpecialChar'),
      )
      .matches(
        /^\S*$/,
        t('auth.validation.noSpaces'),
      ),

    confirmPassword: Yup.string()
      .required(
        t('auth.validation.confirmPasswordRequired'),
      )
      .oneOf(
        [Yup.ref('password')],
        t('auth.validation.passwordsMustMatch'),
      ),
  });