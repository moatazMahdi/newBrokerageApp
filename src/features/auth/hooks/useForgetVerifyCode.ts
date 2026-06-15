import { useMutation } from '@tanstack/react-query';
import {
  forgetVerifyCode,
  ForgetVerifyCodeRequest,
  ForgetVerifyCodeResponse,
} from '../../../api/auth';
import Toast from 'src/components/Toast';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useForgetVerifyCode = () =>
  useMutation<ForgetVerifyCodeResponse, Error, ForgetVerifyCodeRequest>({
    mutationFn: forgetVerifyCode,
    onError: (error: any) => {
      Toast({
        type: "error",
        message: getErrorMessage(error),
      })
    }
  });
