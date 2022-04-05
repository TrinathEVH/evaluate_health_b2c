import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import NeoMediumButton from '../../components/Neo/NeoMediumButton';

const {width} = Dimensions.get('window');

class OptionCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpandOptionClicked: false,
        };
    }

    render(props) {
        const {isExpandOptionClicked} = this.state;
        return (
            <>
                <View
                    style={{
                        width: width,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            width: width * 0.2,
                            alignItems: 'center',
                        }}>
                        <NeoMediumButton
                            icon={
                                <MaterialCommunityIcons
                                    name={'cloud-upload'}
                                    size={22}
                                    color={Color.blue}
                                    style={styles.iconStyle}
                                />
                            }
                            label={'Upload'}
                        />
                    </View>
                    <View
                        style={{
                            width: width * 0.2,
                            alignItems: 'center',
                        }}>
                        <NeoMediumButton
                            icon={
                                <IconFontisto
                                    name={'unlocked'}
                                    size={18}
                                    color={Color.blue}
                                    style={styles.iconStyle}
                                />
                            }
                            label={'Lock'}
                        />
                    </View>
                    {isExpandOptionClicked ? null : (
                        <View style={{justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({isExpandOptionClicked: !isExpandOptionClicked})
                                }>
                                <NeomorphBlur inner style={styles.extendedNeoStyle}>
                                    <IconAntDesign
                                        name={'forward'}
                                        size={12}
                                        color={Color.textColor}
                                        style={styles.iconStyle}
                                    />
                                </NeomorphBlur>
                            </TouchableOpacity>
                        </View>
                    )}
                    {isExpandOptionClicked ? (
                        <>
                            <View
                                style={{
                                    width: width * 0.2,
                                    alignItems: 'center',
                                }}>
                                <NeoMediumButton
                                    icon={
                                        <MaterialCommunityIcons
                                            name={'chart-bar-stacked'}
                                            size={20}
                                            color={Color.blue}
                                            style={styles.iconStyle}
                                        />
                                    }
                                    label={'Report'}
                                    onPress={this.props.onPress}
                                />
                            </View>
                            <View
                                style={{
                                    width: width * 0.2,
                                    alignItems: 'center',
                                }}>
                                <NeoMediumButton
                                    icon={
                                        <MaterialCommunityIcons
                                            name="share"
                                            size={23}
                                            color={Color.blue}
                                            style={styles.iconStyle}
                                        />
                                    }
                                    label={'Share'}
                                />
                            </View>
                            <View
                                style={{
                                    width: width * 0.2,
                                    alignItems: 'center',
                                }}
                            />
                        </>
                    ) : null}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    neo1: {
        width: 67,
        height: 52,
        shadowRadius: 2,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 20,
        backgroundColor: Color.primaryNeo,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    neo2: {
        width: 62,
        height: 49,
        shadowRadius: 4,
        shadowOffset: {width: -4, height: -4},
        borderRadius: 15,
        backgroundColor: Color.primaryNeo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    neo3: {
        width: 55,
        height: 46,
        shadowRadius: 4,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 15,
        backgroundColor: Color.primaryNeo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
    },
    iconStyle: {
        textAlign: 'center',
    },
    extendedNeoStyle: {
        width: 30,
        height: 30,
        shadowRadius: 4,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 5,
        backgroundColor: Color.primaryNeo,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default OptionCategory;
