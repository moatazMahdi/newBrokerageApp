import { useMutation } from '@tanstack/react-query';
import {
  forgetPassword,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useForgetPassword = () =>
  useMutation<ForgetPasswordResponse, Error, ForgetPasswordRequest>({
    mutationFn: forgetPassword,

    onError: (error: any) => {
      showToast({
        type: 'error',
        message: getErrorMessage(error),
        dismissible: false
      })
    }
  });
