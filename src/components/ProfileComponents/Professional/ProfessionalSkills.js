import React, {Component} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import {Color} from '../../../theme';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');

export default class ProfessionalSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableEditability: this.props.disableEditability,
      isShortView: this.props.isShortView,
      isEditClicked: false,
    };
  }
  render() {
    const {disableEditability, isShortView, isEditClicked} = this.state;

    return (
      <View>
        {/* //************** Heading  ****************** */}
        {/* /// Plus icon is for first time entry only.. once here entered skills then only edit option to be visible */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 2,
          }}>
          <Text
            style={{
              ...styles.subTitlesText,
              width: '25%',
              textAlign: 'center',
            }}>
            Skills
          </Text>
          <View style={{width: '55%'}} />
          {disableEditability ? (
            <View style={{width: '20%'}} />
          ) : (
            <>
              <TouchableOpacity
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome name={'plus'} color={Color.black} size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isEditClicked: true});
                }}
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <IconEntypo name="edit" color={Color.black} size={20} />
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* //************** Container  ****************** */}
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'center', paddingTop: 4}}>
            <IconMaterialCommunityIcons name="lightbulb-on" size={31} />
          </View>
          <View
            style={{
              width: '75%',
            }}>
            {/* //************** Content Item  ****************** */}
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
              }}>
              <Text style={styles.designationText}>Dr.B.C.Roy Award</Text>
              <Text style={styles.designationText}>2018,surgery</Text>
              <Text style={styles.designationText}>Dr.B.C.Roy Award</Text>
              <Text style={styles.designationText}>2018,surgery</Text>
            </View>
          </View>
        </View>

        {/* //************** Edit View  ****************** */}
        {isEditClicked ? (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Neomorph
              inner
              style={{
                ...styles.neomorphOuterStyle,
                height: 135,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    width: '85%',
                    ...styles.subheadingTextStyle,
                  }}>
                  Skills
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isEditClicked: false});
                  }}
                  style={styles.collapseRightIconStyle}>
                  <IconMaterialIcons
                    name="check-circle"
                    color={Color.blue}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.neoContainerStyle}>
                <NeomorphBlur
                  style={{...styles.neomorphInnerStyle, height: 90}}>
                  <View
                    style={{
                      ...styles.betweenInputFieldStyle,
                    }}>
                    {/* //// Input type : Multioption input list, 
                      1. As he types... respective items should populate  */}
                    <OutlinedTextField
                      label="Skills"
                      type="text"
                      baseColor={Color.textColor}
                      tintColor={Color.blue}
                      fontSize={16}
                      labelFontSize={12}
                      lineWidth={1}
                    />
                  </View>
                </NeomorphBlur>
              </View>
            </Neomorph>
          </View>
        ) : null}
        {/* //************** Separator  ****************** */}
        {isShortView ? null : (
          <View
            style={{
              flexDirection: 'row',
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
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    borderRadius: 10,
  },
  neomorphInnerStyle: {
    backgroundColor: Color.lightgray,
    width: width * 0.94,
    height: 75,
    shadowRadius: 2,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 4,
  },
  collapseRightIconStyle: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
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
});
