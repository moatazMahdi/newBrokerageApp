import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

const ForgotPasswordHeader = () => (
  <AppText
    size={18}
    weight="400"
    style={{
      // marginTop: hp(20),
      marginBottom: hp(24),
      textAlign: 'flex-start',
      lineHeight: hp(30),

    }}
    color="#1A1A1A"
  >
    نسيت كلمة المرور
  </AppText>
);

export default ForgotPasswordHeader;
