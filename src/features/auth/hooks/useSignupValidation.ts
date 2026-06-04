import { useMutation } from '@tanstack/react-query';
import {
  validateSignupStep1,
  SignupValidationRequest,
  SignupValidationResponse,
} from '../../../api/auth';

export const useSignupValidation = () =>
  useMutation<SignupValidationResponse, Error, SignupValidationRequest>({
    mutationFn: validateSignupStep1,
  });
