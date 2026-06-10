import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { setLanguage } from '../../../localization/changeLanguage';
import AppButton from '../../../components/AppButton';
import { LANGUAGE_FLAGS, STRINGS } from '../constants/onboardingData';
import AppModal from 'src/components/AppModal/AppModal';
import { hp, wp } from 'src/utils/dimensions';

type Language = 'ar' | 'en';

const getDeviceLanguage = (): Language => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    return locale.startsWith('ar') ? 'ar' : 'en';
  } catch {
    return 'en';
  }
};


const deviceLang = getDeviceLanguage();

const LanguageSelectionScreen = () => {
  const [selected, setSelected] = useState<Language>(deviceLang);
  const [visible, setVisible] = useState(true);

  const strings = STRINGS[deviceLang];
  const isRTL = deviceLang === 'ar';

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setLanguage(selected);
    handleClose();
  };

  return (
    <View style={styles.screen}>
      <AppModal visible={visible} onClose={handleClose}>
        <View style={styles.sheet}>
          <View style={[styles.header, isRTL && styles.headerRTL]}>
            <TouchableOpacity onPress={handleConfirm} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{strings.title}</Text>
          </View>

          <View style={styles.options}>
            {(['ar', 'en'] as Language[]).map(code => (
              <TouchableOpacity
                key={code}
                style={[
                  styles.option,
                  isRTL && styles.optionRTL,
                  selected === code && styles.optionSelected,
                ]}
                onPress={() => setSelected(code)}
                activeOpacity={0.7}
              >
                <Text style={styles.flag}>{LANGUAGE_FLAGS[code]}</Text>
                <Text
                  style={[
                    styles.optionLabel,
                    isRTL && styles.optionLabelRTL,
                    selected !== code && styles.optionLabelDim,
                  ]}
                >
                  {strings.options[code]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppButton
            title={strings.confirmButton}
            onPress={handleConfirm}
            variant="primary"
            size="full"
          />
          </View>
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D1B3E',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    paddingBottom: hp(26),
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRTL: {
    flexDirection: 'row',
  },
  closeButton: {
    width: wp(24) ,
    height: hp(24),
    borderRadius: hp(16),
    backgroundColor: '#F0F4FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    alignItems: 'flex-start',
  },
  options: {
    marginTop: hp(24),
    gap: hp(16),
    marginBottom: hp(32),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    backgroundColor: '#F8F9FB',
  },
  optionRTL: {
    flexDirection: 'row-reverse',
  },
  optionSelected: {
    borderColor: '#1A3167',
    backgroundColor: '#EDF4FF',
  },
  flag: {
    fontSize: 28,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  optionLabelRTL: {
    textAlign: 'right',
  },
  optionLabelDim: {
    color: '#AAAAAA',
  },
});

export default LanguageSelectionScreen;
