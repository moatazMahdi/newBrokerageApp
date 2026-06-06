import * as Yup from 'yup';
import type { TFunction } from 'i18next';

export type SignupValues = {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const signupSchema = (t: TFunction) =>
  Yup.object().shape({
    fullName: Yup.string()
      .required(t('auth.validation.fullNameRequired'))
      .min(3, t('auth.validation.fullNameMin'))
      .matches(/^[A-Za-z\s]+$/, t('auth.validation.fullNameLettersOnly'))
      .matches(/^\S*$/, t('auth.validation.noSpaces')),

    phone: Yup.string()
      .required(t('auth.validation.phoneRequired'))
      .matches(/^01[0-2,5][0-9]{8}$/, t('auth.validation.invalidPhone'))
      .length(11, t('auth.validation.phoneLength')),

    password: Yup.string()
      .required(t('auth.validation.passwordRequired'))
      .min(8, t('auth.validation.passwordMin'))
      .matches(/[0-9]/, t('auth.validation.passwordNumber'))
      .matches(/[a-z]/, t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, t('auth.validation.passwordUppercase'))
      .matches(/[^A-Za-z0-9]/, t('auth.validation.passwordSpecialChar'))
      .matches(/^\S*$/, t('auth.validation.noSpaces')),

    confirmPassword: Yup.string()
      .required(t('auth.validation.confirmPasswordRequired'))
      .oneOf([Yup.ref('password')], t('auth.validation.passwordsMustMatch')),
  });
