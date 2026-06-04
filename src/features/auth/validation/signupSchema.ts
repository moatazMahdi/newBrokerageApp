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
      .required(t('FULL_NAME_REQUIRED'))
      .min(3, t('FULL_NAME_MIN'))
      .matches(/^[A-Za-z\s]+$/, t('FULL_NAME_LETTERS_ONLY'))
      .matches(/^\S*$/, t('NO_SPACES_ALLOWED')),

    phone: Yup.string()
      .required(t('MOBILE_FIELD_REQUIRED_ERROR'))
      .matches(/^01[0-2,5][0-9]{8}$/, t('INVALID_EGYPTIAN_PHONE'))
      .length(11, t('PHONE_LENGTH')),

    password: Yup.string()
      .required(t('PASSWORD_REQUIRED'))
      .min(8, t('PASSWORD_MUST_BE_AT_LEAST_8_CHARS'))
      .matches(/[0-9]/, t('PASSWORD_NUMBER'))
      .matches(/[a-z]/, t('PASSWORD_LOWERCASE'))
      .matches(/[A-Z]/, t('PASSWORD_UPPERCASE'))
      .matches(/[^A-Za-z0-9]/, t('PASSWORD_SPECIAL_CHAR'))
      .matches(/^\S*$/, t('NO_SPACES_ALLOWED')),

    confirmPassword: Yup.string()
      .required(t('CONFIRM_PASSWORD_REQUIRED'))
      .oneOf([Yup.ref('password')], t('PASSWORDS_MUST_MATCH')),
  });
