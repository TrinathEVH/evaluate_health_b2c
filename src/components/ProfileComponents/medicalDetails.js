import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color, Strings} from '../../theme';
import TextBox from '../UserInput/textView';
import IconPlus from 'react-native-vector-icons/FontAwesome5';
import {updateMedicalDetailsData} from '../../axios/ServerRequest';
import {logout} from '../../utils/LocalStorage';
import ErrorHandler from '../../utils/ErrorHandler';
import CardA from '../../components/Card/card_a';
class MedicalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBloodGroupClick: false,
            isHealthIssuesClick: false,
            userData: null,
            isDisabilityCLick: false,
            isAllergiesCLick: false,
            isIdentificationCLick: false,
            nameError: false,
            nameErrorMessage: '',
            ageError: false,
            ageErrorMessage: '',
            genderError: false,
            genderErrorMessage: '',
            stateExpanded: false,
            rowsToDisplay: 2,
            bloodGroup: '',
            allergy: [],
            diseases: [],
            disability: [],
            identification: [],
        };
    }

    componentDidMount() {
        const {userData} = this.props;
        console.log(userData.blood_group, "+++++++++++++++++++blood_group")
        this.setState({
            userData: userData,
            bloodGroup: userData.blood_group,
            allergy: userData.allergy_list,
            diseases: userData.disease_list,
            disability: userData.splcond_list,
            identification: userData.identification_mark,
        });
    }

    editClick = (editType) => {
        switch (editType) {
            case 'blood' :
                this.setState({
                    isBloodGroupClick: true,
                    isHealthIssuesClick: false,
                    isDisabilityCLick: false,
                    isAllergiesCLick: false,
                    isIdentificationCLick: false,
                });
                break;
            case 'health' :
                this.setState({
                    isBloodGroupClick: false,
                    isHealthIssuesClick: true,
                    isDisabilityCLick: false,
                    isAllergiesCLick: false,
                    isIdentificationCLick: false,
                });
                break;
            case 'disability' :
                this.setState({
                    isBloodGroupClick: false,
                    isHealthIssuesClick: false,
                    isDisabilityCLick: true,
                    isAllergiesCLick: false,
                    isIdentificationCLick: false,
                });
                break;
            case 'allergy' :
                this.setState({
                    isBloodGroupClick: false,
                    isHealthIssuesClick: false,
                    isDisabilityCLick: false,
                    isAllergiesCLick: true,
                    isIdentificationCLick: false,
                });
                break;
            case 'identification' :
                this.setState({
                    isBloodGroupClick: false,
                    isHealthIssuesClick: false,
                    isDisabilityCLick: false,
                    isAllergiesCLick: false,
                    isIdentificationCLick: true,
                });
                break;
        }
    };

    // showMore(value) {
    //     const list = this.state[value].length;
    //     list > this.state.rowsToDisplay ? (
    //         this.setState({ rowsToDisplay: list, stateExpanded: true })
    //     ) : (
    //         this.setState({ rowsToDisplay: 2, stateExpanded: false })
    //     )
    // }

    // handleInputChange = (e, index, value) => {
    //     const list = this.state[value];
    //     list[index].value = String(e);
    //     const data = {}
    //     data[value] = list
    //     this.setState(data)
    // }

    // // handle click event of the Remove button
    // handleRemoveClick = (index, value) => {
    //     const list = this.state[value];
    //     list.splice(index, 1);
    //     const data = {}
    //     data[value] = list
    //     this.setState(data)
    // };

    // // handle click event of the Add button
    // handleAddClick = (type,value) => {
    //     this.editClick(type)
    //     const list = this.state[value];
    //     const data = {rowsToDisplay: this.state.rowsToDisplay + 1}
    //     data[value] = [...list, ''],
    //     this.setState(data)
    //     console.log(value,data,this.state.rowsToDisplay,"+++++++++++==rows")
    // };

    basicDataSave = (editData) => {
        this.setState({
            isBloodGroupClick: false,
            isHealthIssuesClick: false,
            isDisabilityCLick: false,
            isAllergiesCLick: false,
            isIdentificationCLick: false,
        });
        let data = {};
        const {bloodGroup, allergy, diseases, disability, identification} = this.state;
        switch (editData) {
            case 'blood':
                data = {
                    blood_group: bloodGroup
                };
                break;
            case 'health':
                data = {disease_list: diseases};
                break;
            case 'disability':
                data = {splcond_list: disability};
                break;
            case 'allergy':
                data = {allergy_list: allergy};
                break;
            case 'identification':
                data = {identification_mark: [identification]};
                break;
        }
        const self = this;
        updateMedicalDetailsData(data)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                }
                self.setState({loadingButton: false});
            }).catch((error) => {
            console.log(error.response);
            self.setState({loadingButton: false});
            if (error.response !== undefined && error.response.status === 401) {
                logout();
                self.props.navigation.replace('Login');
            }
            if (error.response !== undefined && error.response.status === 500) {
                self.showToast(ErrorHandler('Please Try After Sometime!!!'));
            }
        });
    };

    render() {
        const {bloodGroup, isBloodGroupClick, isHealthIssuesClick, isDisabilityCLick, isAllergiesCLick, isIdentificationCLick, allergy, diseases, disability, identification} = this.state;
        return (
            <View>
                <View style={styles.withoutContainer}>
                <CardA title={'Medical Information'}>
                    {/* <Text style={styles.headingTextStyle}>Medical Details</Text> */}
                    <View style={styles.socialImages}>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    <Text style={styles.subHeadingStyle}>Blood Group : </Text>
                                </View>

                                <View style={{flex: 1}}>
                                    {isBloodGroupClick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('blood')}>
                                        <IconPlus
                                            name={'check-circle'}
                                            size={35}
                                            color={Color.seagreen}
                                            // style={{ top: 3, left: 10 }}
                                        />
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isBloodGroupClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <TextBox
                                                    placeholder={Strings.bloodgroup}
                                                    error={this.state.nameError}
                                                    value={bloodGroup}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(bloodGroup) => this.setState({bloodGroup})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('blood')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Blood Group : {bloodGroup}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    <Text style={styles.subHeadingStyle}>Health Issues : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isHealthIssuesClick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('health')}>
                                        <IconPlus
                                            name={'check-circle'}
                                            size={35}
                                            color={Color.seagreen}
                                            // style={{ top: 3, left: 10 }}
                                        />
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isHealthIssuesClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <TextBox
                                                    placeholder={Strings.diseases}
                                                    error={this.state.nameError}
                                                    value={diseases}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(diseases) => this.setState({diseases})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('health')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Health Issues : {diseases}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    <Text style={styles.subHeadingStyle}>Disability : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isDisabilityCLick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('disability')}>
                                        <IconPlus
                                            name={'check-circle'}
                                            size={35}
                                            color={Color.seagreen}
                                            // style={{ top: 3, left: 10 }}
                                        />
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isDisabilityCLick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <TextBox
                                                    placeholder={Strings.disability}
                                                    error={this.state.nameError}
                                                    value={disability}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(disability) => this.setState({disability})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('disability')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Disability : {disability}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    <Text style={styles.subHeadingStyle}>Allergies : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isAllergiesCLick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('allergy')}>
                                        <IconPlus
                                            name={'check-circle'}
                                            size={35}
                                            color={Color.seagreen}
                                            // style={{ top: 3, left: 10 }}
                                        />
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isAllergiesCLick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>

                                                <TextBox
                                                    placeholder={Strings.allergy}
                                                    error={this.state.nameError}
                                                    value={allergy}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(allergy) => this.setState({allergy})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('allergy')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Allergies : {allergy}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    <Text style={styles.subHeadingStyle}>Identification Marks : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isIdentificationCLick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('identification')}>
                                        <IconPlus
                                            name={'check-circle'}
                                            size={35}
                                            color={Color.seagreen}
                                            // style={{ top: 3, left: 10 }}
                                        />
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isIdentificationCLick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>

                                                <TextBox
                                                    placeholder={Strings.identification}
                                                    error={this.state.nameError}
                                                    value={identification}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(identification) => this.setState({identification})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('identification')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Identification Marks
                                                : {identification}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                </View>
                            </View>
                        </View>
                    </View>
                    </CardA>
                </View>
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
        fontWeight: "bold",
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
    subHeadingStyle: {
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
    textField: {
        display: 'flex',
        flexDirection: 'row',
    },
    textLabel: {
        fontSize: 14,
        fontWeight: '400',
        color: Color.colorPrimaryDark,
    }
});

export default MedicalDetails;
