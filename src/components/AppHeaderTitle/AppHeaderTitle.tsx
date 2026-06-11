import { View, Text, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import React from 'react';
import { Assets } from '../../assets';
import { hp, wp } from '../../utils/dimensions';
import { SvgView } from '../SvgView/SvgView';

const { BackArrow } = Assets.images.components;

interface Props {
  title?: string 
  onPress?: () => void;
}

const AppHeaderTitle = ({ title, onPress }: Props) => {

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={onPress}>
            <SvgView svgFile={BackArrow} width={wp(28)} height={hp(28)} />
        </TouchableOpacity>
        <Text style={styles.title}>
            {title}
        </Text>
    </View>
   );
};

export default AppHeaderTitle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(110),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    paddingHorizontal: wp(20),
    paddingTop: hp(30),
  },
  arrow: {
    backgroundColor: "#FFFFFF33",
    borderRadius: "50%",
    width: wp(36),
    height: hp(36),
    alignItems: "center",
    justifyContent: "center",
    transform: I18nManager.isRTL ? [] : [{ rotate: '180deg' }] ,
  },
  title: { 
    color: 'white', 
    fontSize: hp(16),
    fontWeight: "700",
    lineHeight: hp(24) 
  },
})
