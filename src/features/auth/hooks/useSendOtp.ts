import { useMutation } from '@tanstack/react-query';
import { sendOtp, SendOtpRequest, SendOtpResponse } from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';
import { getErrorMessage } from 'src/utils/helperFunctions';

export const useSendOtp = () =>
  useMutation<SendOtpResponse, Error, SendOtpRequest>({
    mutationFn: sendOtp,
    onError: (error: any) => {
      showToast({
        type: 'error',
        message: getErrorMessage(error),
        dismissible: false
      })
    }
  });
