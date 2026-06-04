import { useMutation } from '@tanstack/react-query';
import { sendOtp, SendOtpRequest, SendOtpResponse } from '../../../api/auth';

export const useSendOtp = () =>
  useMutation<SendOtpResponse, Error, SendOtpRequest>({
    mutationFn: sendOtp,
  });
