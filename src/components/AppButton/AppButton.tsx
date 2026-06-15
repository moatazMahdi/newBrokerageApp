import React, { FC } from 'react';

import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { Assets } from '../../assets';

import { appButtonStyles } from './appButton.styles';
import { SvgProps } from 'react-native-svg';
import SvgView from '../SvgView/SvgView';
import { hp, wp } from 'src/utils/dimensions';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'softBlue'
  | 'white'
  | 'alert'
  | 'ghost';

export type AppButtonSize =
  | 'full'
  | 'half'
  | 'auto';

interface Props {
  title: string;
  onPress: () => void;

  variant?: AppButtonVariant;
  size?: AppButtonSize;

  disabled?: boolean;
  loading?: boolean;

  leftIcon?: FC<SvgProps>;
  rightIcon?: FC<SvgProps>;

  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const APP_BUTTON_VARIANTS: Record<
  AppButtonVariant,
  {
    backgroundColor: string;
    titleColor: string;
  }
> = {
  primary: {
    backgroundColor: '#1A3167',
    titleColor: '#FFFFFF',
  },

  secondary: {
    backgroundColor: '#F2F2F2',
    titleColor: '#1A1A1A',
  },

  softBlue: {
    backgroundColor: '#EDF4FF',
    titleColor: '#1A3167',
  },

  white: {
    backgroundColor: '#FFFFFF',
    titleColor: '#1A3167',
  },

  alert: {
    backgroundColor: '#EF4335',
    titleColor: '#FFFFFF',
  },

  ghost: {
    backgroundColor: 'transparent',
    titleColor: '#1A3167',
  },

};

const LOADER_COLOR_FILTERS = [
  'Shape Layer 5',
  'Shape Layer 4',
  'Shape Layer 3',
  'Shape Layer 2',
  'Shape Layer 1',
].map(keypath => ({ keypath, color: '#FFFFFF' }));

const APP_BUTTON_SIZES: Record<AppButtonSize, ViewStyle> = {
  full: {
    width: '100%',
  },

  half: {
    width: '48%',
  },

  auto: {},
};

const AppButton = ({
  style,
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'full',
  leftIcon,
  rightIcon,
  titleStyle,
}: Props) => {
  const variantConfig = APP_BUTTON_VARIANTS[variant];
  const sizeStyle = APP_BUTTON_SIZES[size];

  const isDisabled = disabled || loading;
  // Dim only when disabled; while loading the spinner is the visual cue, so
  // keep the button at full opacity.
  const showDimmed = disabled && !loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        appButtonStyles.button,
        sizeStyle,
        {
          backgroundColor: variantConfig.backgroundColor,
        },
        showDimmed && appButtonStyles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <LottieView
          source={Assets.animations.loadingSpinner}
          autoPlay
          loop
          style={appButtonStyles.loader}
          colorFilters={LOADER_COLOR_FILTERS}
        />
      ) : (
        <View style={appButtonStyles.content}>
          <View style={appButtonStyles.icon}>
            {leftIcon ? (
              <SvgView svgFile={leftIcon} width={wp(24)} height={hp(24)} />
            ) : null}
          </View>

          <Text
            style={[
              appButtonStyles.title,
              {
                color: variantConfig.titleColor,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>

          {rightIcon ? (
            <SvgView svgFile={rightIcon} width={wp(24)} height={hp(24)} />
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;