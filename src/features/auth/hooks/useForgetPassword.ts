import { useMutation } from '@tanstack/react-query';
import {
  forgetPassword,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from '../../../api/auth';

export const useForgetPassword = () =>
  useMutation<ForgetPasswordResponse, Error, ForgetPasswordRequest>({
    mutationFn: forgetPassword,
  });
