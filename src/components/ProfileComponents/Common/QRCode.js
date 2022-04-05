import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../../../theme';
import Modal from 'react-native-modal';
import CancelButton from '../../Neo/CancelButton';
const {width} = Dimensions.get('window');
export default class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQRCodeClicked: false,
      isWebAppClicked: false,
    };
  }
  render() {
    const {isQRCodeClicked, isWebAppClicked} = this.state;

    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <NeomorphBlur
            inner
            style={{
              ...styles.neoContactContainer,
              width: 40,
              height: 40,
              shadowOffset: {width: -4, height: -4},
            }}>
            <TouchableOpacity
              onPress={() => this.setState({isQRCodeClicked: true})}>
              <NeomorphBlur
                inner
                style={{
                  ...styles.neoContactContainer,
                  marginRight: 0,
                }}>
                <IconAntDesign name="qrcode" size={28} />
              </NeomorphBlur>
            </TouchableOpacity>
          </NeomorphBlur>
        </View>

        <Modal
          // testID={'modal'}
          transparent={true}
          animationInTiming={400}
          animationOutTiming={300}
          backdropOpacity={0.5}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          isVisible={isQRCodeClicked}
          onSwipeComplete={() =>
            this.setState({
              isQRCodeClicked: !isQRCodeClicked,
            })
          }
          swipeDirection={['left', 'right', 'up', 'down']}>
          <View
            style={{
              backgroundColor: Color.primaryNeo,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            {isWebAppClicked ? (
              <View
                style={{
                  width: width * 0.8,
                  height: width * 0.8,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Color.textColor,
                  alignSelf: 'center',
                  resizeMode: 'cover',
                }}>
                {/* //Integrate with QR code scanner............ */}
                <IconAntDesign name="qrcode" />
              </View>
            ) : (
              <Image
                style={{
                  width: width * 0.8,
                  height: width * 0.8,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Color.textColor,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/images/aiims.png')}
              />
            )}
            <View style={{}}>
              <Text style={styles.subheadingTextStyle}>{this.props.label}</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isWebAppClicked: !isWebAppClicked})
                }
                style={{
                  width: width * 0.8,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: Color.blue,
                }}>
                <Text
                  style={{
                    ...styles.subheadingTextStyle,
                    color: Color.white,
                  }}>
                  {isWebAppClicked ? 'Close QR SCANNER' : 'Open as WebApp'}
                </Text>
              </TouchableOpacity>
              <View style={{alignSelf: 'center', padding: 20}}>
                <CancelButton
                  onPress={() => {
                    this.setState({isQRCodeClicked: false});
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  neoContactContainer: {
    backgroundColor: Color.primaryNeo,
    width: 35,
    height: 35,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  rowCenterStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTextStyle: {
    color: Color.textColor,
    fontWeight: '500',
    fontSize: 13,
  },
  smallTextHighlightStyle: {
    color: Color.textColor,
    fontWeight: '700',
    fontSize: 13,
  },
  subheadingTextStyle: {
    color: Color.blue,
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    alignSelf: 'flex-start',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
