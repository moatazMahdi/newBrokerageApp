import React from 'react';
import { View } from 'react-native';
import AppCheckbox from '../../../components/AppCheckbox/AppCheckbox';

type Props = {
  agreed: boolean;
  onChange: (next: boolean) => void;
};

const TermsCheckbox = ({ agreed, onChange }: Props) => (
  <View>
    <AppCheckbox
      checked={agreed}
      onChange={onChange}
      label="بالضغط فأنك توافق على الشروط والأحكام"
    />
  </View>
);

export default TermsCheckbox;
