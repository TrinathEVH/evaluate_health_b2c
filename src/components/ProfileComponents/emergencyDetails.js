import React, {Component} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {Color, Strings} from '../../theme';
import TextBox from '../UserInput/textView';
import IconPlus from 'react-native-vector-icons/FontAwesome5';
import {updateEmergencyDetailsData} from '../../axios/ServerRequest';
import {logout} from '../../utils/LocalStorage';
import ErrorHandler from '../../utils/ErrorHandler';
import CardA from '../../components/Card/card_a';

class EmergencyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMedicalPrefClick: false,
            isContactClick: false,
            isConsentCLick: false,
            userData: null,
            isVehicleCLick: false,
            isInsuranceCLick: false,
            isServicesCLick: false,
            nameError: false,
            nameErrorMessage: '',
            ageError: false,
            ageErrorMessage: '',
            genderError: false,
            genderErrorMessage: '',
            insurance: [],
            vehicle: [],
            emergencyContact: [],
            stateExpanded: false,
            rowsToDisplay: 2,
            doctorPreference: [],
            hospitalPreference: [],
            consent: [
                {
                    'label': 'Location Tracking',
                    'active': false,
                },
                {
                    'label': 'Call Emergency Contact',
                    'active': false,
                },
                {
                    'label': 'SOS Protocol',
                    'active': false,
                },
                {
                    'label': 'Blood/Organ Donation',
                    'active': false,
                },
                {
                    'label': 'Ambulance On Emergency',
                    'active': false,
                },
                {
                    'label': 'Hospitalisation On Emergency',
                    'active': false,
                },
            ],
            services: [
                {
                    'label': 'Ambulance',
                    'active': false,
                },
                {
                    'label': 'Hospitalisation',
                    'active': false,
                },
            ],
        };
    }

    componentDidMount() {
        const {userData} = this.props;
        console.log(userData.doctor_preference, "+++++++++++++++doc")
        data = {
            userData: userData,
            emergencyContact: userData.emergency_contact,
            doctorPreference: userData.doctor_preference,
            hospitalPreference: userData.hospital_preference,
            insurance: userData.insurance,
            vehicle: userData.vehicle
        }
        let services = userData.services;
        let consent = userData.consent;
        if (services.length > 0) data['services'] = services
        if (consent.length > 0) data['consent'] = consent
        this.setState(data);
    }

    editClick = (editType) => {
        switch (editType) {
            case 'medical' :
                this.setState({
                    isMedicalPrefClick: true,
                    isConsentCLick: false,
                    isVehicleCLick: false,
                    isInsuranceCLick: false,
                    isContactClick: false,
                    isServicesCLick: false,
                });
                break;
            case 'consent' :
                this.setState({
                    isMedicalPrefClick: false,
                    isConsentCLick: true,
                    isVehicleCLick: false,
                    isInsuranceCLick: false,
                    isContactClick: false,
                    isServicesCLick: false,
                });
                break;
            case 'vehicle' :
                this.setState({
                    isMedicalPrefClick: false,
                    isConsentCLick: false,
                    isVehicleCLick: true,
                    isInsuranceCLick: false,
                    isContactClick: false,
                    isServicesCLick: false,
                });
                break;
            case 'insurance' :
                this.setState({
                    isMedicalPrefClick: false,
                    isConsentCLick: false,
                    isVehicleCLick: false,
                    isInsuranceCLick: true,
                    isContactClick: false,
                    isServicesCLick: false,
                });
                break;
            case 'contact' :
                this.setState({
                    isMedicalPrefClick: false,
                    isConsentCLick: false,
                    isVehicleCLick: false,
                    isInsuranceCLick: false,
                    isContactClick: true,
                    isServicesCLick: false,
                });
                break;
            case 'service' :
                this.setState({
                    isMedicalPrefClick: false,
                    isConsentCLick: false,
                    isVehicleCLick: false,
                    isInsuranceCLick: false,
                    isContactClick: false,
                    isServicesCLick: true,
                });
                break;
        }
    };

    showMore(value) {
        const list = this.state[value].length;
        list > this.state.rowsToDisplay
            ?
            (this.setState({rowsToDisplay: list, stateExpanded: true}))
            :
            (this.setState({rowsToDisplay: 2, stateExpanded: false}))
    }

    handleInputChange = (e, index, value) => {
        const list = this.state[value];
        list[index].value = String(e);
        const data = {}
        data[value] = list
        this.setState(data)
    }

    // handle click event of the Remove button
    handleRemoveClick = (index, value) => {
        const list = this.state[value];
        list.splice(index, 1);
        const data = {}
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

    handleSwitch = (data, value, type) => {
        let stateValue = {};
        let fieldValue = this.state[type]
        fieldValue.some(function (obj) {
            if (obj.label === data.label) {
                obj.active = value;
                return true;
            }
        });
        stateValue[type] = fieldValue
        this.setState(stateValue)
        this.basicDataSave(type)
    }

    basicDataSave = (editData) => {
        this.setState({
            isMedicalPrefClick: false,
            isConsentCLick: false,
            isVehicleCLick: false,
            isInsuranceCLick: false,
            isContactClick: false,
            isServicesCLick: false,
        });
        let data = {};
        const {emergencyContact, doctorPreference, hospitalPreference, services, consent, insurance, vehicle} = this.state;
        switch (editData) {
            case 'medical':
                data = {
                    doctor_preference: doctorPreference,
                    hospital_preference: hospitalPreference
                };
                break;
            case 'vehicle':
                data = {vehicle: vehicle};
                break;
            case 'insurance':
                data = {insurance: insurance};
                break;
            case 'contact':
                data = {emergency_contact: emergencyContact};
                break;
            case 'consent':
                data = {consent: consent};
                break;
            case 'services':
                data = {services: services};
                break;
        }
        const self = this;
        console.log(data, "+++++++++++++=data")
        updateEmergencyDetailsData(data)
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
        const {emergencyContact, isContactClick, doctorPreference, hospitalPreference, isMedicalPrefClick, consent, services, insurance, vehicle} = this.state;
        return (
            <View style={styles.withoutContainer}>
            <CardA title={'Emergency Information'}>
                {/* <Text style={styles.headingTextStyle}>Emergency Details</Text> */}
                <View style={styles.socialImages}>
                    <View style={{paddingBottom: 25}}/>
                    <View style={{flexDirection: 'column', flex: 4}}>
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.subHeadingStyle}>Emergency Contact : </Text>
                            </View>
                            <View style={{flex: 1}}>
                                {isContactClick &&
                                <TouchableOpacity onPress={() => this.basicDataSave('contact')}>
                                    <IconPlus
                                        name={'check-circle'}
                                        size={35}
                                        color={Color.seagreen}
                                        style={{top: 3, left: 10}}
                                    />
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {emergencyContact.slice(0, this.state.rowsToDisplay).map((contact, i) => {
                            return (
                                <View style={{flex: 8, flexDirection: "row", justifyContent: 'space-between'}}>
                                    <View style={{flex: 6}}>
                                        {isContactClick
                                            ?
                                            (<View style={{flexDirection: 'column'}}>
                                                <View style={{
                                                    flex: 6,
                                                    flexDirection: "row",
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 && <Text style={styles.textLabel}>Name:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.nameHint}
                                                            error={this.state.nameError}
                                                            value={contact.name}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            // onChangeText={(city) => this.setState({ city })}
                                                        />
                                                    </View>

                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 &&
                                                        <Text style={styles.textLabel}>Relation:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.relation}
                                                            error={this.state.nameError}
                                                            value={contact.relation}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            // onChangeText={(pincode) => this.setState({ pincode })}
                                                        />
                                                    </View>
                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 &&
                                                        <Text style={styles.textLabel}>Mobile:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.enterMobile}
                                                            error={this.state.mobileErrorMessage}
                                                            value={contact.mobile}
                                                            errorMessage={this.state.mobileErrorMessage}
                                                            // onChangeText={(pincode) => this.setState({ pincode })}
                                                        />
                                                    </View>
                                                </View>
                                                {/* </View> */}
                                            </View>)
                                            :
                                            (<TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => this.editClick('contact')}
                                                style={styles.designationStyle}>
                                                <Text
                                                    style={styles.designationText}>{contact.name}-{contact.relation}-{contact.mobile}</Text>
                                            </TouchableOpacity>)
                                        }
                                    </View>
                                    <View style={{flex: 2}}>
                                        <View style={{flexDirection: 'column', flex: 4}}>
                                            <View style={{flex: 4, flexDirection: "row"}}>
                                                {emergencyContact.length !== 1 &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleRemoveClick(i, 'contact')}>
                                                        <IconPlus
                                                            name={'minus-circle'}
                                                            size={30}
                                                            color={Color.red}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {emergencyContact.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleAddClick('contact', 'emergencyContact')}>
                                                        <IconPlus
                                                            name={'plus-circle'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {this.state.stateExpanded && emergencyContact.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('emergencyContact')}>
                                                        <IconPlus
                                                            name={'chevron-circle-up'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {i === 1 && !this.state.stateExpanded &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('emergencyContact')}>
                                                        <IconPlus
                                                            name={'chevron-circle-down'}
                                                            size={30}
                                                            color={Color.seagreen}
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
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.subHeadingStyle}>Medical Preference : </Text>
                            </View>
                            <View style={{flex: 1}}>
                                {isMedicalPrefClick &&
                                <TouchableOpacity onPress={() => this.basicDataSave('medical')}>
                                    <IconPlus
                                        name={'check-circle'}
                                        size={35}
                                        color={Color.seagreen}
                                        style={{top: 3, left: 10}}
                                    />
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.subHeadingStyle}>Doctors : </Text>
                            </View>
                            <View style={{flex: 2}}>
                                {isMedicalPrefClick &&
                                <TouchableOpacity onPress={() => this.basicDataSave('medical')}>
                                    <IconPlus
                                        name={'check-circle'}
                                        size={35}
                                        color={Color.seagreen}
                                        style={{top: 3, left: 10}}
                                    />
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {doctorPreference.slice(0, this.state.rowsToDisplay).map((data, i) => {
                            return (
                                <View style={{flex: 8, flexDirection: "row", justifyContent: 'space-between'}}>
                                    <View style={{flex: 6}}>
                                        {isMedicalPrefClick
                                            ?
                                            (<View style={{flexDirection: 'column'}}>
                                                <View style={{
                                                    flex: 2,
                                                    flexDirection: "row",
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 && <Text style={styles.textLabel}>Name:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.nameHint}
                                                            error={this.state.nameError}
                                                            value={doctorPreference.name}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            // onChangeText={(city) => this.setState({ city })}
                                                        />
                                                    </View>
                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 &&
                                                        <Text style={styles.textLabel}>Category:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.relation}
                                                            error={this.state.nameError}
                                                            value={doctorPreference.specialization}
                                                            errorMessage={this.state.nameErrorMessage}
                                                            // onChangeText={(pincode) => this.setState({ pincode })}
                                                        />
                                                    </View>
                                                    <View style={[{width: '90%', flex: 2}]}>
                                                        {i === 0 &&
                                                        <Text style={styles.textLabel}>Mobile:</Text>}
                                                        <TextBox
                                                            placeholder={Strings.enterMobile}
                                                            error={this.state.mobileErrorMessage}
                                                            value={doctorPreference.mobile}
                                                            errorMessage={this.state.mobileErrorMessage}
                                                            // onChangeText={(pincode) => this.setState({ pincode })}
                                                        />
                                                    </View>
                                                </View>
                                            </View>)
                                            :
                                            (<TouchableOpacity activeOpacity={1}
                                                               onPress={() => this.editClick('medical')}
                                                               style={styles.designationStyle}>
                                                <Text
                                                    style={styles.designationText}>{data.name} - {data.specialization} - {data.mobile} - {i}</Text>
                                            </TouchableOpacity>)
                                        }
                                    </View>
                                    <View style={{flex: 2}}>
                                        <View style={{flexDirection: 'column', flex: 4}}>
                                            <View style={{flex: 4, flexDirection: "row"}}>
                                                {doctorPreference.length !== 1 &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleRemoveClick(i, 'medical')}>
                                                        <IconPlus
                                                            name={'minus-circle'}
                                                            size={30}
                                                            color={Color.red}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {doctorPreference.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleAddClick('medical', 'doctorPreference')}>
                                                        <IconPlus
                                                            name={'plus-circle'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {this.state.stateExpanded && doctorPreference.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('doctorPreference')}>
                                                        <IconPlus
                                                            name={'chevron-circle-up'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {i === 1 && !this.state.stateExpanded &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('doctorPreference')}>
                                                        <IconPlus
                                                            name={'chevron-circle-down'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
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
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.subHeadingStyle}>Hospital : </Text>
                            </View>
                            <View style={{flex: 2}}>
                                {isMedicalPrefClick &&
                                <TouchableOpacity onPress={() => this.basicDataSave('medical')}>
                                    <IconPlus
                                        name={'check-circle'}
                                        size={35}
                                        color={Color.seagreen}
                                        style={{top: 3, left: 10}}
                                    />
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {hospitalPreference.slice(0, this.state.rowsToDisplay).map((data, i) => {
                            return (
                                <View style={{flex: 3, flexDirection: "row", justifyContent: 'space-between'}}>
                                    <View style={{flex: 2}}>
                                        {isMedicalPrefClick
                                            ?
                                            (<View style={{flexDirection: 'column'}}>
                                                <View style={{flexDirection: 'column', flex: 2}}>
                                                    <View style={{
                                                        flex: 2,
                                                        flexDirection: "row",
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <View style={[{width: '90%', flex: 1}]}>
                                                            {i === 0 &&
                                                            <Text style={styles.textLabel}>Hospital:</Text>}
                                                            <TextBox
                                                                placeholder={Strings.nameHint}
                                                                error={this.state.nameError}
                                                                value={data.hospital}
                                                                errorMessage={this.state.nameErrorMessage}
                                                                // onChangeText={(city) => this.setState({ city })}
                                                            />
                                                        </View>
                                                        <View style={[{width: '90%', flex: 1}]}>
                                                            {i === 0 &&
                                                            <Text style={styles.textLabel}>Category:</Text>}
                                                            <TextBox
                                                                placeholder={Strings.relation}
                                                                error={this.state.nameError}
                                                                value={data.type}
                                                                errorMessage={this.state.nameErrorMessage}
                                                                // onChangeText={(pincode) => this.setState({ pincode })}
                                                            />
                                                        </View>
                                                        <View style={[{width: '90%', flex: 1}]}>
                                                            {i === 0 &&
                                                            <Text style={styles.textLabel}>Mobile:</Text>}
                                                            <TextBox
                                                                placeholder={Strings.enterMobile}
                                                                error={this.state.mobileErrorMessage}
                                                                value={data.insurance}
                                                                errorMessage={this.state.mobileErrorMessage}
                                                                // onChangeText={(pincode) => this.setState({ pincode })}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>)
                                            :
                                            (<TouchableOpacity activeOpacity={1}
                                                               onPress={() => this.editClick('medical')}
                                                               style={styles.designationStyle}>
                                                <Text
                                                    style={styles.designationText}>{data.hospital} - {data.type} - {data.insurance} - {i}</Text>
                                            </TouchableOpacity>)
                                        }
                                    </View>
                                    <View style={{flex: 1}}>
                                        <View style={{flexDirection: 'column', flex: 4}}>
                                            <View style={{flex: 4, flexDirection: "row"}}>
                                                {hospitalPreference.length !== 1 &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleRemoveClick(i, 'medical')}>
                                                        <IconPlus
                                                            name={'minus-circle'}
                                                            size={30}
                                                            color={Color.red}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {hospitalPreference.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleAddClick('medical', 'hospitalPreference')}>
                                                        <IconPlus
                                                            name={'plus-circle'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {this.state.stateExpanded && hospitalPreference.length - 1 === i &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('hospitalPreference')}>
                                                        <IconPlus
                                                            name={'chevron-circle-up'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                }
                                                {i === 1 && !this.state.stateExpanded &&
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity
                                                        onPress={() => this.showMore('hospitalPreference')}>
                                                        <IconPlus
                                                            name={'chevron-circle-down'}
                                                            size={30}
                                                            color={Color.seagreen}
                                                            style={{top: 3, left: 10}}
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
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.subHeadingStyle}>Consent : </Text>
                            </View>
                            <View style={{flex: 1}}/>
                        </View>
                        {consent.map((data, i) => {
                                return (
                                    <View style={{flex: 3, flexDirection: "row"}}>
                                        <View style={{flex: 2}}>
                                            <Text style={styles.designationText}>{data.label}</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Switch
                                                value={data.active}
                                                trackColor={{true: Color.colorPrimaryDark, false: 'grey'}}
                                                onValueChange={(value) => this.handleSwitch(data, value, 'consent')}/>
                                        </View>
                                    </View>
                                );
                            }
                        )}
                    </View>
                    <View style={{paddingBottom: 25}}/>
                    <Text style={styles.designationText}>Vehicle :</Text>
                    <Text style={styles.designationText}>Bike - Primary[xyz 1234]</Text>
                    <Text style={styles.designationText}>Car [xyz 1234]</Text>
                    <Text style={styles.designationText}>Office Commercial : Car[xyz 1234]</Text>
                    <View style={{paddingBottom: 25}}/>
                    <Text style={styles.designationText}>Insurance : XYZ Life</Text>
                    <Text style={styles.designationText}>Expiry : Jan 2022</Text>
                    <Text style={styles.designationText}>Eligibilty : Nationwide</Text>
                    <View style={{paddingBottom: 25}}/>
                    <View style={{flexDirection: 'column', flex: 4}}>
                        <View style={{flex: 3, flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.subHeadingStyle}>Services : </Text>
                            </View>
                            <View style={{flex: 1}}>
                            </View>
                        </View>
                        {services.map((data, i) => {
                                return (
                                    <View style={{flex: 3, flexDirection: "row"}}>
                                        <View style={{flex: 2}}>
                                            <Text style={styles.designationText}>{data.label}</Text>
                                        </View>

                                        <View style={{flex: 1}}>
                                            <Switch
                                                value={data.active}
                                                onValueChange={(value) => this.handleSwitch(data, value, 'services')}/>

                                        </View>
                                    </View>
                                );
                            }
                        )}
                    </View>
                    
                    <View style={{paddingBottom: 25}}/>
                       
                </View>
                </CardA> 
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

export default EmergencyDetails;
