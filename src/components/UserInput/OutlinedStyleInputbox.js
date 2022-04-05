import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Color} from '../../theme';
import IconEntypo from 'react-native-vector-icons/Entypo';
//const {width, height} = Dimensions.get('window');
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {isGallarySelected: props.isGallarySelected};
  }

  render() {
    const {placeholder, onValueChange, width, value, isGallarySelected} =
      this.props;

    return (
      <View style={{width: width}}>
        <View
          style={{
            borderWidth: 1,
            height: 55.4,
            borderColor: Color.textColor,
            borderRadius: 4,
            paddingLeft: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            //marginBottom: 2,
          }}>
          <TextInput
            placeholder={placeholder}
            onValueChange={onValueChange}
            value={value}
            style={{
              flex: 1,
              height: 45,
              // borderWidth: 1,
              // borderRadius: 4,
              // borderColor: Color.textColor,
              padding: 4,
            }}
          />
          {isGallarySelected ? (
            <View
              style={{
                width: 30,
                marginLeft: 5,
              }}>
              <TouchableOpacity onPress={() => alert('Open Gallary')}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    alignItems: 'center',
                    tintColor: Color.blue,
                  }}
                  source={require('../../assets/icons/folder.png')}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              width: 30,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <IconEntypo
                name="circle-with-cross"
                size={20}
                color={Color.grey}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.titleStyle}>
          <Text style={{...styles.titleText, color: this.props.titleColor}}>
            {this.props.title ? this.props.title : ''}
          </Text>
        </View>
      </View>
    );
  }
}
SelectInput.defaultProps = {};
const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 2,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.textColor,
  },
  modalHeaderTextStyle: {
    color: Color.white,
    fontWeight: '700',
    fontSize: 17,
    backgroundColor: Color.blue,
    paddingHorizontal: 10,
    paddingBottom: 1,
    borderRadius: 4,
  },
});
