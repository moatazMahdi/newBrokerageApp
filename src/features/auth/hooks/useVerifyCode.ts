import { useMutation } from '@tanstack/react-query';
import {
  verifyCode,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from '../../../api/auth';
import Toast from 'src/components/Toast';

export const useVerifyCode = () =>
  useMutation<VerifyCodeResponse, Error, VerifyCodeRequest>({
    mutationFn: verifyCode,
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
