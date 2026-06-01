import { useMutation } from '@tanstack/react-query';
import { signupUser, SignupRequest, SignupResponse } from '../../../api/auth';

export const useSignup = () =>
  useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupUser,
  });
