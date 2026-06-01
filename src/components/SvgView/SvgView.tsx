import React from 'react';
import { View } from 'react-native';
import { SvgViewProps } from './types';
import { hp, wp } from '../../utils/dimensions';
import styles from './styles';

export const SvgView: React.FC<SvgViewProps> = ({
  svgFile: SvgComponent,
  width = wp(24),
  height = hp(24),
  ...svgProps
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <SvgComponent
        {...svgProps}
        width="100%"
        height="100%"
      />
    </View>
  );
};

export default SvgView;


// export const SvgView: React.FC<SvgViewProps> = ({
//   svgFile: SvgComponent,
//   width = wp(24),
//   height = hp(24),
//   ...svgProps
// }) => {
//   if (!SvgComponent) {
//     console.log('SvgView error: svgFile is undefined');
//     return null;
//   }

//   return (
//     <View style={[styles.container, { width, height }]}>
//       <SvgComponent {...svgProps} width="100%" height="100%" />
//     </View>
//   );
// };
