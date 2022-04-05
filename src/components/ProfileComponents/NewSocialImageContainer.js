import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import {Color} from '../../theme';
import {BASE_URL} from '../../axios/API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardA from '../../components/Card/card_a';
class NewSocialImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {userData, user, qrCodePress, addMemberPress} = this.props;
        return (
            // <View style={styles.container}>
            <CardA>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: BASE_URL + userData.aadhar.face_url}}
                    />
                </View>
                <View style ={styles.profileNameQr}>
                <View style = {{flex: 0.25}}>
                <TouchableOpacity activeOpacity={1} onPress={qrCodePress} style={styles.qrContainer}>
                    <Image
                        style={styles.qrImage}
                        source={{uri: BASE_URL + userData.qr_code_url}}
                    />
                    {/* <Text style={styles.textStyle}>Scan Code</Text> */}
                </TouchableOpacity>
                </View>
                <View style = {{flex: 0.50}}>
                <View style={styles.codeContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.profileName}>
                            {userData.user_name}
                        </Text>
                        <Text style={styles.profileName}>
                            {userData.mobileno}
                        </Text>
                    </View>
                </View>
                </View>
                <View style = {{flex: 0.25}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={addMemberPress}
                        style={styles.addIconContainer}>
                        <Icon
                            name='account-multiple-plus'
                            size={50}
                            color={Color.textColor}
                            style={{textAlign: 'right'}}
                        />
                    </TouchableOpacity>
                <View style={styles.codeContainer}>
                    
                </View>
                </View>
                </View>
                </CardA>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        margin: 5,
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 5,
    },
    backGroundContainer: {
        height: 130,
        top: 0,
    },
    backImage: {
        height: 150,
        width: '100%',
    },
    imageContainer: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: 150,
        width: 150,
        borderWidth: 1.5,
        borderRadius: 100,
        borderColor: Color.colorPrimaryDark,
    },
    codeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        paddingBottom: 10,
        
    },
    profileName: {
        fontSize: 20,
        color: Color.profileTextColor,
        
    },
    qrContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 10,
        // marginBottom: 0,
    },
    qrImage: {
        height: 50,
        width: 50,
        // marginRight: 30,
    },
    profileNameQr:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
    },

    textStyle: {
        color: Color.borderColor,
        fontSize: 18,
        fontWeight: '700',
    },
    addIconContainer: {
        right: 10,
        position: 'absolute',
    },
});

export default NewSocialImageContainer;
