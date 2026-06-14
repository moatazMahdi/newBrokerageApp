import { useMutation } from '@tanstack/react-query';
import {
  verifyCode,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from '../../../api/auth';
import Toast from 'src/components/Toast';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useVerifyCode = () =>
  useMutation<VerifyCodeResponse, Error, VerifyCodeRequest>({
    mutationFn: verifyCode,
    onError: (error: any) => {
      Toast({
        type: "error",
        message: getErrorMessage(error),
      })
    }
  });
