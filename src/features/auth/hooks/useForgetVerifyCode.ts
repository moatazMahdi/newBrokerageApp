import { useMutation } from '@tanstack/react-query';
import {
  forgetVerifyCode,
  ForgetVerifyCodeRequest,
  ForgetVerifyCodeResponse,
} from '../../../api/auth';
import Toast from 'src/components/Toast';

export const useForgetVerifyCode = () =>
  useMutation<ForgetVerifyCodeResponse, Error, ForgetVerifyCodeRequest>({
    mutationFn: forgetVerifyCode,
    onError: (error: any) => {
      const message =
        error.response?.data?.errors?.[0] ??
        error.response?.data?.message ??
          'Something went wrong';
      Toast({
        type: "error",
        title: message,
      })
    }
  });
