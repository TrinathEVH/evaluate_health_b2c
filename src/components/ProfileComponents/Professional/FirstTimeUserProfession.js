// This mostly will be shown when user registered with us and haven't created the professional profile.
// Once he creates a professional profile.. this won't be visible...
// Health segmentation: most will be shifting to apercu to have wider range... to check it will be implemented now or not...
// Will try check how to make visual exprience like.. once user clicks this card... will show the option for creating the profile.... to check and consider....
//

import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import {Color, Fonts} from '../../../theme';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default class FirstTimeUserProfession extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {} = this.state;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{height: 5}} />
        {/* // ****************** Welcome Frame & Employee Dashboard  ************************ */}
        <NeomorphBlur
          inner
          style={{
            ...styles.neoframe01,
            backgroundColor: '#2582A1',
            width: width * 0.97,
          }}>
          <NeomorphBlur
            inner
            style={{
              ...styles.neoframe02,
              backgroundColor: '#2582A1',
              width: width * 0.95,
            }}>
            <NeomorphBlur
              inner
              style={{
                ...styles.neoframe03,
                backgroundColor: '#2582A1',
                width: width * 0.92,
              }}>
              <TouchableOpacity activeOpacity={1}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      ...styles.subTitlesText,
                      color: Color.white,
                      paddingTop: 10,
                    }}>
                    Welcome to Global Healthcare Community
                  </Text>
                  <View
                    style={{
                      paddingTop: 30,
                      paddingBottom: 30,
                    }}>
                    <IconMaterialCommunityIcons
                      name="professional-hexagon"
                      size={60}
                      color={Color.white}
                      styles={{}}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.smallTextStyle,
                      color: Color.white,
                    }}>
                    One Earth | One Home | One Vision
                  </Text>
                  <Text
                    style={{
                      ...styles.smallTextHighlightStyle,
                      color: Color.white,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    Towards Healthier Tomorrow
                  </Text>
                </View>
              </TouchableOpacity>
            </NeomorphBlur>
          </NeomorphBlur>
        </NeomorphBlur>
        <View style={{height: 14}} />
        {/* //************** Healthcare Segmentation  ****************** */}
        {/* // Others Section: Open modal to select: Academic, Politics, Scientists, Researcher, Policy makers, etc */}
        <>
          {/* <Neomorph
          inner
          style={{
            ...styles.neomorphOuterStyle,
            height: 125,
          }}>
          <Text style={{...styles.subheadingTextStyle, width: '80%'}}>
            Profile Type
          </Text>
          <View style={styles.neoContainerStyle}>
            <NeomorphBlur style={{...styles.neomorphInnerStyle, height: 75}}>
              <View
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                ]}>
                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                    }}
                    source={require('../../../assets/icons/doctor.png')}
                  />
                  <Text>Doctor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: 'center',
                    //backgroundColor: 'yellow',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                    }}
                    source={require('../../../assets/icons/pharmacy_alt.png')}
                  />
                  <Text>Pharmacist</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                    }}
                    source={require('../../../assets/icons/nurse.png')}
                  />
                  <Text>Healthcare</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                    }}
                    source={require('../../../assets/icons/city_worker.png')}
                  />
                  <Text>Others</Text>
                </TouchableOpacity>
              </View>
            </NeomorphBlur>
          </View>
        </Neomorph> */}
        </>
        <View style={{height: 14}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.primaryBold,
    color: Color.blue,
    fontSize: 18,
    fontWeight: 'bold',
  },

  subTitlesText: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.blue,
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
  neoframe01: {
    width: width * 0.47,
    height: 238,
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 5,
    backgroundColor: Color.aquamarine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neoframe02: {
    width: width * 0.45,
    height: 230,
    shadowRadius: 4,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 5,
    backgroundColor: Color.aquamarine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neoframe03: {
    width: width * 0.42,
    height: 220,
    shadowRadius: 4,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 2,
    backgroundColor: Color.aquamarine,
    padding: 10,
  },
  ///// Edit Screen styings....................

  neomorphOuterStyle: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.98,
    // height: 200,
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 10,
  },
  neomorphInnerStyle: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.94,
    height: 75,
    shadowRadius: 2,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 4,
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
  userDataStyle: {
    color: Color.textColor,
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'GothamRounded-Medium',
  },
  neoContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  betweenInputFieldStyle: {
    height: 90,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowCenterStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
