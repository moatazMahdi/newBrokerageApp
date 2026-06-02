import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';
import { View } from 'react-native';

type Props = {
  phone: string;
};

const OtpHeader = ({ phone }: Props) => (
  <View>
    <AppText size={18} weight="400" style={{ lineHeight: hp(30) }} color="#1A1A1A">
      تأكيد كود التحقق
    </AppText>
    <AppText
      size={14}
      color="#6F6F74"
      style={{ marginTop: hp(8), marginBottom: hp(6), textAlign: 'flex-start', lineHeight: hp(20) }}
    >
      تم ارسال رقم التحقق لمرة واحدة علي هذا الرقم
    </AppText>
    <AppText
      size={14}
      weight="700"
      color="#1A1A1A"
      style={{
        marginTop: hp(6),
        textAlign: 'flex-start',
        writingDirection: 'ltr',
        lineHeight: hp(20),
      }}
    >
      {`\u2066${phone}\u2069`}
    </AppText>
  </View>
);

export default OtpHeader;
