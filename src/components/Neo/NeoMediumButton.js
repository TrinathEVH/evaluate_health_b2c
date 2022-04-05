import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../theme';

export default function NeoMediumButton(props) {
    return (
        <NeomorphBlur
            inner
            style={{
                width: 67,
                height: 52,
                shadowRadius: 2,
                shadowOffset: {width: 4, height: 4},
                borderRadius: 20,
                backgroundColor: props.neoColorOuter,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <NeomorphBlur
                inner
                style={{
                    width: 62,
                    height: 49,
                    shadowRadius: 4,
                    shadowOffset: {width: -4, height: -4},
                    borderRadius: 15,
                    backgroundColor: props.neoColorMiddle,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //position: 'absolute',
                }}>
                <TouchableOpacity
                    //activeOpacity={1}
                    onPress={props.onPress}>
                    <NeomorphBlur
                        inner
                        style={{
                            width: 55,
                            height: 46,
                            shadowRadius: 4,
                            shadowOffset: {width: 4, height: 4},
                            borderRadius: 15,
                            backgroundColor: props.neoColorInner,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            {props.icon}
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'baseline',
                                    textAlign: 'center',
                                    color: props.labelColor,
                                }}>
                                {props.label}
                            </Text>
                        </View>
                    </NeomorphBlur>
                </TouchableOpacity>
            </NeomorphBlur>
        </NeomorphBlur>
    );
}
NeoMediumButton.defaultProps = {
    icon: (
        <IconIonicons
            name="shield-checkmark"
            size={20}
            color={Color.blue}
            style={{
                textAlign: 'right',
                paddingRight: 5,
                justifyContent: 'center',
                alignSelf: 'center',
            }}
        />
    ),
    label: 'label',
    neoColorOuter: Color.primaryNeo,
    neoColorMiddle: Color.primaryNeo,
    neoColorInner: Color.primaryNeo,
    labelColor: Color.black,
};
