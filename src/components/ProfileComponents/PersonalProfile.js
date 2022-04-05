import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import NewPersonalImageSection from './NewPersonalImageSection';

class PersonalProfile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NewPersonalImageSection/>
                {/*<FamilyMemberProfile/>*/}
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

export default PersonalProfile;
