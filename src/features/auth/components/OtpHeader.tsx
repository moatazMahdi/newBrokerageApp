import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

type Props = {
  phone: string;
};

const OtpHeader = ({ phone }: Props) => {
  const { t } = useTranslation();
  return (
  <View>
    <AppText size={18} weight="400" style={styles.title} color="#1A1A1A">
      {t('auth.otp.title')}
    </AppText>
    <AppText
      size={14}
      color="#6F6F74"
      style={styles.subtitle}
    >
      {t('auth.otp.subtitle')}
    </AppText>
    <AppText
      size={14}
      weight="700"
      color="#1A1A1A"
      style={styles.number}
    >
      {`\u2066${phone}\u2069`}
    </AppText>
  </View>
  );
};

export default OtpHeader;

const styles = StyleSheet.create({
  title: { 
    lineHeight: hp(30) 
  },
  number: {
    marginTop: hp(6),
    writingDirection: 'ltr',
    lineHeight: hp(20),
  },
  subtitle: {
    marginTop: hp(8), 
    marginBottom: hp(6), 
    lineHeight: hp(20)
  },
})