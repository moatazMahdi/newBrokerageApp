import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Assets } from '../assets';
import OurProduct from '../screens/ourProduct';
import Claims from '../screens/claims';
import { Routes } from './routes';
import Menu from '../screens/menu';
import Svg, { Path } from 'react-native-svg';
import { fs, hp, wp } from '../utils/dimensions';
import Home from '../features/home/screens/Home';

const Tab = createBottomTabNavigator();

const TABS = [
  {
    name: 'Home',
    component: Home,
    label: 'الرئيسية',
    icon: 'homeIcon',
  },
  {
    name: Routes.OUR_PRODUCTS,
    component: OurProduct,
    label: 'منتجاتنا',
    icon: 'ourProduct',
  },
  {
    name: Routes.CLAIMS,
    component: Claims,
    label: 'التنبيهات',
    icon: 'claims',
  },
  {
    name: Routes.MENU,
    component: Menu,
    label: 'المزيد',
    icon: 'menu',
  },
];




const { width } = Dimensions.get('window');

const TAB_HEIGHT = 90;
export const CustomTabBarBackground = () => {
  const center = width / 2;

  const d = `
  M0 0
  H${center - 52}

  C${center - 38} 0 
   ${center - 34} 30 
   ${center} 30

  C${center + 34} 30 
   ${center + 38} 0 
   ${center + 52} 0

  H${width}
  V${TAB_HEIGHT}
  H0
  Z
`;

  return (
    <Svg width={width} height={TAB_HEIGHT} style={StyleSheet.absoluteFill}>
      <Path d={d} fill="#FFFFFF" />
    </Svg>
  );
};

const ButtonTab = () => {
  const {
    images: { components },
  } = Assets;

   const openWhatsApp = async () => {
    const phone = '201032125999';

    const url = `whatsapp://send?phone=${phone}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Linking.openURL(
        `https://wa.me/${phone}`,
      );
    }
  };


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          backgroundColor: 'transparent',

          borderTopWidth: 0,

          elevation: 0,
          shadowOpacity: 0,

          shadowColor: 'transparent',

          borderTopColor: 'transparent',
        },
        tabBarBackground: () => <CustomTabBarBackground />,
      }}
    >
            {TABS.slice(0, 2).map(item => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tabItem}>
                  <Image
                    source={components[item.icon]}
                    resizeMode="contain"
                    style={[
                      styles.icon,
                      {
                        tintColor: focused ? '#1D3470' : '#7C7C7C',
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.label,
                      {
                        color: focused ? '#1D3470' : '#7C7C7C',
                        fontWeight: focused ? '700' : '400',
                      },
                    ]}>
                    {item.label}
                  </Text>
                </View>
              ),
            }}
          />
        ))}

        <Tab.Screen
          name="Empty"
          component={Home}
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={openWhatsApp}
                style={styles.whatsappContainer}>
                <View style={{
                  width: wp(60),
                  height: hp(60),
                  borderRadius: wp(60),
                  backgroundColor: '#50CA5E',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth:2,
                  borderColor: '#FFFFFF'
                }}>
 <Image
                  source={components.whatsApp}
                  resizeMode='cover'
                  style={{
                    width: wp(32),
                    height: hp(32),
                  }}
                />
                </View>
               
              </TouchableOpacity>
            ),
          }}
        />

        {TABS.slice(2).map(item => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.tabItem}>
                  <Image
                    source={components[item.icon]}
                    resizeMode="contain"
                    style={[
                      styles.icon,
                      {
                        tintColor: focused ? '#1D3470' : '#7C7C7C',
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.label,
                      {
                        color: focused ? '#1D3470' : '#7C7C7C',
                        fontWeight: focused ? '700' : '400',
                      },
                    ]}>
                    {item.label}
                  </Text>
                </View>
              ),
            }}
          />
        ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    top: hp(16),
    width: wp(60),
  },

  icon: {
    width: wp(25),
    height: hp(25),
    marginBottom: hp(5),
  },

  label: {
    fontSize: fs(13),
  },

  whatsappContainer: {
    position: 'absolute',
    alignSelf: 'center',

    top: hp(-38),

    width: 80,
    height: 80,
    borderRadius: wp(80),

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F2F3F5',
  },
});

export default ButtonTab;
