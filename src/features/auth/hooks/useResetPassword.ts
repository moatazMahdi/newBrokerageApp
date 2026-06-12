import { useMutation } from '@tanstack/react-query';
import {
  resetPassword,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';

export const useResetPassword = () =>
  useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onError: (error: any) => {
      const message =
      error.response?.data?.errors?.[0] ??
      error.response?.data?.message ??
        'Something went wrong';

      showToast({
        type: 'error',
        message: message,
        dismissible: false
      })
    }
  });
