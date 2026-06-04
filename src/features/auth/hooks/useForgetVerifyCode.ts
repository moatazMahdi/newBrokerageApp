import { useMutation } from '@tanstack/react-query';
import {
  forgetVerifyCode,
  ForgetVerifyCodeRequest,
  ForgetVerifyCodeResponse,
} from '../../../api/auth';

export const useForgetVerifyCode = () =>
  useMutation<ForgetVerifyCodeResponse, Error, ForgetVerifyCodeRequest>({
    mutationFn: forgetVerifyCode,
  });
