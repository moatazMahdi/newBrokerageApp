import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginRequest, LoginResponse } from '../../../api/auth';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
  });
