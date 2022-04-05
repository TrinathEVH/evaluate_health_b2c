///Trinath check the logic ...
// 1. On press: this should expand and on pressing again...it should collapse...variable for this is "isShortView"
// 2. This same screen can be used by main user to edit or add the Details...variable to show/hide edit options 'disableEditability'
//3. To Add swipe option and navigate to main user's Edit screen.....

import React, {Component} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {Color} from '../../../theme';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfessionalAwards from './ProfessionalAwards';
import ProfessionalSkills from './ProfessionalSkills';
import ProfessionalCertificates from './ProfessionalCertificates';
import Experience from './Experience';
import School from './School';
import ProfessionalMembership from './ProfessionalMembership';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const {width} = Dimensions.get('window');

export default class ProfessionalQualificationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinkedInClicked: true,
      disableEditability: true,
      isShortView: true,
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
        <TouchableOpacity
        // onPress={() =>
        //   this.props.navigation.navigate('EditBasicPersonal', {
        //     screen: 'EditBasicPersonal',
        //     params: {item: this.state.userDefaultData},
        //   })
        // }
        >
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
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              'ProfessionalProfileQualificationEditScreen',
            )
          }>
          <Animated.Text
            style={[styles.rightActionText, {transform: [{scale}]}]}>
            Edit Details
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  navigateToEdit = () => {
    this.props.navigation.navigate(
      'ProfessionalProfileQualificationEditScreen',
    );
  };

  render() {
    const {isLinkedInClicked, disableEditability, isShortView} = this.state;

    return (
      <View style={{}}>
        <Text
          style={{
            ...styles.subheadingTextStyle,
            ...styles.subheadingAlignments,
          }}>
          Qualifications
        </Text>
        <View style={{alignItems: 'center'}}>
          {/* // ******************   LinkedIn Sync ************************ */}
          {isLinkedInClicked ? null : (
            <View
              style={{
                width: width * 0.98,
                flexDirection: 'row',
                backgroundColor: Color.blue,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  ...styles.subheadingTextStyle,
                  width: '85%',
                  color: Color.white,
                }}>
                QUALIFICATIONS
              </Text>
              {/* to Import qualifications from Linkedin... Check to connect with Linkedin API */}
              <TouchableOpacity
                onPress={() => alert('Update with Linkedin')}
                style={{
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconMaterialCommunityIcons
                  name="linkedin"
                  size={32}
                  color={Color.white}
                  styles={{}}
                />
              </TouchableOpacity>
            </View>
          )}
          {/* // ******************  short & long view of qualifications ************************ */}

          <View style={styles.behindCardContainer}>
            <Swipeable
              renderLeftActions={this.leftAction}
              renderRightActions={this.rightAction}>
              <View style={styles.cardContainer}>
                <TouchableOpacity
                  activeOpacity={0.5} // Once logic is corrected, change activeOpacity to 1..
                  onPress={() => {
                    this.setState({isShortView: !this.isShortView});
                  }}>
                  <ProfessionalSkills
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                  <ProfessionalAwards
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                  <ProfessionalCertificates
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                  <Experience
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                  <School
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                  <ProfessionalMembership
                    disableEditability={disableEditability}
                    isShortView={isShortView}
                  />
                </TouchableOpacity>
              </View>
            </Swipeable>
          </View>
          <View style={{height: 10}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  // subheadingAlignments: {
  //   padding: 4,
  //   paddingLeft: 8,
  //   paddingRight: 8,
  //   borderRadius: 10,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // },
  behindCardContainer: {
    backgroundColor: Color.gray,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 4,
  },
  cardContainer: {
    width: width * 0.98,
    backgroundColor: Color.lightgrey,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  // // ***********   swipe actions  *************
  leftAction: {
    justifyContent: 'center',
    flex: 0.3,
  },
  leftactionText: {
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
});
