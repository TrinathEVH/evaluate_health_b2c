import React, {Component} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from 'react-native';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Color} from '../../../theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import SaveButton from '../../../components/Neo/SaveButton';
import CancelButton from '../../../components/Neo/CancelButton';
import SelectInput from '../../../components/SelectInput';
import TextFieldOkButton from '../../../components/Neo/TextFieldOkButton';
import OutlinedStyleInputbox from '../../../components/UserInput/OutlinedStyleInputbox';
import BookmarkShareButton from '../../../components/Neo/BookmarkShareButton';
import QRCode from '../Common/QRCode';
const {width} = Dimensions.get('window');

export default class ProfessionalApercuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionApercuUpload: null,
      isEditClicked: null,
    };
  }
  leftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.leftAction}>
        <TouchableOpacity onPress={() => this.setState({isEditClicked: true})}>
          <Animated.Text
            style={[styles.leftactionText, {transform: [{scale}]}]}>
            Edit Details
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  rightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.RightAction}>
        <TouchableOpacity onPress={() => this.setState({isEditClicked: true})}>
          <Animated.Text
            style={[styles.rightActionText, {transform: [{scale}]}]}>
            Edit Details
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {professionApercuUpload, isEditClicked} = this.state;
    const professionTypes = [
      {
        label: 'Doctor',
        value: 1,
      },
      {
        label: 'Pharmacist',
        value: 2,
      },
      {
        label: 'Veterinarian',
        value: 3,
      },

      {
        label: 'Lawyer',
        value: 4,
      },
      {
        label: 'Accountant',
        value: 5,
      },
      {
        label: 'Artist',
        value: 6,
      },

      {
        label: 'Lawyer',
        value: 7,
      },
      {
        label: 'Scientist',
        value: 8,
      },
    ];
    const professionApercuUploads = [
      {
        label: 'Image',
        value: 1,
      },
      {
        label: 'Website',
        value: 2,
      },
      {
        label: 'LinkedIn',
        value: 3,
      },

      {
        label: 'Twitter',
        value: 4,
      },
      {
        label: 'Instagram',
        value: 5,
      },
      {
        label: 'YouTube',
        value: 6,
      },

      {
        label: 'Others',
        value: 7,
      },
    ];
    return (
      <View>
        {/* //************** Apercu   ****************** */}
        <View style={{...styles.behindCardContainer, borderRadius: 2}}>
          <Swipeable
            renderLeftActions={this.leftAction}
            renderRightActions={this.rightAction}>
            <NeomorphBlur inner style={styles.neoFrame1}>
              <Neomorph inner style={styles.neoFrame2}>
                <NeomorphBlur inner style={styles.neoFrame3}>
                  <View style={styles.rowCenterStyle}>
                    <View
                      style={{
                        width: '93%',
                        alignItems: 'center',
                        paddingBottom: 10,
                        //backgroundColor: Color.yellow,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...styles.subTitlesText,
                          color: Color.blue,
                          fontSize: 16,
                        }}>
                        Dr. Vishnu Murty
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          ...styles.subTitlesText,
                          color: Color.textColor,
                          textAlign: 'center',
                        }}>
                        MBBS, FRCS (London)
                      </Text>
                      <Text numberOfLines={1} style={styles.designationText}>
                        Head of Surgery, AIIMS
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '7%',
                        //position: 'absolute',
                        //backgroundColor: Color.blue,
                        left: -5,
                        bottom: 32,
                        alignItems: 'center',
                      }}>
                      <NeomorphBlur
                        inner
                        style={{
                          backgroundColor: Color.primaryNeo,
                          width: 30,
                          height: 30,
                          shadowRadius: 2,
                          shadowOffset: {width: -4, height: -4},
                          borderRadius: 19,
                          justifyContent: 'center',
                          alignItems: 'center',
                          //flexDirection: 'row',
                          alignSelf: 'center',
                          //resizeMode: 'contain',
                        }}>
                        <IconIonicons
                          name="ribbon-sharp"
                          size={20}
                          color={Color.darkgreen}
                        />
                      </NeomorphBlur>
                    </View>
                  </View>
                  {/* ************** Row content- Photo, Contacts  ****************** */}
                  <View style={styles.rowCenterStyle}>
                    <View
                      style={{
                        width: '38%',
                        alignItems: 'center',
                        //backgroundColor: Color.red,
                      }}>
                      <NeomorphBlur inner style={styles.neoImageContainer}>
                        <Image
                          style={styles.profileImageStyle}
                          source={require('../../../assets/images/3-who-056149-img.jpg')}
                        />
                      </NeomorphBlur>
                    </View>
                    <View
                      style={{
                        width: '62%',
                        justifyContent: 'space-evenly',
                      }}>
                      <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={styles.subTitlesText}>- 25 Years - </Text>
                        <Text style={styles.designationText}>Cardiologist</Text>
                      </View>
                      <View
                        style={[
                          styles.rowCenterStyle,
                          {
                            paddingLeft: 4,
                            paddingBottom: 4,
                          },
                        ]}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            // paddingBottom: 4,
                          }}>
                          <NeomorphBlur
                            inner
                            style={styles.neoContactContainer}>
                            <Image
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: 20,
                                tintColor: Color.blue,
                                //backgroundColor: Color.blue,
                              }}
                              source={require('../../../assets/icons/location_pin.png')}
                            />
                          </NeomorphBlur>

                          <Text style={styles.designationText}>
                            Mumbai,India
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          ...styles.rowCenterStyle,
                          paddingLeft: 4,
                          paddingBottom: 4,
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '40%',
                          }}>
                          <NeomorphBlur
                            inner
                            style={styles.neoContactContainer}>
                            <IconIonicons
                              name="heart-circle-sharp"
                              size={32}
                              color={Color.blue}
                            />
                          </NeomorphBlur>

                          <Text style={styles.designationText}>1000</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            ...styles.rowCenterStyle,
                            paddingLeft: 4,
                            paddingBottom: 4,
                            justifyContent: 'space-evenly',
                            width: '60%',
                          }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              //paddingLeft: 5,
                              //width: '25%',
                              // paddingBottom: 4,
                            }}>
                            <NeomorphBlur
                              inner
                              style={styles.neoContactContainer}>
                              <Image
                                style={{
                                  width: 27,
                                  height: 27,
                                  borderRadius: 20,
                                  tintColor: Color.blue,
                                }}
                                source={require('../../../assets/icons/wwwurl.png')}
                              />
                            </NeomorphBlur>

                            {/* <Text style={styles.designationText}>Website</Text> */}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              //width: '25%',
                              // paddingLeft: 10,
                              // paddingBottom: 4,
                            }}>
                            <NeomorphBlur
                              inner
                              style={styles.neoContactContainer}>
                              <IconEntypo
                                name="linkedin-with-circle"
                                size={26}
                                color={Color.blue}
                              />
                            </NeomorphBlur>

                            {/* <Text style={styles.designationText}>LinkedIn</Text> */}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              //width: '25%',
                              // paddingLeft: 10,
                              // paddingBottom: 4,
                            }}>
                            <NeomorphBlur
                              inner
                              style={styles.neoContactContainer}>
                              <Image
                                style={{
                                  width: 26,
                                  height: 26,
                                  borderRadius: 20,
                                  //tintColor: Color.blue,
                                  //backgroundColor: Color.blue,
                                }}
                                source={require('../../../assets/icons/ResearchGate.png')}
                              />
                            </NeomorphBlur>

                            {/* <Text style={styles.designationText}>LinkedIn</Text> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </NeomorphBlur>
              </Neomorph>
            </NeomorphBlur>
          </Swipeable>
        </View>
        {/* **************************** Barcode & bookmark,Share  ************************** */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingTop: 5,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <QRCode label={'User Name'} />
            {/* /// Finalize the case scenario for pvt doctors without company registration who take appointments.... then enable the ncessary options. */}
            <View
              style={{
                height: 37,
                justifyContent: 'center',
                // backgroundColor: Color.lightgray,
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 10,
                paddingVertical: 1,
                marginLeft: 5,
                flexDirection: 'row',
              }}>
              {/* <IconMaterialCommunityIcons
                name="clock-time-four"
                size={22}
                color={Color.gray}
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingRight: 5,
                }}
              /> */}
              <Text
                style={{...styles.smallTextHighlightStyle, color: Color.gray}}>
                MON-SAT,{'\n'}7:00AM to 8:00PM
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'flex-end',
            }}>
            <BookmarkShareButton />
          </View>
        </View>
        {/* //************** Apercu Edit view  ****************** */}
        {isEditClicked ? (
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <Neomorph
              inner
              style={{
                ...styles.neomorphOuterStyle,
                height: 565,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    width: '100%',
                    ...styles.subheadingTextStyle,
                  }}>
                  Awards
                </Text>
              </View>

              <View style={styles.neoContainerStyle}>
                <NeomorphBlur
                  style={{...styles.neomorphInnerStyle, height: 450}}>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                      ...styles.rowCenterStyle,
                      paddingTop: 10,
                    }}>
                    {/* Dropdown list or modal : two options Mr/Mrs or Dr ; default value to be Mr/Mrs.
                  Default value Mr. should not to be shown in Apercu section), Only if user selects Dr. then show   */}
                    <View style={{width: '29%'}}>
                      <OutlinedTextField
                        label="Prefix"
                        type="text"
                        title="Dr."
                        //value={Titlename}
                        //onChangeText={(Titlename) => this.setState({Titlename})}
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>
                    <View style={{width: '2%'}} />
                    {/* /// Name to be Prefilled from our profile page (first name + Last Name) */}
                    <View style={{width: '69%'}}>
                      <OutlinedTextField
                        label="Full Name"
                        type="text"
                        title=" "
                        // value={fullName}
                        // onChangeText={(fullName) => this.setState({fullName})}
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                      ...styles.rowCenterStyle,
                    }}>
                    {/* on text change: dropdown list for speciality list for Doctors, other list for pharmacist or other will add to database later    */}
                    <View style={{width: '49%'}}>
                      <OutlinedTextField
                        label="Profession"
                        title="Ex Doctor"
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>

                    <View style={{width: '2%'}} />
                    <View style={{width: '49%'}}>
                      <OutlinedTextField
                        label="Specialization"
                        title="Ex Cardiologist"
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                      ...styles.rowCenterStyle,
                    }}>
                    {/* on text change: dropdown list for speciality list for Doctors, other list for pharmacist or other will add to database later    */}
                    <View style={{width: '49%'}}>
                      <OutlinedTextField
                        label="Qualification Short"
                        type="text"
                        title={'Ex MS, MBBS'}
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>
                    <View style={{width: '2%'}} />
                    <View style={{width: '49%'}}>
                      <OutlinedTextField
                        label="Experience"
                        title="Ex 10 Years"
                        keyboardType="number-pad"
                        suffix="Years"
                        baseColor={Color.textColor}
                        tintColor={Color.blue}
                        fontSize={16}
                        labelFontSize={12}
                        lineWidth={1}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                    }}>
                    {/* Suffix to have Location Icon to take GPS location to pick city, state and Country */}

                    <OutlinedTextField
                      label="Location"
                      type="text"
                      baseColor={Color.textColor}
                      tintColor={Color.blue}
                      fontSize={16}
                      labelFontSize={12}
                      lineWidth={1}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                      ...styles.rowCenterStyle,
                    }}>
                    <SelectInput
                      width={'29%'}
                      placeholder={'Upload'}
                      options={professionApercuUploads}
                      onValueChange={(value) => {
                        this.setState({professionApercuUpload: value});
                        console.log(value);
                      }}
                      label={'Upload'}
                      value={professionApercuUpload}
                      headerTemplate="Upload Type"
                    />

                    <View style={{width: '1.5%'}} />
                    <OutlinedStyleInputbox
                      width={'57%'}
                      placeholder={'URL'}
                      label={'Upload'}
                      isGallarySelected={false} //Once Image is clicked, pass "true" to show the folder icon
                    />
                    <View style={{width: '1.5%'}} />
                    <View style={{width: '11%', paddingBottom: 18}}>
                      <TextFieldOkButton onPress={() => {}} />
                    </View>
                  </View>
                </NeomorphBlur>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.cancelButtonStylings}>
                  <CancelButton
                    onPress={() => {
                      this.setState({isEditClicked: false});
                    }}
                  />
                </View>
                <View style={styles.saveButtonStyling}>
                  <SaveButton onPress={() => {}} />
                </View>
              </View>
            </Neomorph>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  behindCardContainer: {
    backgroundColor: Color.gray,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 4,
  },
  neoFrame1: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.96,
    height: 250,
    shadowRadius: 2,
    shadowOffset: {width: -4, height: -4},
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neoFrame2: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.93,
    height: 240,
    shadowRadius: 2,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  neoFrame3: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.9,
    height: 230,
    shadowRadius: 2,
    shadowOffset: {width: -4, height: -4},
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  neoImageContainer: {
    backgroundColor: Color.primaryNeo,
    width: 118,
    height: 118,
    shadowRadius: 4,
    shadowOffset: {width: -4, height: -4},
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //resizeMode: 'contain',
  },
  profileImageStyle: {
    width: 110,
    height: 110,
    borderRadius: 20,
    resizeMode: 'cover',
  },

  neoContactContainer: {
    backgroundColor: Color.primaryNeo,
    width: 32,
    height: 32,
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  rowCenterStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  designationText: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.textColor,
    paddingRight: 5,
  },
  userText: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.black,
  },
  subTitlesText: {
    fontSize: 15,
    fontWeight: '700',
    color: Color.textColor,
  },
  // // ***********   swipe actions  *************
  leftAction: {
    justifyContent: 'center',
    flex: 0.3,
  },
  leftactionText: {
    //fontFamily: "GothamRounded-Medium",
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
    color: Color.white,
    padding: 20,
  },
  RightAction: {
    justifyContent: 'center',
    flex: 0.3,
  },
  rightActionText: {
    //fontFamily: "GothamRounded-Medium",
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
    color: Color.white,
    padding: 20,
  },
  smallTextHighlightStyle: {
    color: Color.textColor,
    fontWeight: '700',
    fontSize: 13,
  },
  ///Edit stylingss..............

  neomorphOuterStyle: {
    backgroundColor: Color.primaryNeo,
    width: width * 0.98,
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
  collapseRightIconStyle: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
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
  cancelButtonStylings: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: '50%',
  },
  saveButtonStyling: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    width: '50%',
  },
});
