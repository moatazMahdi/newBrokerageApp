import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginRequest, LoginResponse } from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,

    onError: (error: any) => {
      const message =
        error.response?.data?.message ??
        error.response?.data?.errors[0] ??
        'Something went wrong';

      showToast({
        type: 'error',
        title: message,
      });
    },
  });
  
