import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Font from '../../theme/Fonts';
import Color from '../../theme/Color';
import Icon from 'react-native-feather1s';

function SearchInput(props) {
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
        <View style={styles.textInputContainer}>
            <View
                style={props.error ? [styles.textInputContainer1, {borderColor: Color.red}] : [styles.textInputContainer, props.containerStyle]}>
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
            </View>
            <View style={styles.iconStyle}>
                <Icon
                    name={'search'}
                    size={26}
                    color={Color.black}
                />
            </View>
            <View style={styles.textInputContainer2}>
                <View
                    style={[hasFocus ? styles.focusedTextInput : styles.borderText, props.style, props.error ? styles.errorTextInput : null]}
                />
                {props.errorMessage
                    ?
                    (
                        <View>
                            <Text style={styles.error}>{props.errorMessage}</Text>
                        </View>
                    )
                    :
                    null
                }
            </View>
        </View>
    );

}

SearchInput.propTypes = {};
SearchInput.defaultProps = {};

const styles = StyleSheet.create({
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        borderRadius: 7,
        backgroundColor: Color.searchBackGroundColor,
    },
    textInputContainer1: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    iconStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    textInputContainer2: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderColor: Color.red,
        height: 5,
    },
    textInput: {
        fontSize: 18,
        color: Color.black,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        paddingRight: 45,
        justifyContent: 'center',
    },
    focusedTextInput: {
        fontSize: 20,
        color: Color.black,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        borderColor: Color.red,
        justifyContent: 'center',
    },
    errorTextInput: {
        fontSize: 20,
        color: Color.black,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        borderColor: Color.red,
        justifyContent: 'center',
    },
    error: {
        fontSize: 10,
        color: Color.red,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        paddingTop: 10,
        justifyContent: 'center',
    },
    borderText: {
        borderColor: Color.red,
    },
});

export default SearchInput;
