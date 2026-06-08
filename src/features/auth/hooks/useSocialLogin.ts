import { useMutation } from '@tanstack/react-query';
import {
  socialLogin,
  SocialLoginRequest,
  SocialLoginResponse,
} from '../../../api/auth';

export const useSocialLogin = () =>
  useMutation<SocialLoginResponse, Error, SocialLoginRequest>({
    mutationFn: socialLogin,
  });
