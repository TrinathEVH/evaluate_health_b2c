import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../theme';
import {BASE_URL} from '../../axios/API';

class UserImagesShow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {item} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.userImage}
                        source={{uri: BASE_URL + item.face_url}}
                    />
                </View>
                <Text style={styles.nameStyle}>{item.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    imageContainer: {
        borderRadius: 100,
        height: 70,
        width: 70,
        borderWidth: 1.5,
        borderColor: Color.colorPrimary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    userImage: {
        height: 70,
        width: 70,
        borderRadius: 100,
    },
    nameStyle: {
        textAlign: 'left',
    },
});

export default UserImagesShow;
