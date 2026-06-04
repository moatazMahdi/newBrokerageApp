import { useMutation } from '@tanstack/react-query';
import {
  resetPassword,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../../api/auth';

export const useResetPassword = () =>
  useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
  });
