import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {Color} from '../../theme';
const {width, height} = Dimensions.get('window');

export default function NeoSquareIconContainer(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Neomorph
        //inner
        style={{
          width: 40,
          height: 40,
          shadowRadius: 1,
          shadowOffset: {width: 1, height: 1},
          borderRadius: 8,
          backgroundColor: props.neoColor,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          resizeMode: 'contain',
        }}>
        {props.icon}
      </Neomorph>
    </TouchableOpacity>
  );
}
NeoSquareIconContainer.defaultProps = {
  icon: <IconFontisto name="angle-down" size={17} color={Color.grey} />,
  neoColor: Color.primaryNeo,
};
