import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';

function UserInput(props) {
    const [hasFocus, sethasFocus] = useState(false);
    const onFocus = () => {
        sethasFocus(true);
    };
    const inputElementRef = useRef(null);
    const onBlur = () => {
        sethasFocus(false);
    };
    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: {fontFamily: Font.primaryRegular},
        });
    });
    return (
        <View style={[styles.textInputContainer, props.containerStyle]}>
            <TextInput
                style={styles.textInput}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                autoCorrect={props.autoCorrect}
                autoCapitalize={props.autoCapitalize}
                returnKeyType={props.returnKeyType}
                placeholderTextColor={props.placeholderTextColor}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                editable={props.editable}
                onBlur={onBlur}
                onFocus={onFocus}
                ref={inputElementRef}
            />
            <View
                style={[
                    hasFocus ? styles.focusedTextInput : styles.borderText,
                    props.style,
                    props.error ? styles.errorTextInput : null,
                ]}
            />

            {props.errorMessage ? (
                <Text style={styles.error}>{props.errorMessage}</Text>
            ) : null}
        </View>
    );
}

UserInput.propTypes = {};
UserInput.defaultProps = {};

const styles = StyleSheet.create({
    textInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
        width: '100%',
    },
    textInput: {
        fontSize: 16,
        color: Color.textColor,
        fontFamily: Font.primaryRegular,
    },
    borderText: {
        borderBottomColor: Color.borderColor,
        borderBottomWidth: 1,
    },
    focusedTextInput: {
        fontSize: 14,
        color: Color.gray,
        borderBottomColor: Color.colorPrimary,
        borderBottomWidth: 1,
    },
    errorTextInput: {
        fontSize: 14,
        color: Color.gray,
        borderBottomColor: Color.red,
        borderBottomWidth: 1,
    },
    error: {
        fontSize: 10,
        color: Color.red,
    },
});

export default UserInput;
