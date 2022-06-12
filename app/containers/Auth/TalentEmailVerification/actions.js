import { VERIFY_OTP } from './constants';

export function verifyOTP(data, onSuccess) {
  return {
    type: VERIFY_OTP,
    data,
    onSuccess,
  };
}
