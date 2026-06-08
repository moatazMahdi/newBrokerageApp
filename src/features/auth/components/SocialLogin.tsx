import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AccessToken,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

import { hp, wp } from '../../../utils/dimensions';
import { Assets } from '../../../assets';
import SvgView from '../../../components/SvgView/SvgView';
import SectionSeparator from '../../../components/SectionSeparator';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import {
  getUserPhone,
  saveLoginProvider,
  saveToken,
  setGuest,
} from '../../../storage/mmkv';
import { useSocialLogin } from '../../auth/hooks/useSocialLogin';
import {
  buildSocialLoginRequest,
  SocialLoginResponse,
  SocialProvider,
} from '../../../api/auth';
import Config from 'react-native-config';

const GOOGLE_WEB_CLIENT_ID = Config.GOOGLE_WEB_CLIENT_ID;
const GOOGLE_IOS_CLIENT_ID = Config.GOOGLE_IOS_CLIENT_ID;

const FACEBOOK_APP_ID = Config.FACEBOOK_APP_ID;

const SocialLogin = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { mutateAsync: socialLogin } = useSocialLogin();

  useEffect(() => {
    try {
      if(FACEBOOK_APP_ID){
        Settings.setAppID(FACEBOOK_APP_ID);
      }else {
        console.error("Facebook App ID is missing in environment variables!");
      }
      
      Settings.initializeSDK();
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
      });
    } catch (e) {
      console.warn('Social SDK init failed:', e);
    }
  }, []);

  const {
    images: {
      components: { google, facebook, apple },
    },
  } = Assets;

  const goToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.BUTTON_TAB }],
    });
  }, [navigation]);

  const handleAuthResponse = useCallback(
    (res: SocialLoginResponse, provider: SocialProvider) => {
      const status = res?.data?.status ?? res?.status;

      if (status === 'NEED_PHONE_VERIFICATION') {
        const tmpToken = res?.data?.tmpToken ?? res?.tmpToken;
        if (!tmpToken) {
          console.log('Social login: missing tmpToken for phone verification');
          return;
        }
        navigation.navigate(Routes.CONFIRM_SOCIAL_PHONE, { tmpToken, provider });
        return;
      }

      if (status === 'LOGGED_IN') {
        const token = res?.data?.token ?? res?.token;
        if (token) {
          saveToken(token);
        }
        saveLoginProvider(provider);
        setGuest(false);
        goToHome();
      }
    },
    [goToHome, navigation],
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        console.log('Google login failed: no idToken');
        return;
      }

      const res = await socialLogin(
        buildSocialLoginRequest('google', idToken, getUserPhone()),
      );
      handleAuthResponse(res, 'google');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Google sign in cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Google sign in already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            break;
          default:
            console.log('Google Login Error:', error);
        }
      } else {
        console.log('Google Login Error:', error);
      }
    }
  }, [handleAuthResponse, socialLogin]);

  const loginWithFacebook = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('Facebook login cancelled');
        return;
      }

      const accessToken = await AccessToken.getCurrentAccessToken();
      const token = accessToken?.accessToken?.toString();

      if (!token) {
        console.log('Facebook login failed: no access token');
        return;
      }

      const res = await socialLogin(
        buildSocialLoginRequest('facebook', token, getUserPhone()),
      );
      handleAuthResponse(res, 'facebook');
    } catch (error) {
      console.log('Facebook Login Error:', error);
    }
  }, [handleAuthResponse, socialLogin]);

  const loginWithApple = useCallback(async () => {
    try {
      const appleResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken, user } = appleResponse;

      if (!identityToken) {
        console.log('Apple login failed: no identityToken');
        return;
      }

      const res = await socialLogin(
        buildSocialLoginRequest('apple', identityToken, getUserPhone(), user),
      );
      handleAuthResponse(res, 'apple');
    } catch (error) {
      console.log('Apple Login Error:', error);
    }
  }, [handleAuthResponse, socialLogin]);

  return (
    <View>
      <SectionSeparator label={t('auth.login.orLoginWith')} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.socialButton} onPress={loginWithGoogle}>
          <SvgView svgFile={google} width={wp(24)} height={hp(24)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={loginWithFacebook}
        >
          <SvgView svgFile={facebook} width={wp(24)} height={hp(24)} />
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.socialButton} onPress={loginWithApple}>
            <SvgView svgFile={apple} width={wp(24)} height={hp(24)} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  socialButton: {
    width: wp(98),
    height: hp(56),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
});

export default SocialLogin;
