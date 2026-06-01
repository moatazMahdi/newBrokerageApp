import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

type Props = {
  // countdown duration in seconds
  duration?: number;
  // bumped by the parent to restart the countdown after a resend
  resetKey?: number;
  onResend: () => void;
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const OtpTimer = ({ duration = 153, resetKey = 0, onResend }: Props) => {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    setRemaining(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (remaining <= 0) {
      return;
    }
    const id = setInterval(() => {
      setRemaining(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const expired = remaining <= 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        marginTop: hp(20),
      }}
    >
      {expired ? (
        <TouchableOpacity onPress={onResend}>
          <AppText size={14} weight="700" color="#18359E">
            إعادة الإرسال
          </AppText>
        </TouchableOpacity>
      ) : (
        <>
          <AppText size={14} color="#6F6F74">
            في حالة عدم وصول الكود
          </AppText>
          <AppText size={14} weight="700" color="#F59E0B">
            {formatTime(remaining)}
          </AppText>
        </>
      )}
    </View>
  );
};

export default OtpTimer;
