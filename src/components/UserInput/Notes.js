import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Neomorph, Shadow, NeomorphBlur} from 'react-native-neomorph-shadows';

export default function Notes(props) {
  return (
    <View
      style={{
        // padding: 5,
        // paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        resizeMode: 'contain',
        borderRadius: 8,
        backgroundColor: props.mainContainerColor,
      }}>
      <View
        style={{
          width: '100%',
          borderRadius: 4,
          marginTop: 5,
          padding: 5,
          paddingTop: 8,
          borderWidth: 0.2,
          borderColor: props.notesBorderColor,
        }}>
        <Text
          style={[
            styles.smallTextStyle,
            {
              fontWeight: '700',
              position: 'absolute',
              top: -10,
              left: 10,
              paddingLeft: 4,
              paddingRight: 4,
              backgroundColor: props.mainContainerColor,
            },
          ]}>
          {props.heading}
        </Text>
        {/* ************* previous Messages with datetime stamp for user reference  ***********/}
        <TouchableOpacity
          onLongPress={props.onLongPress}
          style={{
            width: '100%',
            backgroundColor: props.userNotesContainerColor,
            borderRadius: 5,
            marginTop: 2,
            marginBottom: 2,
            paddingLeft: 5,
            paddingRight: 5,
          }}>
          <Text style={styles.dataTextStyle}>Bookmarked, Medicine Name</Text>
          <Text
            style={{
              ...styles.smallTextStyle,
              fontSize: 10,
              fontStyle: 'italic',
              textAlign: 'right',
            }}>
            11th Oct 2020
          </Text>
        </TouchableOpacity>
        {/* ************* user Input Container   ***********/}
        {/* ************* Trinath- it should be Text input field Text input for taking notes  ***********/}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            minHeight: 37,
            backgroundColor: props.textInputContainer,
            borderRadius: 14,
            marginTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '86%',
              justifyContent: 'center',
              padding: 5,
            }}>
            <TextInput
              style={{
                height: 40,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={props.onPresstextInputContainer}
            style={{
              width: '14%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Neomorph
              style={{
                width: 40,
                height: 34,
                borderRadius: 11,
                shadowRadius: 1,
                shadowOffset: {width: 1, height: 1},
                backgroundColor: props.textInputContainer,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                resizeMode: 'contain',
              }}>
              <IconAntDesign
                name={'caretright'}
                size={22}
                color={Color.blue}
                style={{
                  ...styles.imageIconStyle,
                  paddingTop: 1,
                }}
              />
            </Neomorph>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
Notes.propTypes = {};
Notes.defaultProps = {
  onLongPress: () => alert('Long Press Clicked?'),
  onPresstextInputContainer: () => alert('Message Button pressed'),
  mainContainerColor: Color.lightgrey,
  userNotesContainerColor: Color.white,
  textInputContainer: Color.silver,
  notesBorderColor: Color.textColor,
  heading: 'Notes',
};
const styles = StyleSheet.create({
  dataTextStyle: {
    color: Color.textColor,
    fontWeight: '600',
    fontSize: 16,
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
});
