import { View, ImageBackground } from 'react-native'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import styles from './styles';
import { Assets } from '../../assets';
import ToastHost from '../Toast/ToastHost';

type Props = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: Props) => {
    const {images: {components: {AppHeaderImageBG}}} = Assets
  return (
    <ImageBackground
      source={AppHeaderImageBG}
      style={styles.content}
        resizeMode="cover"
    >
      <AppHeader/>
      <View style={styles.contentContainer}>
        {children}
        <ToastHost />
      </View>
    </ImageBackground>
  );
};

export default ScreenContainer