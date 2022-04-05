import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../theme/Color';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import {BASE_URL} from '../../axios/API';
import PropTypes from 'prop-types';

class ProfileSliderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            user: null,
        };
    }

    // Trinath...
    // 1. First Name of the user to be visible...
    // 2. Add new Item should not be Scrollable... I mean.. Other items can be  scrolled and it will pass

    async componentDidMount() {
        let user = await getUserDetails();
        if (user !== undefined && user !== null && user !== '') {
            this.setState({user: user});
            let userList = user.child_members;
            let userObj = {
                member_eh_id: user.user_id,
                user_name: user.user_name,
                profile_image: user.profile_image,
            };
            // Trinath... As of now..shifted that add member to left... so it will be scrollable to this side..
            // Lets not add the profile image or change the icon now... will test by adding many profiles then will will finalize to keep within the list or not
            // let newUserObj = {
            //     member_eh_id: null,
            //     user_name: 'Add New',
            //     profile_image:
            //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OyYafdU1u0_0mo4bd9ekajyLU0UfTLhsNw&usqp=CAU',
            // };
            userList.unshift(userObj);
            // userList.unshift(newUserObj);
            this.setState({profileData: userList});
        }
    }

    onClickFetchUser = (user) => {
        const navigateObj = {
            user: user,
        };
        this.setState(
            {
                user: user,
            },
            () => {
                this.props.userData(navigateObj);
            },
        );
    };

    render() {
        const {profileData} = this.state;
        return (
            <View style={styles.sliderContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{paddingLeft: 10}}>
                    {profileData && profileData.map((item, index) => {
                        let name = item.user_name.split(' ');
                        return (
                            <View style={styles.categoryDetailsContainer} key={index}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.onClickFetchUser(item)}>
                                    <View style={styles.categoryContainer}>
                                        <NeomorphBlur
                                            style={{
                                                backgroundColor: Color.primaryNeo,
                                                width: 46,
                                                height: 46,
                                                shadowRadius: 2,
                                                shadowOffset: {width: 2, height: 2},
                                                borderRadius: 100,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <NeomorphBlur
                                                inner
                                                style={{
                                                    backgroundColor: Color.primaryNeo,
                                                    width: 43,
                                                    height: 43,
                                                    shadowRadius: 2,
                                                    shadowOffset: {width: -2, height: -2},
                                                    borderRadius: 100,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Image source={{
                                                    uri: item.profile_image
                                                        ? BASE_URL + item.profile_image
                                                        : 'https://i.imgur.com/UYiroysl.jpg',
                                                }}
                                                       style={{
                                                           height: 40,
                                                           width: 40,
                                                           borderRadius: 100,
                                                       }}
                                                />
                                            </NeomorphBlur>
                                        </NeomorphBlur>
                                        <Text numberOfLines={1} style={styles.catTitle}>
                                            {name ? name[0] : ''}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

ProfileSliderList.propTypes = {
    userData: PropTypes.func,
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: 73,
        //width: 70,
        marginTop: 2,
        marginBottom: 2,
        paddingTop: 2,
        paddingBottom: 2,
        // backgroundColor: Color.yellow,
    },
    categoryContainer: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryDetailsContainer: {
        marginLeft: -9,
        paddingHorizontal: 2,
    },
    catTitle: {
        color: Color.black,
        fontSize: 13,
        height: 20,
        fontWeight: '500',
        paddingHorizontal: 5,
        textAlign: 'center',
        // backgroundColor: Color.yellow,
    },
});

export default ProfileSliderList;
