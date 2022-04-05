import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';

function TextArea(props) {
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
        <View style={styles.textInputContainer1}>
            <View
                style={props.error ? [styles.textInputContainer, {borderColor: Color.red}] : [styles.textInputContainer, props.containerStyle]}>
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
                    multiline
                />
            </View>
            <View style={styles.textInputContainer2}>
                <View
                    style={[hasFocus ? styles.focusedTextInput : styles.borderText, props.style, props.error ? styles.errorTextInput : null]}
                />
                {props.errorMessage
                    ?
                    (<View>
                        <Text style={styles.error}>{props.errorMessage}</Text>
                    </View>)
                    :
                    null
                }
            </View>
        </View>
    );

}

TextArea.propTypes = {};
TextArea.defaultProps = {};

const styles = StyleSheet.create({
    textInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        width: '100%',
        borderColor: Color.borderColor,
        borderWidth: 0.5,
        paddingLeft: 15,
    },
    textInput: {
        fontSize: 16,
        color: Color.textColor,
        fontFamily: Font.primaryRegular,
    },
    borderText: {},
    focusedTextInput: {
        fontSize: 14,
        color: Color.gray,
    },
    errorTextInput: {
        fontSize: 14,
        color: Color.gray,
    },
    error: {
        fontSize: 10,
        color: Color.red,
    },
});

export default TextArea;
