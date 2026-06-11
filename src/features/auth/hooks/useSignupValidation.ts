import { useMutation } from '@tanstack/react-query';
import {
  signupValidation,
  SignupRequest,
  SignupValidationResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';

export const useSignupValidation = () =>
  useMutation<SignupValidationResponse, Error, SignupRequest>({
    mutationFn: signupValidation,

    onError: (error: any) => {
      const message =
      error.response?.data?.errors?.[0] ??
      error.response?.data?.message ??
        'Something went wrong';

      showToast({
        type: 'error',
        title: message,
      })
    }
  });
