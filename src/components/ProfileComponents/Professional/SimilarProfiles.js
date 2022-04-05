import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import {Color} from '../../../theme';
const {width} = Dimensions.get('window');
export default class SimilarProfiles extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            ...styles.subheadingTextStyle,
            ...styles.subheadingAlignments,
          }}>
          {this.props.title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 4,
              paddingVertical: 5,
            }}>
            <NeomorphBlur style={styles.neoContainer}>
              <ImageBackground
                style={styles.profileBackgroundContainer}
                source={require('../../../assets/images/3-who-056149-img.jpg')}>
                <View style={styles.profileImageContainer}>
                  <Image
                    style={styles.profileImageStyle}
                    source={require('../../../assets/images/default-doctor.jpeg')}
                  />
                </View>
                <View style={styles.imageBackgroundTextContainer}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.designationText,
                      {color: Color.textColor, fontWeight: '500'},
                    ]}>
                    Dr.ABC
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.designationText,
                      {color: Color.textColor, fontWeight: '500'},
                    ]}>
                    Cardiologist/Speciality
                  </Text>
                  <Text
                    style={[
                      styles.designationText,
                      {color: Color.textColor, fontWeight: '500'},
                    ]}>
                    Experience: 25 Years
                  </Text>
                </View>
              </ImageBackground>
            </NeomorphBlur>
          </View>
        </ScrollView>
        <View style={{padding: 5}} />
      </View>
    );
  }
}
SimilarProfiles.defaultProps = {
  title: ' You might be Interested',
};
const styles = StyleSheet.create({
  subheadingTextStyle: {
    color: Color.blue,
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    alignSelf: 'flex-start',
    textAlign: 'left',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  neoContainer: {
    backgroundColor: Color.primaryNeo,
    width: 180,
    height: 210,
    shadowRadius: 2,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 4,
    justifyContent: 'center',
    padding: 5,
  },
  profileBackgroundContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  profileImageStyle: {
    width: 110,
    height: 110,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  imageBackgroundTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.primaryNeo,
    opacity: 0.85,
    height: 70,
    padding: 2,
  },
});
