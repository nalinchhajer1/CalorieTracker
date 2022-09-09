import {Image} from 'react-native';

export const CTImage = ({source, style, opacity}) => {
  return <Image source={source} style={style} opacity={opacity} />;
};
