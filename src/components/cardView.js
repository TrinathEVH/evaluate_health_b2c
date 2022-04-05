import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../theme';

function CardView(props) {
    return (
        <View style={[styles.dataContainer, props.style]}>
            <View style={{padding: 10}}>
                <View style={[styles.dataContainerBox, props.dataBox]}>
                    <View style={styles.subHeading}>
                        <Text
                            style={[
                                {
                                    textAlign: 'left',
                                    fontSize: 18,
                                    fontWeight: '500',
                                },
                                props.headingTextStyle,
                            ]}>
                            {props.heading}
                        </Text>
                    </View>
                    {props.children}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dataContainer: {
        backgroundColor: Color.white,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    dataContainerBox: {
        borderWidth: 1,
        borderColor: Color.textColor,
        padding: 15,
        minHeight: 130,

    },
    subHeading: {
        position: 'absolute',
        top: -13,
        left: 15,
        backgroundColor: Color.white,
        paddingRight: 7,
        paddingLeft: 7,
        //fontWeight:'500'
    },
});

export default CardView;
