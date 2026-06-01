import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

type Props = {
  phone: string;
};

const OtpHeader = ({ phone }: Props) => (
  <>
    <AppText size={18} weight="400" style={{ lineHeight: hp(30) }} color="#1A1A1A">
      تأكيد كود التحقق
    </AppText>
    <AppText
      size={14}
      color="#6F6F74"
      style={{ marginTop: hp(8), textAlign: 'flex-start', lineHeight: hp(20) }}
    >
      تم ارسال رقم التحقق لمرة واحدة علي هذا الرقم
    </AppText>
    <AppText
      size={14}
      weight="700"
      color="#1A1A1A"
      style={{ marginTop: hp(6), textAlign: 'flex-start', lineHeight: hp(20) }}
    >
      {phone}
    </AppText>
  </>
);

export default OtpHeader;
