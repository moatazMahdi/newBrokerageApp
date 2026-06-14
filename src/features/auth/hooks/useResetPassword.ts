import { useMutation } from '@tanstack/react-query';
import {
  resetPassword,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useResetPassword = () =>
  useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onError: (error: any) => {
      showToast({
        type: 'error',
        message: getErrorMessage(error),
        dismissible: false
      })
    }
  });
