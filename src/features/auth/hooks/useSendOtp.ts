import { useMutation } from '@tanstack/react-query';
import { sendOtp, SendOtpRequest, SendOtpResponse } from '../../../api/auth';
import { showToast } from 'src/components/Toast/toastService';

export const useSendOtp = () =>
  useMutation<SendOtpResponse, Error, SendOtpRequest>({
    mutationFn: sendOtp,
    onError: (error: any) => {
      const message =
      error.response?.data?.errors?.[0] ??
      error.response?.data?.message ??
        'Something went wrong';

      showToast({
        type: 'error',
        message: message,
        dismissible: false
      })
    }
  });
