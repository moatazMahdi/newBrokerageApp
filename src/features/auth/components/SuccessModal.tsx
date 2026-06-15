import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppModal from 'src/components/AppModal/AppModal';
import AppButton from 'src/components/AppButton';
import AppText from 'src/components/AppText/AppText';
import SvgView from 'src/components/SvgView/SvgView';
import { Assets } from 'src/assets';
import { hp, wp } from 'src/utils/dimensions';

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
};

const SuccessModal = ({ visible, onClose, onLogin }: Props) => {
  const { t } = useTranslation();
  const { SuccessModalIcon } = Assets.images.components;

  return (
    <AppModal backdropOpacity={0.6} visible={visible} onClose={onClose}>
      <View style={styles.imageWrapper}>
        <SvgView svgFile={SuccessModalIcon} width={wp(235)} height={hp(150)} />
      </View>

      <AppText size={20} weight="700" color="#333" style={styles.title}>
        {t('auth.createNewPassword.successTitle')}
      </AppText>

      <AppText size={14} weight="400" color="#929292" style={styles.subtitle}>
        {t('auth.createNewPassword.successSubtitle')}
      </AppText>

      <AppButton
        variant="primary"
        size="full"
        title={t('auth.createNewPassword.login')}
        onPress={onLogin}
        style={styles.button}
      />
    </AppModal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(20),
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: hp(8),
  },
  subtitle: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: hp(32),
  },
  button: {
    width: '100%',
  },
});
