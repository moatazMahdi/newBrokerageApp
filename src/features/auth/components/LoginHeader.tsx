import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';

const LoginHeader = () => (
  <>
    <AppText size={18} weight="600">
      مرحبا بعودتك 👋
    </AppText>
    <AppText size={14} style={{ marginTop: hp(8), marginBottom: hp(24) }}>
      ادخل رقم الهاتف وكلمة المرور للدخول الي حسابك.
    </AppText>
  </>
);

export default LoginHeader;
