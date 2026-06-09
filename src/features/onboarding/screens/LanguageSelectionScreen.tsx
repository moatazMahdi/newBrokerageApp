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

  const strings = STRINGS[deviceLang];
  const isRTL = deviceLang === 'ar';

  const handleConfirm = () => {
    setLanguage(selected);
  };

  return (
    <View style={styles.screen}>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  options: {
    gap: 12,
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
