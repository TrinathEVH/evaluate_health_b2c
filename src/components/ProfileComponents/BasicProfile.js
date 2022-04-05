import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color, Strings} from '../../theme';
import TextBox from '../UserInput/textView';
import IconPlus from 'react-native-vector-icons/FontAwesome5';
import RadioGroup from '../RadioGroup';
import {updateUserProfileData} from '../../axios/ServerRequest';
import {logout} from '../../utils/LocalStorage';
import ErrorHandler from '../../utils/ErrorHandler';
import CardA from '../../components/Card/card_a';
class BasicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPhysiqueClick: false,
            isContactClick: false,
            isEmailClick: false,
            userData: null,
            date_of_birth: null,
            mobileno: null,
            email_id: null,
            isProfessionClick: false,
            isStressClick: false,
            isIdentityClick: false,
            isAddressClick: false,
            nameError: false,
            userName: '',
            nameErrorMessage: '',
            age: '',
            gender: '',
            ageError: false,
            ageErrorMessage: '',
            genderError: false,
            genderErrorMessage: '',
            height: '',
            weight: '',
            profession: '',
            salary: '',
            address_primary: '',
            street1: '',
            street2: '',
            city: '',
            pincode: '',
            state: '',
            country: '',
            rowsToDisplay: 1,
            stateExpanded: false,
            alternateMobileno: [],
            alternateEmail: [],
            genderTypes: [
                {
                    value: 'male',
                    label: 'Male',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
                {
                    value: 'female',
                    label: 'Female',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
                {
                    value: 'others',
                    label: 'Others',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
            ],
            maritalStatus: [
                {
                    value: 'single',
                    label: 'Single',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
                {
                    value: 'married',
                    label: 'Married',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
                {
                    value: 'divorced',
                    label: 'Divorced',
                    selected: false,
                    color: Color.colorPrimaryDark,
                },
            ],
            bmi: 0,
            updateList: [],
            modifiedList: [],
            addressSecondary: [],
        };
    }

    componentDidMount() {
        const {userData} = this.props;
        let genderTypes = this.state.genderTypes;
        let maritalStatus = this.state.maritalStatus;
        let alternateMobileno = [];
        let alternateEmail = [];
        userData.alternate_mobileno.forEach(element => {
            alternateMobileno.push(element.value)
        });
        userData.alternate_email_id.forEach(element => {
            alternateEmail.push(element.value)
        });
        let gender = genderTypes.find(item => item.value === userData.gender);
        if (gender !== undefined) {
            gender.selected = true;
        }
        let marital = maritalStatus.find(item => item.value === userData.marital_status);
        if (marital !== undefined) {
            marital.selected = true;
        }
        this.setState({
            userData: userData,
            date_of_birth: userData.date_of_birth,
            mobileno: userData.mobileno,
            email_id: userData.email_id,
            userName: userData.user_name,
            age: userData.age,
            genderTypes: (gender && gender.value) || genderTypes,
            maritalStatus: (marital && marital.value) || maritalStatus,
            height: userData.height.value,
            weight: userData.weight.value,
            bmi: userData.bmi,
            profession: userData.profession,
            salary: userData.salary,
            address_primary: userData.address_primary,
            street1: userData.address_primary.street1,
            street2: userData.address_primary.street2,
            city: userData.address_primary.city,
            pincode: userData.address_primary.pincode,
            state: userData.address_primary.state,
            country: userData.address_primary.country,
            alternateMobileno: alternateMobileno,
            alternateEmail: alternateEmail,
            addressSecondary: userData.address_secondary,
        });
    }

    editClick = (editType) => {
        switch (editType) {
            case 'identity':
                this.setState({
                    isIdentityClick: true,
                    isPhysiqueClick: false,
                    isProfessionClick: false,
                    isStressClick: false,
                    isContactClick: false,
                    isEmailClick: false,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'physique':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: true,
                    isProfessionClick: false,
                    isStressClick: false,
                    isContactClick: false,
                    isEmailClick: false,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'profession':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: false,
                    isProfessionClick: true,
                    isStressClick: false,
                    isContactClick: false,
                    isEmailClick: false,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'stress':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: false,
                    isProfessionClick: false,
                    isStressClick: true,
                    isContactClick: false,
                    isEmailClick: false,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'contact':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: false,
                    isProfessionClick: false,
                    isStressClick: false,
                    isContactClick: true,
                    isEmailClick: false,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'email':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: false,
                    isProfessionClick: false,
                    isStressClick: false,
                    isContactClick: false,
                    isEmailClick: true,
                    isAddressClick: false,
                    updateList: [],
                    modifiedList: [],
                });
                break;
            case 'address':
                this.setState({
                    isIdentityClick: false,
                    isPhysiqueClick: false,
                    isProfessionClick: false,
                    isStressClick: false,
                    isContactClick: false,
                    isEmailClick: false,
                    isAddressClick: true,
                    updateList: [],
                    modifiedList: [],
                });
                break;
        }
    };

    showMore(value) {
        const list = this.state[value].length;
        list > this.state.rowsToDisplay ? (
            this.setState({rowsToDisplay: list, stateExpanded: true})
        ) : (
            this.setState({rowsToDisplay: 1, stateExpanded: false})
        )
    }

    handleInputChange = (e, index, value) => {
        console.log(e, index, value)
        const list = this.state[value];
        let modifiedList = this.state.modifiedList;
        let selectedValue = modifiedList.find((item) => item.index === index);
        if (selectedValue === undefined) {
            modifiedList.push({'index': index, 'value': list[index]})
        }
        console.log(selectedValue, "+++++++++++++++++++++=")
        console.log(list, "===============lllllllllllll")
        list[index] = String(e);
        const data = {}
        data[value] = list
        this.setState(data)
    }

    // handle click event of the Remove button
    handleRemoveClick = (index, value) => {
        // this.editClick(type)
        // console.log(index, value)
        let list = this.state[value];
        let updateList = this.state.updateList;
        let data = {}
        let updateData = {'value': '', 'active': 0}
        updateData['value'] = list[index]
        updateList.push(updateData)
        data['updateList'] = updateList
        list.splice(index, 1);
        data[value] = list
        this.setState(data)
    };

    // handle click event of the Add button
    handleAddClick = (type, value) => {
        this.editClick(type)
        const list = this.state[value];
        const data = {rowsToDisplay: this.state.rowsToDisplay + 1}
        data[value] = [...list, ''];
        this.setState(data);
    };

    onPress = (value, type, field) => {
        this.editClick(type)
        console.log(this.state.genderTypes, "+++++++++++++++")
        console.log(value, type, field)
        let selected = value.find((item) => item.selected === true);
        let data = {}
        data[field] = selected.value
        this.setState(data);
    };

    calculateBmi = (value, type) => {
        let data = {}
        console.log(value, type, "************************")
        data[type] = value
        let weight = this.state.weight
        let height = this.state.height
        height = type === 'height' ? value : height
        weight = type === 'weight' ? value : weight
        let bmi = 0
        if (weight > 0 && height > 0) {
            bmi = (weight / height / height) * 10000
            data['bmi'] = bmi
        }
        this.setState(data);
    };

    basicDataSave = (editData) => {
        this.setState({
            isIdentityClick: false,
            isPhysiqueClick: false,
            isProfessionClick: false,
            isStressClick: false,
            isContactClick: false,
            isEmailClick: false,
            isAddressClick: false
        });
        let data = {};
        const {date_of_birth, mobileno, email_id, genderTypes, alternateMobileno, updateList, modifiedList, alternateEmail, profession, salary, street1, street2, city, pincode, state, country, height, weight, bmi, maritalStatus} = this.state;
        let modifiedData = []
        switch (editData) {
            case 'identity':
                data = {
                    date_of_birth: date_of_birth,
                    gender: genderTypes,
                    marital_status: maritalStatus
                };
                break;
            case 'email':
                if (modifiedList.length > 0) {
                    modifiedList.forEach(function (val) {
                        modifiedData.push({'value': val.value, 'active': 0})
                        modifiedData.push({'value': alternateEmail[0], 'active': 0})
                    })
                }
                modifiedData.concat(updateList)
                data = {
                    email_id: email_id,
                };
                if (modifiedList.length > 0) {
                    data['alternate_email_id'] = modifiedData
                }
                break;
            case 'address':
                data = {
                    address_primary: {
                        street1: street1,
                        street2: street2,
                        city: city,
                        pincode: pincode,
                        state: state,
                        country: country,
                    }
                };
                break;
            case 'profession':
                data = {profession: profession, salary: salary};
                break;
            case 'contact':
                if (modifiedList.length > 0) {
                    modifiedList.forEach(function (val) {
                        modifiedData.push({'value': val.value, 'active': 0})
                        modifiedData.push({'value': alternateMobileno[0], 'active': 1})
                    });
                }
                modifiedData.concat(updateList)
                data = {
                    mobileno: mobileno,
                };
                if (modifiedList.length > 0) {
                    data['alternate_mobileno'] = modifiedData
                }
                break;
            case 'physique':
                data = {height: height, weight: weight, bmi: bmi};
                break;
        }
        const self = this;
        updateUserProfileData(data)
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
        const {date_of_birth, mobileno, email_id, userName, bmi, genderTypes, height, alternateMobileno, alternateEmail, profession, street1, street2, city, pincode, state, country, salary, weight, isPhysiqueClick, isAddressClick, isContactClick, isEmailClick, isIdentityClick, isProfessionClick, isStressClick, maritalStatus} = this.state;
        return (
            <View>
                <View style={styles.withoutContainer}>
                <CardA title={'Basic Information'}>
                    {/* <Text style={styles.headingTextStyle}>Basic Information</Text> */}
                    <View style={styles.socialImages}>
                        <View style={{flexDirection: 'column', flex: 8}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.subHeadingStyle}>Identity : </Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {isIdentityClick
                                    &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('identity')}>
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
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.90}}>
                                    {isIdentityClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>Name:</Text>
                                                <TextBox
                                                    placeholder={Strings.nameHint}
                                                    error={this.state.nameError}
                                                    value={userName}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(userName) => this.setState({userName})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('identity')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Name : {userName}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 0.10}}>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.90}}>
                                    {isIdentityClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>DOB:</Text>
                                                <TextBox
                                                    placeholder={Strings.dob}
                                                    error={this.state.nameError}
                                                    value={date_of_birth}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(date_of_birth) => this.setState({date_of_birth})}
                                                />
                                            </View>

                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('identity')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>DOB : {date_of_birth}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 0.10}}>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.90}}>
                                {isIdentityClick
                                    ? 
                                    null
                                    :
                                    ( <RadioGroup
                                        radioButtons={this.state.genderTypes}
                                        onPress={(e) => this.onPress(e, 'identity', 'genderTypes')}
                                        flexDirection="row"
                                    />
                                    )
                                    // (<TouchableOpacity activeOpacity={1}
                                    //     onPress={() => this.editClick('identity')}
                                    //     style={styles.designationStyle}>
                                    //     <Text style={styles.designationText}>Gender : {this.state.genderTypes.value}</Text>
                                    // </TouchableOpacity>)
                                } 
                                </View>  
                                <View style={{flex: 0.10}}/>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.90}}>
                                    <RadioGroup
                                        radioButtons={this.state.maritalStatus}
                                        onPress={(e) => this.onPress(e, 'identity', 'maritalStatus')}
                                        flexDirection="row"
                                    />
                                    {/* {isIdentityClick*/}
                                    {/*    ?*/}
                                    {/*    (<View>*/}
                                    {/*       */}

                                    {/*    </View>)*/}
                                    {/*    :*/}
                                    {/*    (<TouchableOpacity activeOpacity={1}*/}
                                    {/*        onPress={() => this.editClick('identity')}*/}
                                    {/*        style={styles.designationStyle}>*/}
                                    {/*        <Text style={styles.designationText}>Marital Status : </Text>*/}
                                    {/*    </TouchableOpacity>)*/}
                                    {/*} */}
                                </View>
                                <View style={{flex: 0.10}}/>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 4, flexDirection: "row"}}>
                                <View style={{flex: 3}}>
                                    <Text style={styles.subHeadingStyle}>Physique : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isPhysiqueClick &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('physique')}>
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
                            <View style={{flex: 4, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 2}}>
                                    {isPhysiqueClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>Height:</Text>
                                                <TextBox
                                                    placeholder={Strings.height}
                                                    error={this.state.nameError}
                                                    value={height}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(height) => this.calculateBmi(height, 'height')}
                                                />
                                                <Text style={styles.textLabel}>in cms</Text>
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('physique')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Height - {height} cms</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 2}}>
                                    {isPhysiqueClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>Weight:</Text>
                                                <TextBox
                                                    placeholder={Strings.weight}
                                                    error={this.state.nameError}
                                                    value={weight}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(weight) => this.calculateBmi(weight, 'weight')}
                                                />
                                                <Text style={styles.textLabel}>in kgs</Text>
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('physique')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>Weight - {weight.value} kgs</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                            </View>
                            <View style={{flex: 4, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 3}}>
                                    <View style={styles.designationStyle}>
                                        <Text style={styles.designationText}>BMI - {bmi}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1}}/>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.subHeadingStyle}>Contact : </Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {isContactClick &&
                                        <TouchableOpacity onPress={() => this.basicDataSave('contact')}>
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
                            <View style={{flex: 3, flexDirection: "row"}}>
                                <View style={{flex: 2}}>
                                    {isContactClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <TextBox
                                                    placeholder={Strings.enterMobile}
                                                    error={this.state.nameError}
                                                    value={mobileno}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(mobileno) => this.setState({mobileno})}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('contact')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>{mobileno}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 1}}/>
                            </View>
                            {alternateMobileno.slice(0, this.state.rowsToDisplay).map((contNum, i) => {
                                return (
                                        <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                            <View style={{flex: 2}}>
                                                {isContactClick
                                                    ?
                                                    (<View style={styles.textField}>
                                                        <View style={{width: '90%'}}>
                                                            <TextBox
                                                                placeholder={Strings.enterMobile}
                                                                error={this.state.nameError}
                                                                value={contNum}
                                                                errorMessage={this.state.nameErrorMessage}
                                                                onChangeText={(e) => this.handleInputChange(e, i, 'alternateMobileno')}
                                                                keyboardType="numeric"
                                                            />
                                                        </View>
                                                    </View>)
                                                    :
                                                    (<TouchableOpacity activeOpacity={1}
                                                                       onPress={() => this.editClick('contact')}
                                                                       style={styles.designationStyle}>
                                                        <Text style={styles.designationText}>{contNum}</Text>
                                                    </TouchableOpacity>)
                                                }
                                            </View>
                                            <View style={{flex: 1}}>
                                                <View style={{flexDirection: 'column', flex: 4}}>
                                                    <View style={{flex: 4, flexDirection: "row"}}>
                                                        {alternateMobileno.length !== 1 &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.handleRemoveClick(i, 'alternateMobileno', 'contact')}>
                                                                <IconPlus
                                                                    name={'minus-circle'}
                                                                    size={30}
                                                                    color={Color.red}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {alternateMobileno.length - 1 === i &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.handleAddClick('contact', 'alternateMobileno')}>
                                                                <IconPlus
                                                                    name={'plus-circle'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {this.state.stateExpanded && alternateMobileno.length - 1 === i &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.showMore('alternateMobileno')}>
                                                                <IconPlus
                                                                    name={'chevron-circle-up'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {alternateMobileno.length > 0 && !this.state.stateExpanded &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.showMore('alternateMobileno')}>
                                                                <IconPlus
                                                                    name={'chevron-circle-down'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                );
                            })}
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 4}}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View style={{flex: .20}}>
                                    <Text style={styles.subHeadingStyle}>Email : </Text>
                                </View>
                                <View style={{flex: .80}}>
                                    {isEmailClick &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('email')}>
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
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: .90}}>
                                    {isEmailClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <TextBox
                                                    placeholder={Strings.emailHint}
                                                    error={this.state.nameError}
                                                    value={email_id}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(email_id) => this.setState({email_id})}
                                                    keyboardType="email-address"
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('email')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>{email_id}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: .10}}/>
                            </View>
                            {alternateEmail.slice(0, this.state.rowsToDisplay).map((email, i) => {
                                return (
                                        <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                            <View style={{flex: 2}}>
                                                {isEmailClick
                                                    ?
                                                    (<View style={styles.textField}>
                                                        <View style={{width: '90%'}}>
                                                            <TextBox
                                                                placeholder={Strings.emailHint}
                                                                error={this.state.nameError}
                                                                value={email}
                                                                errorMessage={this.state.nameErrorMessage}
                                                                onChangeText={(e) => this.handleInputChange(e, i, 'alternateEmail')}
                                                                keyboardType="email-address"
                                                            />
                                                        </View>

                                                    </View>)
                                                    :
                                                    (<TouchableOpacity activeOpacity={1}
                                                                       onPress={() => this.editClick('email')}
                                                                       style={styles.designationStyle}>
                                                        <Text style={styles.designationText}>{email}</Text>
                                                    </TouchableOpacity>)
                                                }
                                            </View>
                                            <View style={{flex: 1}}>
                                                <View style={{flexDirection: 'column', flex: 4}}>
                                                    <View style={{flex: 4, flexDirection: "row"}}>
                                                        {alternateEmail.length !== 1 &&
                                                        <View style={{flex: 1}}>

                                                            <TouchableOpacity
                                                                onPress={() => this.handleRemoveClick(i, 'alternateEmail', 'email')}>
                                                                <IconPlus
                                                                    name={'minus-circle'}
                                                                    size={30}
                                                                    color={Color.red}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {alternateEmail.length - 1 === i &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.handleAddClick('email', 'alternateEmail')}>
                                                                <IconPlus
                                                                    name={'plus-circle'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    style={{top: 3, left: 10}}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {this.state.stateExpanded && alternateEmail.length - 1 === i &&
                                                        <View style={{flex: 1}}>
                                                            <TouchableOpacity
                                                                onPress={() => this.showMore('alternateEmail')}>
                                                                <IconPlus
                                                                    name={'chevron-circle-up'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                        {alternateEmail.length > 0 && !this.state.stateExpanded &&
                                                        <View style={{flex: 1}}>

                                                            <TouchableOpacity
                                                                onPress={() => this.showMore('alternateEmail')}>
                                                                <IconPlus
                                                                    name={'chevron-circle-down'}
                                                                    size={30}
                                                                    color={Color.seagreen}
                                                                    // style={{ top: 3, left: 10 }}
                                                                />
                                                            </TouchableOpacity>

                                                        </View>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                );
                            }) }
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <View style={{flex: .80, flexDirection: "row"}}>
                                <View style={{flex: .40}}>
                                    <Text style={styles.subHeadingStyle}>Profession : </Text>
                                </View>
                                <View style={{flex: .60}}>
                                    {isProfessionClick &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('profession')}>
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
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.9}}>
                                    {isProfessionClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>Designation:</Text>
                                                <TextBox
                                                    placeholder={Strings.profession}
                                                    error={this.state.nameError}
                                                    value={profession}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(profession) => this.setState({profession})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('profession')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>{profession}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 0.1}}/>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.9}}>
                                    {isProfessionClick
                                        ?
                                        (<View style={styles.textField}>
                                            <View style={{width: '90%'}}>
                                                <Text style={styles.textLabel}>Salary:</Text>
                                                <TextBox
                                                    placeholder={Strings.salary}
                                                    error={this.state.nameError}
                                                    value={salary}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(salary) => this.setState({salary})}
                                                />
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('profession')}
                                                           style={styles.designationStyle}>
                                            <Text style={styles.designationText}>{salary}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={{flex: 0.1}}/>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <View style={{flex: .75, flexDirection: "row"}}>
                                <View style={{flex: .50}}>
                                    <Text style={styles.subHeadingStyle}>Stress Level : </Text>
                                </View>
                                <View style={{flex: .25}}/>
                            </View>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View style={{flex: .90}}>
                                    <Text style={styles.designationText}>Office : Low - Medium - High</Text>
                                </View>
                                <View style={{flex: .10}}/>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: .90}}>
                                    <Text style={styles.designationText}>Home : Low - Medium - High</Text>
                                </View>
                                <View style={{flex: 0.1}}/>
                            </View>

                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: 0.90}}>
                                    <Text style={styles.designationText}>Physical Activity : Low - Medium - High</Text>
                                </View>
                                <View style={{flex: 0.1}}/>
                            </View>
                        </View>
                        <View style={{paddingBottom: 25}}/>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View style={{flex: .80}}>
                                    <Text style={styles.subHeadingStyle}>Address : </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {isAddressClick &&
                                    <TouchableOpacity onPress={() => this.basicDataSave('address')}>
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
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                <View style={{flex: .90}}>
                                    {isAddressClick
                                        ?
                                        (<View style={{flexDirection: 'column'}}>
                                            <View style={[{width: '90%'}, styles.textField]}>
                                                <Text style={styles.textLabel}>Street:</Text>
                                                <TextBox
                                                    placeholder={Strings.addressHint}
                                                    error={this.state.nameError}
                                                    value={street1}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(street1) => this.setState({street1})}
                                                />
                                            </View>
                                            <View style={[{width: '90%'}, styles.textField]}>
                                                <Text style={styles.textLabel}>Street:</Text>
                                                <TextBox
                                                    placeholder={Strings.addressHint}
                                                    error={this.state.nameError}
                                                    value={street2}
                                                    errorMessage={this.state.nameErrorMessage}
                                                    onChangeText={(street2) => this.setState({street2})}
                                                />
                                            </View>
                                            <View style={{flexDirection: 'column', flex: 3, width: '90%'}}>
                                                <View style={{
                                                    flex: 9,
                                                    flexDirection: "row",
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={[{flex: 4}, styles.textField]}>
                                                        <Text style={styles.textLabel}>City:</Text>
                                                        <TextBox
                                                            placeholder={Strings.cityHint}
                                                            error={this.state.nameError}
                                                            value={city}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            onChangeText={(city) => this.setState({city})}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1}}/>
                                                    <View style={[{flex: 4}, styles.textField]}>
                                                        <Text style={styles.textLabel}>Pincode:</Text>
                                                        <TextBox
                                                            placeholder={Strings.zipHint}
                                                            error={this.state.nameError}
                                                            value={pincode}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            onChangeText={(pincode) => this.setState({pincode})}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'column', width: '90%', flex: 3}}>
                                                <View style={{
                                                    flex: 9,
                                                    flexDirection: "row",
                                                    justifyContent: 'space-around'
                                                }}>
                                                    <View style={[{flex: 4}, styles.textField]}>
                                                        <Text style={styles.textLabel}>State:</Text>
                                                        <TextBox
                                                            placeholder={Strings.stateHint}
                                                            error={this.state.nameError}
                                                            value={state}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            onChangeText={(state) => this.setState({state})}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1}}/>
                                                    <View style={[{flex: 4}, styles.textField]}>
                                                        <Text style={styles.textLabel}>Country:</Text>
                                                        <TextBox
                                                            placeholder={Strings.countryHint}
                                                            error={this.state.nameError}
                                                            value={country}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            onChangeText={(country) => this.setState({country})}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>)
                                        :
                                        (<TouchableOpacity activeOpacity={1}
                                                           onPress={() => this.editClick('address')}
                                                           style={styles.designationStyle}>
                                            <Text
                                                style={styles.designationText}>{street1}, {street2}, {city}, {state}, {country} - {pincode}</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                            </View>
                            {/*<View style={{ flex: 4, flexDirection: "row", justifyContent: 'space-between' }}>*/}
                            {/*    <View style={{ flex: 3 }}>*/}
                            {/*        {isAddressClick*/}
                            {/*            ?*/}
                            {/*            (<View style={styles.textField}>*/}
                            {/*                <View style={{ width: '90%' }}>*/}
                            {/*                    <TextBox*/}
                            {/*                        placeholder={Strings.addressHint}*/}
                            {/*                        error={this.state.nameError}*/}
                            {/*                        value={street1}*/}
                            {/*                        errorMessage={this.state.nameErrorMessage}*/}
                            {/*                        onChangeText={(street1) => this.setState({ street1 })}*/}
                            {/*                    />*/}
                            {/*                </View>*/}
                            {/*            </View>)*/}
                            {/*            :*/}
                            {/*            (<TouchableOpacity activeOpacity={1}*/}
                            {/*                onPress={() => this.editClick('address')}*/}
                            {/*                style={styles.designationStyle}>*/}
                            {/*                <Text style={styles.designationText}>{street1}, {street2}, {city}, {state}, {country} - {pincode}</Text>*/}
                            {/*            </TouchableOpacity>)*/}
                            {/*        }*/}
                            {/*    </View>*/}
                            {/*</View> */}
                        </View>
                        <View style={{paddingBottom: 25}}/>
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
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: "bold",
    },
    nameStyle: {
        paddingBottom: 5,
        paddingLeft: 5,
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
        paddingLeft: 5,
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
        paddingLeft: 5,
        paddingBottom: 10,
    },
    socialImages: {
        display: 'flex',
        paddingLeft: 5,
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

export default BasicProfile;
