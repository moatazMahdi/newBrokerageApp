import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppModal from 'src/components/AppModal/AppModal';
import AppText from 'src/components/AppText/AppText';
import SvgView from 'src/components/SvgView/SvgView';
import { Assets } from 'src/assets';
import { hp, wp } from 'src/utils/dimensions';

const AUTO_DISMISS_MS = 10000;

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SuccessSignupModal = ({ visible, onClose }: Props) => {
  const { t } = useTranslation();
  const { SuccessModalIcon } = Assets.images.components;

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <AppModal backdropOpacity={0.6} visible={visible} onClose={onClose}>
      <View style={styles.imageWrapper}>
        <SvgView svgFile={SuccessModalIcon} width={wp(235)} height={hp(150)} />
      </View>

      <View>
        <AppText size={20} weight="700" color="#333" style={styles.title}>
            {t('auth.signup.successTitle')}
        </AppText>
        <AppText size={14} weight="400" color="#929292" style={styles.title}>
            {t('auth.signup.successMessage')}
        </AppText>
      </View>
    </AppModal>
  );
};

export default SuccessSignupModal;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(20),
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
