import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Path, Svg } from 'react-native-svg';

import { hp, wp } from '../../utils/dimensions';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropOpacity?: number;
}

const SCREEN_W = Dimensions.get('window').width;

const NOTCH_W = hp(100);
const NOTCH_H = hp(15);

const FLAT_W = wp(40);
const TOP_CORNER_R = wp(15);
const BOTTOM_CORNER_R = wp(15);

const BAR_W = wp(35);
const BAR_H = hp(5);

const notchCutoutPath = (() => {
  const screenW = SCREEN_W;
  const W = NOTCH_W;
  const H = NOTCH_H;

  const startX = (screenW - W) / 2;

  const flatL = startX + W * 0.5 - FLAT_W / 2;
  const flatR = startX + W * 0.5 + FLAT_W / 2;

  const notchLeft = startX;
  const notchRight = startX + W;

  return [
    // Outer white shape with rounded top corners
    `M 20,0`,
    `H ${screenW - 20}`,
    `A 20,20 0 0 1 ${screenW},20`,
    `V ${H + 2}`,
    `H 0`,
    `V 20`,
    `A 20,20 0 0 1 20,0`,
    `Z`,

    // Inner transparent curved cutout
    `M ${notchLeft},0`,
    `C ${notchLeft + TOP_CORNER_R},0 ${flatL - BOTTOM_CORNER_R},${H} ${flatL},${H}`,
    `L ${flatR},${H}`,
    `C ${flatR + BOTTOM_CORNER_R},${H} ${notchRight - TOP_CORNER_R},0 ${notchRight},0`,
    `Z`,
  ].join(' ');
})();

const AppModal = ({ visible, onClose, backdropOpacity, children }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={450}
      animationOutTiming={350}
      backdropTransitionInTiming={450}
      backdropTransitionOutTiming={350}
      backdropOpacity={backdropOpacity || 0.5} 
      useNativeDriver={false}
      useNativeDriverForBackdrop={false}
      hideModalContentWhileAnimating={false}
      swipeDirection="down"
      onSwipeComplete={onClose}
      swipeThreshold={80}
      panResponderThreshold={4}
      avoidKeyboard={false}
      style={styles.modal}
    >
      <View style={styles.sheetWrapper}>
        <View style={styles.dragArea}>
          <View style={styles.notch} pointerEvents="none">
            <Svg width={SCREEN_W} height={NOTCH_H + 2}>
              <Path
                d={notchCutoutPath}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
            </Svg>
          </View>

          <View style={styles.barWrapper} pointerEvents="none">
            <View style={styles.bar} />
          </View>
        </View>

        <View style={styles.sheet}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  sheetWrapper: {
    position: 'relative',
    overflow: 'visible',
  },

  dragArea: {
    position: 'absolute',
    top: -NOTCH_H,
    left: 0,
    right: 0,
    height: NOTCH_H + hp(20),
    zIndex: 5,
  },

  notch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NOTCH_H + 2,
    zIndex: 2,
  },

  barWrapper: {
    position: 'absolute',
    top: (NOTCH_H - BAR_H) / 10,
    alignSelf: 'center',
    zIndex: 3,
  },

  bar: {
    width: BAR_W,
    height: BAR_H,
    borderRadius: BAR_H / 2,
    backgroundColor: '#FFFFFF',
  },

  sheet: {
    backgroundColor: '#FFFFFF',
    paddingTop: hp(42),
    paddingHorizontal: wp(24),
    paddingBottom: hp(34),
  },
});