import React, {Component} from 'react';
import {Color} from '../../theme';
import {Image, StyleSheet, Text, View} from 'react-native';

class NewPersonalImageSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: 'data:image/png;base64,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'}}
                    />
                    <View>
                        <Image
                            style={styles.arrowImage}
                            source={require('../../assets/images/right-arrow.png')}
                        />
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Own</Text>
                    </View>
                    <Image
                        style={styles.profileImage}
                        source={{uri: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'}}
                    />
                </View>
                <View style={styles.codeContainer}>
                    <View style={styles.textContainer}>
                        <Image
                            style={styles.qrImage}
                            source={{uri: 'https://blog.hubspot.com/hs-fs/hub/53/file-2457427390-jpg/00-Blog_Thinkstock_Images/qr-code.jpg?width=381&name=qr-code.jpg'}}
                        />
                        <Text style={styles.profileName}>
                            test
                        </Text>
                    </View>
                </View>
                <View style={styles.organoImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{}}
                    />
                    <View>
                        <Image
                            style={styles.arrowImage}
                            source={require('../../assets/images/right-arrow.png')}
                        />
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Wife</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.profileImage}
                            source={{uri: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'}}
                        />
                        <View style={styles.textContainer}>
                            <Image
                                style={styles.qrImage}
                                source={{uri: 'https://blog.hubspot.com/hs-fs/hub/53/file-2457427390-jpg/00-Blog_Thinkstock_Images/qr-code.jpg?width=381&name=qr-code.jpg'}}
                            />
                            <Text style={styles.profileName}>
                                test
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.organoImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{}}
                    />
                    <View>
                        <Image
                            style={styles.arrowImage}
                            source={require('../../assets/images/right-arrow.png')}
                        />
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Son</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.profileImage}
                            source={{uri: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'}}
                        />
                        <View style={styles.textContainer}>
                            <Image
                                style={styles.qrImage}
                                source={{uri: 'https://blog.hubspot.com/hs-fs/hub/53/file-2457427390-jpg/00-Blog_Thinkstock_Images/qr-code.jpg?width=381&name=qr-code.jpg'}}
                            />
                            <Text style={styles.profileName}>
                                test
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
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
        marginTop: 35,
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    organoImageContainer: {
        marginBottom: 3,
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 130,
    },
    profileImage: {
        height: 70,
        width: 70,
        borderWidth: 5,
        borderRadius: 100,
        borderColor: Color.white,
    },
    arrowImage: {
        width: 100,
        height: 20,
    },
    indicatorArrowImage: {
        width: 150,
        height: 20,
    },
    codeContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 25,
        marginTop: 5,
    },
    textContainer: {
        flex: 0.5,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    profileName: {
        fontSize: 20,
        color: Color.profileTextColor,
    },
    qrContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20,
        marginTop: -40,
    },
    qrImage: {
        height: 40,
        width: 40,
        marginRight: 5,
    },
    textStyle: {
        color: Color.borderColor,
        fontSize: 18,
        fontWeight: '700',
    },
});

export default NewPersonalImageSection;
