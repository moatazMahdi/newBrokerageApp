import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginRequest, LoginResponse } from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,

    onError: (error: any) => {
      showToast({
        type: 'error',
        message: getErrorMessage(error),
        dismissible: false
      });
    },
  });
  
