import { useMutation } from '@tanstack/react-query';
import {
  signupValidation,
  SignupRequest,
  SignupValidationResponse,
} from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useSignupValidation = () =>
  useMutation<SignupValidationResponse, Error, SignupRequest>({
    mutationFn: signupValidation,

    onError: (error: any) => {
      showToast({
        type: 'error',
        message: getErrorMessage(error),
        dismissible: false
      })
    }
  });
