import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class BasicInformation extends Component {
    render() {
        const {userData, onPress, isEditShow} = this.props;
        return (
            <View style={isEditShow ? styles.container : styles.withoutContainer}>
                <Text style={styles.headingTextStyle}>Basic Information</Text>
                <View style={styles.socialImages}>
                    <View style={styles.nameStyle}>
                        <Text style={styles.designationText}>Name :</Text>
                        <Text style={styles.nameText}>
                            {' '}{userData.name}
                        </Text>
                    </View>
                    {userData.uid_type === 'aadhar'
                        ?
                        <View style={styles.designationStyle}>
                            <Text style={styles.designationText}>
                                Aadhar Number : {userData.aadhar_number}
                            </Text>
                        </View>
                        :
                        <View style={styles.designationStyle}>
                            <Text style={styles.designationText}>
                                PAN Number : {userData.pan_number}
                            </Text>
                        </View>

                    }
                    <View style={styles.designationStyle}>
                        <Text style={styles.designationText}>
                            DOB : {userData.date_of_birth}
                        </Text>
                    </View>
                    {userData.uid_type === 'aadhar'
                        ?
                        <View style={styles.designationStyle}>
                            <Text style={styles.designationText}>
                                Gender : {userData.gender}
                            </Text>
                        </View>
                        :
                        null
                    }
                    <View style={{paddingBottom: 25}}/>
                </View>
                {isEditShow
                    ?
                    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.editButtonContainer}>
                        <Icon
                            name='pencil'
                            size={24}
                            color={Color.textColor}
                            style={{textAlign: 'right'}}
                        />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        borderRadius: 7,
        margin: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 5,
    },
    withoutContainer: {
        backgroundColor: Color.white,
        width: '100%',
    },
    headingTextStyle: {
        fontSize: 20,
        color: Color.textColor,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 10,
    },
    nameStyle: {
        paddingBottom: 5,
        paddingLeft: 15,
        paddingTop: 5,
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 20,
        fontWeight: '600',
        color: Color.colorPrimaryDark,
    },
    designationStyle: {
        paddingBottom: 3,
        paddingLeft: 15,
        paddingTop: 2,
    },
    iconContainerStyle: {},
    designationText: {
        fontSize: 18,
        fontWeight: '400',
        color: Color.textColor,
    },
    subHeadingTextStyle: {
        fontSize: 18,
        color: Color.textColor,
        paddingTop: 2,
        paddingLeft: 20,
        paddingBottom: 10,
    },
    socialImages: {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderColor: Color.borderColor,
    },
    iconInnerContainer: {
        borderRadius: 15,
        borderWidth: 0.7,
        borderColor: Color.borderColor,
        height: 60,
        width: 60,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: {
        height: 50,
        width: 50,
    },
    editButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
    },

});

export default BasicInformation;
