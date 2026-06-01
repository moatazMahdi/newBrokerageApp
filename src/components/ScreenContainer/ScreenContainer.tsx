import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import styles from './styles';
import { Assets } from '../../assets';

type Props = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: Props) => {
    const {images: {components: {AppHeaderImageBG}}} = Assets
  return (
    <ImageBackground
      source={AppHeaderImageBG}
      style={{
         flex: 1,
      }}
        resizeMode="cover"
    >
      <AppHeader/>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenContainer