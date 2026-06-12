import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

type Props = {
  duration?: number;
  resetKey?: number;
  onResend: () => void;
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const OtpTimer = ({ duration = 180, resetKey = 0, onResend }: Props) => {
  const { t } = useTranslation();
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
    <View style={styles.container}>
      {!expired ? (
        <>
          <View style={styles.row}>
            <AppText size={14} color="#282828">
              {t('auth.otp.didntReceive')}
            </AppText>
      
            <AppText size={14} weight="700" color="#F18222">
              {formatTime(remaining)}
            </AppText>
          </View>
        </>
      ) : (
        <TouchableOpacity onPress={onResend}>
          <AppText
            size={16}
            weight="700"
            color="#292785"
            style={styles.resendText}
          >
            {t('auth.otp.resend')}
          </AppText>
        </TouchableOpacity>
      )}
  </View>
  );
};

export default OtpTimer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(4)
  },
  resendText: {
    textDecorationLine: 'underline',
    lineHeight: hp(24),
  },
});