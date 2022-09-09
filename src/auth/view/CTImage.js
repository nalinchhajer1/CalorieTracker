import React from 'react';
import FastImage from 'react-native-fast-image';

export const CTImage = ({source, style, opacity}) => {
  return <FastImage source={source} style={style} opacity={opacity} />;
};
