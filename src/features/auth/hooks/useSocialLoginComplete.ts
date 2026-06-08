import { useMutation } from '@tanstack/react-query';
import { socialLoginComplete, SocialLoginResponse } from '../../../api/auth';

export const useSocialLoginComplete = () =>
  useMutation<SocialLoginResponse, Error, any>({
    mutationFn: socialLoginComplete,
  });
