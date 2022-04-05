import React, {Component} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import {Color} from '../../../theme';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import SaveButton from '../../../components/Neo/SaveButton';
import CancelButton from '../../../components/Neo/CancelButton';
import OutlinedStyleInputbox from '../../../components/UserInput/OutlinedStyleInputbox';
import TextFieldOkButton from '../../../components/Neo/TextFieldOkButton';

const {width} = Dimensions.get('window');

const InnerEditButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <IconMaterialIcons
        name="mode-edit"
        size={20}
        color={Color.grey}
        style={{textAlign: 'center'}}
      />
    </TouchableOpacity>
  );
};
export default class ProfessionalAwards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableEditability: this.props.disableEditability,
      isShortView: this.props.isShortView,
      isEditOptionShow: false,
      isEditClicked: false,
      isExistingDataEditClicked: false,
    };
  }
  render() {
    const {
      disableEditability,
      isShortView,
      isEditOptionShow,
      isEditClicked,
      isExistingDataEditClicked,
    } = this.state;

    return (
      <View>
        {/* //************** Heading  ****************** */}
        <View style={{flexDirection: 'row', marginBottom: 2}}>
          <Text
            style={{
              ...styles.subTitlesText,
              width: '25%',
              textAlign: 'center',
            }}>
            Awards
          </Text>
          <View style={{width: '55%'}} />
          {disableEditability ? (
            <View style={{width: '20%'}} />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isExistingDataEditClicked: false});
                  this.setState({isEditClicked: true});
                }}
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome name={'plus'} color={Color.black} size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  {
                    isEditOptionShow
                      ? this.setState({isEditOptionShow: false})
                      : this.setState({isEditOptionShow: true});
                  }
                }}
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                {isEditOptionShow ? (
                  <IconFontisto name="check" color={Color.black} size={15} />
                ) : (
                  <IconEntypo name="edit" color={Color.black} size={20} />
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* //************** Container -Go inside for container Items  ****************** */}
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'center', paddingTop: 4}}>
            <IconMaterialIcons name="military-tech" size={31} />
          </View>
          <View
            style={{
              width: '75%',
            }}>
            {/* //************** Content Item  ****************** */}
            <View
              style={{
                width: isEditOptionShow ? '85%' : '100%',
                flexDirection: 'row',
                marginBottom: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                }}>
                <Text style={styles.userText}>Dr.B.C.Roy Award</Text>
                <Text style={styles.designationText}> 2018,surgery</Text>
              </View>
              {isEditOptionShow ? (
                <InnerEditButton
                  onPress={() => {
                    this.setState({isExistingDataEditClicked: true});
                    this.setState({isEditClicked: true});
                  }}
                />
              ) : null}
            </View>
            <View
              style={{
                width: isEditOptionShow ? '85%' : '100%',
                flexDirection: 'row',
                marginBottom: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                }}>
                <Text style={styles.userText}>Best Surgeon Award</Text>
                <Text style={styles.designationText}> 2018,AIIMS</Text>
              </View>
              {isEditOptionShow ? (
                <TouchableOpacity
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconMaterialIcons
                    name="mode-edit"
                    size={20}
                    color={Color.grey}
                    style={{textAlign: 'center'}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {/* //************** Scroll view for Images or videos. ****************** */}
            {isShortView ? null : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity>
                  <Image
                    style={styles.imageContainer}
                    source={require('../../../assets/images/Nobel_Prize.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.imageContainer}
                    source={require('../../../assets/images/Nobel_Prize.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.imageContainer}
                    source={require('../../../assets/images/dummyCertificate.jpeg')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.imageContainer}
                    source={require('../../../assets/images/dummyCertificate.jpeg')}
                  />
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>

        {/* //************** Award - Edit View  ****************** */}
        {isEditClicked ? (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Neomorph
              inner
              style={{
                ...styles.neomorphOuterStyle,
                height: 470,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    width: '85%',
                    ...styles.subheadingTextStyle,
                  }}>
                  Awards
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isEditClicked: true});
                  }}
                  style={styles.collapseRightIconStyle}>
                  <IconFontAwesome name={'plus'} size={20} color={Color.blue} />
                </TouchableOpacity>
              </View>
              <View style={styles.neoContainerStyle}>
                <NeomorphBlur
                  style={{
                    ...styles.neomorphInnerStyle,
                    height: 360,
                  }}>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                      paddingTop: 10,
                    }}>
                    <OutlinedTextField
                      label="Name"
                      title={'Ex Dr.B.C.Roy Award'}
                      type="text"
                      baseColor={Color.textColor}
                      tintColor={Color.blue}
                      fontSize={16}
                      labelFontSize={12}
                      lineWidth={1}
                    />
                  </View>
                  <View style={styles.betweenInputFieldStyle}>
                    <OutlinedTextField
                      label="Issuing Organization"
                      title={'Ex Medical Council of India'}
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
                    {/*   */}
                    <View style={{width: '49%'}}>
                      <OutlinedTextField
                        label="Start Date"
                        //type="text"
                        title={' '}
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
                        label="End Date"
                        //type="text"
                        title={' '}
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
                    <OutlinedStyleInputbox
                      width={'87%'}
                      placeholder={'URL'}
                      label={'Upload'}
                      isGallarySelected={false} //Once Image is clicked, pass "true" to show the folder icon
                      title={'Image /Video /Document'}
                    />
                    <View style={{width: '2%'}} />
                    <View style={{width: '11%', paddingBottom: 18}}>
                      <TextFieldOkButton
                        onPress={() => {
                          alert('this from awards');
                        }}
                        neoColor={Color.lightgray}
                      />
                    </View>
                  </View>
                </NeomorphBlur>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.cancelButtonStylings}>
                  <CancelButton
                    onPress={() => {
                      this.setState({isEditClicked: false});
                    }}
                    neoColor={Color.lightgray}
                  />
                </View>
                {isExistingDataEditClicked ? (
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text
                      style={{
                        ...styles.subTitlesText,
                        color: Color.white,
                        textAlign: 'center',
                      }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <View style={styles.saveButtonStyling}>
                  <SaveButton onPress={() => {}} neoColor={Color.lightgray} />
                </View>
              </View>
            </Neomorph>
          </View>
        ) : null}
        {/* //************** Separator  ****************** */}
        {isShortView ? null : (
          <View
            style={{
              flexDirection: 'row',
              // marginVertical: 10,
            }}>
            <View style={{width: '25%'}} />
            <View style={{width: '75%'}}>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: Color.textColor,
                  marginTop: 10,
                  marginBottom: 10,
                  width: '100%',
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  qualificationIcon: {
    alignItems: 'center',
    paddingTop: 4,
    width: '25%',
  },
  qualificationIconImageStyle: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  qualificationContentStyle: {
    width: '75%',
    paddingLeft: 5,
  },
  subTitlesText: {
    fontSize: 15,
    fontWeight: '700',
    color: Color.textColor,
  },
  userText: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.black,
  },
  designationText: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.textColor,
    paddingRight: 5,
  },
  ////// edit stylings............
  neomorphOuterStyle: {
    backgroundColor: Color.lightgray,
    width: width * 0.98,
    // height: 200,
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 10,
  },
  collapseRightIconStyle: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  neomorphInnerStyle: {
    backgroundColor: Color.lightgray,
    width: width * 0.94,
    height: 75,
    shadowRadius: 2,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 4,
  },
  titleContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleRightIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  subheadingTextStyle: {
    color: Color.blue,
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    alignSelf: 'flex-start',
    padding: 4,
    paddingLeft: 10,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonStylings: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  saveButtonStyling: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  deleteButton: {
    width: 80,
    height: 30,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Color.grey,
    justifyContent: 'center',
    marginLeft: 10,
    alignSelf: 'center',
  },
  ////User Content styles......
  imageContainer: {
    width: 90,
    height: 100,
    borderRadius: 5,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    marginRight: 8,
  },
});
