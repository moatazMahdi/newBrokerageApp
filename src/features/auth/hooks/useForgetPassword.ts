import { useMutation } from '@tanstack/react-query';
import {
  forgetPassword,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';

export const useForgetPassword = () =>
  useMutation<ForgetPasswordResponse, Error, ForgetPasswordRequest>({
    mutationFn: forgetPassword,

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
