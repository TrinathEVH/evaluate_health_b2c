import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import {Color,Strings} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputBox from '../../components/UserInput/inputBox';

class BasicProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName:'',
            patientNameError:false,
            patientNAmeErrorMessage:'',
            gender:'',
            genderError:false,
            genderErrorMessage:'',
            dob:'',
            dobError:false,
            dobErrorMessage:'',
            maritalStatus:'',
            maritalStatusError:false,
            maritalStatusErrorMessage:'',
            height:'',
            heightError:false,
            heightErrorMessage:'',

        };
    }
    async componentDidMount() {
        if (userData !== null) {
            this.setState({user: user});
        }
        if (data !== undefined && data !== null) {
            this.setState({image: data, uploadImage: data});
        }
    }

    render() {
        const {userData, onPress, isEditShow} = this.props;
        return (
            // <View style={styles.withoutContainer}></View>
            <ScrollView>
                <Text style={styles.headingTextStyle}>Basic Information</Text>
                <View style={styles.socialImages}>
                    {/* <View style={styles.nameStyle}>
                        <Text style={styles.designationText}>Name :</Text>
                        <Text style={styles.designationText}>
                            {' '}{userData.user_name}{','}{userData.gender}{','}{userData.age}
                        </Text>
                    </View> */}


                    <View style={[styles.textField, {paddingTop: 10}]}>
                        <Text style={styles.labelTextStyle}>
                            Name
                        </Text>
                        <InputBox
                            placeholder={Strings.patientName}
                            error={this.state.patientNameError}
                            value={this.state.patientName}
                            errorMessage={this.state.patientNameErrorMessage}
                            maxLength={150}
                            onChangeText={(patientName) => {
                                this.setState({patientName});
                                this.resetState();
                            }}
                        />
                    </View>
                    <View style={[styles.textField, {paddingTop: 10}]}>
                        <Text style={styles.labelTextStyle}>
                            Gender
                        </Text>
                        <InputBox
                            placeholder={Strings.gender}
                            error={this.state.genderError}
                            value={this.state.gender}
                            errorMessage={this.state.genderErrorMessage}
                            maxLength={150}
                            onChangeText={(gender) => {
                                this.setState({gender});
                                this.resetState();
                            }}
                        />
                    </View>
                    <View style={[styles.textField, {paddingTop: 10}]}>
                        <Text style={styles.labelTextStyle}>
                            Date of Birth
                        </Text>
                        <InputBox
                            placeholder={Strings.dob}
                            error={this.state.dobError}
                            value={this.state.dob}
                            errorMessage={this.state.dobErrorMessage}
                            maxLength={150}
                            onChangeText={(dob) => {
                                this.setState({dob});
                                this.resetState();
                            }}
                        />
                    </View>
                    <View style={[styles.textField, {paddingTop: 10}]}>
                        <Text style={styles.labelTextStyle}>
                            Marital Status
                        </Text>
                        <InputBox
                            placeholder={Strings.maritalStatus}
                            error={this.state.maritalStatusError}
                            value={this.state.maritalStatus}
                            errorMessage={this.state.maritalStatusErrorMessage}
                            maxLength={150}
                            onChangeText={(maritalStatus) => {
                                this.setState({maritalStatus});
                                this.resetState();
                            }}
                        />
                    </View>
                    <View style={[styles.textField, {paddingTop: 10}]}>
                        <Text style={styles.labelTextStyle}>
                            Contact Number
                        </Text>
                        <InputBox
                            placeholder={Strings.height}
                            error={this.state.heightError}
                            value={this.state.height}
                            errorMessage={this.state.heightErrorMessage}
                            maxLength={150}
                            onChangeText={(height) => {
                                this.setState({height});
                                this.resetState();
                            }}
                        />
                    </View>

                </View>

            </ScrollView>


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

export default BasicProfileModal;
