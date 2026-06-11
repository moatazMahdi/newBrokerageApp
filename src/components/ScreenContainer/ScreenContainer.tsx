import { View, ImageBackground } from 'react-native'
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
  screenTitle?: string
};

const ScreenContainer = ({ children, screenTitle, onBackPress }: Props) => {
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
      {isLoginScreen || isHomeScreen ? <AppHeaderWithLogo /> : <AppHeaderTitle title={screenTitle} onPress={onBackPress} />}
      <View style={styles.contentContainer}>
        {children}
        <ToastHost />
      </View>
    </ImageBackground>
  );
};

export default ScreenContainer