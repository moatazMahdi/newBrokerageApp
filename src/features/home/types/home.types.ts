export type HomeSection = {
  id: string;
  title: string;
};

export type CustomerType = 'individuals' | 'companies';

import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  title: string;
  image?: ImageSourcePropType;
};
