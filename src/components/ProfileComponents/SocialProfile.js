import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import NewSocialImageContainer from './NewSocialImageContainer';

class SocialProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
        };
    }

    render() {
        const {userData, user, qrCodePress, addMemberPress} = this.props;
        return (
            
            <View style={styles.container}>
                
                <NewSocialImageContainer userData={userData} user={user} qrCodePress={qrCodePress} addMemberPress={addMemberPress}/>
                
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

    },
    scrollView: {
        flexDirection: 'column',
        flexGrow: 1,
    },
});

export default SocialProfile;
