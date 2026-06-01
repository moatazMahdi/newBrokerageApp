import React from 'react';
import { View } from 'react-native';
import { paginationStyles } from '../styles/pagination.styles';


interface Props {
  currentIndex: number;
  total: number;
}

const OnboardingPagination = ({
  currentIndex,
  total,
}: Props) => {
  return (
    <View style={paginationStyles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={
            currentIndex === index
              ? paginationStyles.activeDot
              : paginationStyles.inactiveDot
          }
        />
      ))}
    </View>
  );
};

export default OnboardingPagination;