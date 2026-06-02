import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from '../../../components/AppText/AppText'
import SvgView from '../../../components/SvgView/SvgView'
import { Assets } from '../../../assets'

const GuestButton = () => {
  const {images:{
    components: {ArrowLeft},
  }} = Assets
  return (
    <TouchableOpacity style= {{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      // marginTop: 20,
    }}
    onPress={() => {}}
    >
      <AppText size={16} weight="500" color="black">
       تصفح التطبيق كضيف
      </AppText>
      <SvgView  svgFile={ArrowLeft} width={20} height={20} />
    </TouchableOpacity>
  )
}

export default GuestButton