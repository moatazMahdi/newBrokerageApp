import { useMutation } from '@tanstack/react-query';
import {
  verifyCode,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from '../../../api/auth';

export const useVerifyCode = () =>
  useMutation<VerifyCodeResponse, Error, VerifyCodeRequest>({
    mutationFn: verifyCode,
  });
