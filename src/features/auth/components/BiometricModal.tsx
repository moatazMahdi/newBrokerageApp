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
  onEnable: () => void;
};

const BiometricModal = ({ visible, onClose, onEnable }: Props) => {
  const { t } = useTranslation();
  const { biometricModal } = Assets.images.components;

  return (
    <AppModal backdropOpacity={0.6} visible={visible} onClose={onClose}>
      <View style={styles.imageWrapper}>
        <SvgView svgFile={biometricModal} width={wp(235)} height={hp(150)} />
      </View>

      <AppText size={20} weight="400" color="#333333" style={styles.title}>
        {t('auth.biometric.title')}
      </AppText>

      <View style={styles.buttons}>
        <AppButton
          variant="primary"
          size="full"
          title={t('auth.biometric.enableNow')}
          onPress={onEnable}
        />
        <AppButton
          variant="secondary"
          size="full"
          title={t('auth.biometric.later')}
          onPress={onClose}
          style={styles.laterButton}
        />
      </View>
    </AppModal>
  );
};

export default BiometricModal;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(20),
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: hp(32),
  },
  buttons: {
    width: '100%',
    gap: hp(16),
  },
  laterButton: {
    marginTop: hp(4),
  },
});
