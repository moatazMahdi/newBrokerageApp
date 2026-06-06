import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppCheckbox from '../../../components/AppCheckbox/AppCheckbox';

type Props = {
  agreed: boolean;
  onChange: (next: boolean) => void;
};

const TermsCheckbox = ({ agreed, onChange }: Props) => {
  const { t } = useTranslation();
  return (
    <View>
      <AppCheckbox
        checked={agreed}
        onChange={onChange}
        label={t('auth.signup.terms')}
      />
    </View>
  );
};

export default TermsCheckbox;
