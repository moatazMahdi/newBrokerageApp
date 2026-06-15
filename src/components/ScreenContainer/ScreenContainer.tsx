import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import AppHeaderWithLogo from '../AppHeaderWithLogo/AppHeaderWithLogo'
import styles from './styles';
import { Assets } from '../../assets';
import ToastHost from '../Toast/ToastHost';
import AppHeaderTitle from '../AppHeaderTitle/AppHeaderTitle';
import { Routes } from 'src/navigation/routes';

type Props = {
  children: React.ReactNode;
  onBackPress?: () => void;
  screenTitle?: string;
  scrollable?: boolean;
  showLanguage?: boolean;
};

const ScreenContainer = ({
  children,
  screenTitle,
  onBackPress,
  scrollable = false,
  showLanguage = false,
}: Props) => {
    const {images: {components: {AppHeaderImageBG}}} = Assets
    const route = useRoute();
    const isLoginScreen = route.name === Routes.LOGIN;
    const isHomeScreen = route.name === Routes.BUTTON_TAB;

  return (
    <ImageBackground
      source={AppHeaderImageBG}
      style={styles.content}
        resizeMode="cover"
    >
      {isLoginScreen || isHomeScreen ? <AppHeaderWithLogo /> : <AppHeaderTitle title={screenTitle} onPress={onBackPress} showLanguage={showLanguage} />}
      <View style={styles.contentContainer}>
        {scrollable ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
              style={styles.keyboardAvoidingView}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          children
        )}
        <ToastHost />
      </View>
    </ImageBackground>
  );
};

export default ScreenContainer
