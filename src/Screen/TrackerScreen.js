import React, {Component} from 'react';
import {Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../theme';
import OptionCategory from '../components/TrackerComponents/OptionCategory';
import Toast from 'react-native-simple-toast';
import Loading from '../components/Loading';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import RadioGroup from '../components/RadioGroup';
import InputBox from '../components/UserInput/inputBox';
import DrugTrackerView from '../components/TrackerComponents/DrugTrackerView';
import DiseaseTrackerView from '../components/TrackerComponents/DiseaseTrackerView';
import DiagnosisTrackerView from '../components/TrackerComponents/DiagnosisTrackerView';
import CardView from '../components/cardView';
import VitalTrackerView from '../components/TrackerComponents/VitalTrackerView';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import NeoSquareIconContainer from '../components/Neo/NeoSquareIconContainer';
import SaveButton from '../components/Neo/SaveButton';
import NeoMediumButton from '../components/Neo/NeoMediumButton';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const responseData = {
    'disease_list': [
        {
            'week': '2021-05-02 00:00',
            'disease_list': [
                {
                    'disease': 'Pregnancy',
                    'date': '2021-04-26 13:15',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'high',
                },
            ],
        },
        {
            'week': '2021-05-23 00:00',
            'disease_list': [
                {
                    'disease': 'Diabetes',
                    'date': '2021-05-21 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
                {
                    'disease': 'Diabetes',
                    'date': '2021-05-19 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
            ],
        },
        {
            'week': '2021-06-13 00:00',
            'disease_list': [
                {
                    'disease': 'Pregnancy',
                    'date': '2021-06-09 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
            ],
        },
        {
            'week': '2021-06-20 00:00',
            'disease_list': [
                {
                    'disease': 'Pregnancy',
                    'date': '2021-06-15 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
            ],
        },
        {
            'week': '2021-07-25 00:00',
            'disease_list': [
                {
                    'disease': 'Pregnancy',
                    'date': '2021-07-24 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'high',
                },
            ],
        },
        {
            'week': '2021-08-01 00:00',
            'disease_list': [
                {
                    'disease': 'Acne',
                    'date': '2021-08-01 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
            ],
        },
        {
            'week': '2021-09-26 00:00',
            'disease_list': [
                {
                    'disease': 'Diabetes',
                    'date': '2021-09-26 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
                {
                    'disease': 'Acne',
                    'date': '2021-09-26 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
                {
                    'disease': 'Diabetes',
                    'date': '2021-09-25 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
            ],
        },
        {
            'week': '2021-10-03 00:00',
            'disease_list': [
                {
                    'disease': 'Diabetes',
                    'date': '2021-10-01 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
                {
                    'disease': 'Acne',
                    'date': '2021-10-01 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'high',
                },
                {
                    'disease': 'Polycystic ovary syndrome',
                    'date': '2021-10-01 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
                {
                    'disease': 'Acne',
                    'date': '2021-09-27 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
                {
                    'disease': 'Polycystic ovary syndrome',
                    'date': '2021-09-27 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'low',
                },
                {
                    'disease': 'Diabetes',
                    'date': '2021-09-27 00:00',
                    'source': 'medical_diary',
                    'levels': 'high-midum-low',
                    'level': 'medium',
                },
            ],
        },
    ],
    'drug_list': [],
    'test_list': [
        {
            'week': '2021-11-28 00:00',
            'test_list': [
                {
                    'value': '6',
                    'unit': 'mill/mm',
                    'name': 'RBC Count',
                    'type': 'test',
                    'date': '2021-11-28 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-28 14:15',
                },
                {
                    'value': '5',
                    'unit': 'mill/mm',
                    'name': 'RBC Count',
                    'type': 'test',
                    'date': '2021-11-28 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-28 14:15',
                },
                {
                    'value': '11.5',
                    'unit': 'g/dl',
                    'name': 'Hemoglobin',
                    'type': 'test',
                    'date': '2021-11-28 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-28 14:15',
                },
                {
                    'value': '1.5',
                    'unit': 'g/dl',
                    'name': 'Hemoglobin',
                    'type': 'test',
                    'date': '2021-11-27 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-26 16:03',
                },
                {
                    'value': '5',
                    'unit': 'mill/mm',
                    'name': 'RBC Count',
                    'type': 'test',
                    'date': '2021-11-27 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-27 13:47',
                },
                {
                    'value': '1.5',
                    'unit': 'g/dl',
                    'name': 'Hemoglobin',
                    'type': 'test',
                    'date': '2021-11-27 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-27 13:39',
                },
                {
                    'value': '1.5',
                    'unit': 'g/dl',
                    'name': 'Hemoglobin',
                    'type': 'test',
                    'date': '2021-11-27 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-27 13:47',
                },
            ],
        },
    ],
    'vital_list': [
        {
            'week': '2021-08-22 00:00',
            'vital_list': [
                {
                    'value': '60',
                    'unit': 'kg',
                    'name': 'weight',
                    'type': 'vitals',
                    'date': '2021-08-16 15:33',
                    'source': 'manual',
                    'modified_on': '2021-08-16 15:33',
                },
                {
                    'value': '160',
                    'unit': 'cm',
                    'name': 'height',
                    'type': 'vitals',
                    'date': '2021-08-16 15:33',
                    'source': 'manual',
                    'modified_on': '2021-08-16 15:33',
                },
            ],
        },
        {
            'week': '2021-11-28 00:00',
            'vital_list': [
                {
                    'value': '90',
                    'unit': '%',
                    'name': 'SpO2',
                    'type': 'vitals',
                    'date': '2021-11-27 00:00',
                    'source': 'manual',
                    'modified_on': '2021-11-26 16:03',
                },
            ],
        },
    ],
};

const vitalList = [
    {
        'label': 'Height',
        'lower_limit': '',
        'unit': 'cm',
        'upper_limit': null,
        'vital_id': 1,
    },
    {
        'label': 'Weight',
        'lower_limit': '',
        'unit': 'kg',
        'upper_limit': null,
        'vital_id': 2,
    },
    {
        'label': 'Diastolic Blood Pressure',
        'lower_limit': null,
        'unit': 'mm Hg',
        'upper_limit': '80',
        'vital_id': 3,
    },
    {
        'label': 'Systolic Blood Pressure',
        'lower_limit': '',
        'unit': 'mm Hg',
        'upper_limit': '120',
        'vital_id': 4,
    },
    {
        'label': 'Fasting Blood Sugar',
        'lower_limit': '',
        'unit': 'mg/dL',
        'upper_limit': '126',
        'vital_id': 5,
    },
    {
        'label': 'Glucose Tolerance',
        'lower_limit': null,
        'unit': 'mg/dL',
        'upper_limit': '200',
        'vital_id': 6,
    },
    {
        'label': 'Pulse Rate',
        'lower_limit': '60',
        'unit': 'BPM',
        'upper_limit': '100',
        'vital_id': 7,
    },
    {
        'label': 'SpO2',
        'lower_limit': '95',
        'unit': '%',
        'upper_limit': '100',
        'vital_id': 8,
    },
];

class TrackerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            trackerData: responseData,
            frequency: 'week',
            diagnosticImages: [],
            prescriptionImages: [],
            isImageModalOpen: false,
            diseasesData: [],
            diseasesListArr: [],
            filterDiseasesList: [],
            diseasesDateList: [],
            drugData: [],
            drugList: [],
            filterDrugList: [],
            drugDateList: [],
            testData: [],
            testList: [],
            filterTestList: [],
            testDateList: [],
            allDateArray: [],
            diseaseDateCombineArray: [],
            drugDateCombineArray: [],
            testDateCombineArray: [],
            testUnitArray: [],
            currentYear: null,
            imageList: [],
            type: 'time',
            isAddDetailsModal: false,
            healthType: [
                {
                    value: 'Health Condition',
                    label: 'Health Condition',
                },
                {
                    value: 'Drug',
                    label: 'Drug',
                },
                {
                    value: 'Disease',
                    label: 'Disease',
                },
                {
                    value: 'Height',
                    label: 'Height',
                },
                {
                    value: 'Weight',
                    label: 'Weight',
                },
            ],
            targetValue: null,
            targetValueError: false,
            targetValueErrorMessage: '',
            currentValueError: false,
            currentValue: null,
            currentValueErrorMessage: '',
            isFilterModalOpen: false,
            isFilterDiseaseSelect: false,
            isFilterTestSelect: false,
            isFilterDrugSelect: false,
            vitalDateCombineArray: [],
            vitalList: vitalList,
            vitalDateList: [],
            vitalData: [],
            isFilterVitalSelect: false,
            filterVitalList: [],
            activeMonth: 'M',
            navigateType: '',
        };
    }

    async componentDidMount() {
        await this.init();
        // this.reRenderSomething = this.props.navigation.addListener('focus', () => {
        //     this.init();
        // });
    }

    init = async () => {
        // let user = await getUserDetails();
        // if (user !== undefined && user !== null && user !== '') {
        //     this.setState({user: user, userName: user.user_name});
        //     this.fetchUserProfile(user);
        // }
        // this.fetchTrackerData();
        this.formatDateList();
        this.setResponseData(this.state.trackerData);
        // this.fetchVitalData();
    };

    // fetchVitalData = () => {
    //     const self = this;
    //     fetchGeneralData('vitals')
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //                 self.setState({vitalData: response.data});
    //             }
    //         })
    //         .catch(async (error) => {
    //             if (error.response !== undefined && error.response.status === 401) {
    //                 await logout();
    //             }
    //             if (error.response !== undefined && error.response.status === 500) {
    //                 self.showToast(ErrorHandler('Please Try After Sometimes!!!'));
    //             }
    //         });
    // };

    formatDateList = () => {
        let today = Moment(new Date()).format('MMM-DD');
        let currentYear = new Date().getFullYear();
        let allDateArray = [];
        for (let i = 0; i < 30; i++) {
            if (i === 0) {
                allDateArray.push(today);
            } else {
                let variableDate = allDateArray[i - 1];
                let formatDate = new Date(new Date(variableDate).getTime() - 86400000);
                let formatOnlyDate = Moment(new Date(formatDate)).format('MMM-DD');
                allDateArray.push(formatOnlyDate);
            }
        }
        this.setState({allDateArray: allDateArray, currentYear: currentYear});
    };

    // fetchTrackerData = () => {
    //     const self = this;
    //     self.refs.loading.show();
    //     fetchTracker(this.state.frequency)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 self.setState({trackerData: response.data});
    //
    //                 self.refs.loading.close();
    //             }
    //         })
    //         .catch(async (error) => {
    //             self.refs.loading.close();
    //             if (error.response !== undefined && error.response.status === 401) {
    //                 await logout();
    //                 self.props.navigation.replace('Login');
    //             }
    //             if (error.response !== undefined && error.response.status === 500) {
    //                 self.showToast(ErrorHandler('Please Try After Sometimes!!!'));
    //             }
    //         });
    // };

    setResponseData = (data) => {
        if (data.disease_list !== undefined && data.disease_list.length > 0) {
            const diseaseList = data.disease_list;
            let diseasesArray = [];
            let diseasesDateArray = [];
            let diseaseDateCombineArray = [];
            diseaseList !== null &&
            diseaseList.length > 0 &&
            diseaseList.map((i, key) => {
                i.disease_list !== null &&
                i.disease_list.length > 0 &&
                i.disease_list.map((j, index) => {
                    let foundDisease = diseasesArray.includes(j.disease);
                    if (!foundDisease) {
                        diseasesArray.push(j.disease);
                    }
                    let modifyDate =
                        j.date !== undefined && j.date !== null
                            ? j.date.split(' ')
                            : null;
                    let formatModifyDate = Moment(new Date(modifyDate[0])).format(
                        'MMM-DD',
                    );
                    let foundDate = diseasesArray.includes(formatModifyDate);
                    if (!foundDate) {
                        diseasesDateArray.push(formatModifyDate);
                    }
                    let resArr = [];
                    if (diseaseDateCombineArray.length === 0) {
                        let formatDate = Moment(new Date(modifyDate[0])).format(
                            'MMM-DD',
                        );
                        let resObj = {
                            date: formatDate,
                            level: j.level,
                        };
                        resArr.push(resObj);
                        let obj = {
                            diseaseName: j.disease,
                            dateList: resArr,
                        };
                        diseaseDateCombineArray.push(obj);
                    } else {
                        let diseaseFilter = diseaseDateCombineArray.filter(
                            (i) => i.diseaseName === j.disease,
                        );
                        if (diseaseFilter.length > 0) {
                            let formatDate = Moment(new Date(modifyDate[0])).format(
                                'MMM-DD',
                            );
                            let resObj = {
                                date: formatDate,
                                level: j.level,
                            };
                            diseaseDateCombineArray.map((item, index) => {
                                if (item.diseaseName === j.disease) {
                                    item.dateList.push(resObj);
                                }
                            });
                        } else {
                            let formatDate = Moment(new Date(modifyDate[0])).format(
                                'MMM-DD',
                            );
                            let resObj = {
                                date: formatDate,
                                level: j.level,
                            };
                            resArr.push(resObj);
                            let obj = {
                                diseaseName: j.disease,
                                dateList: resArr,
                            };
                            diseaseDateCombineArray.push(obj);
                        }
                    }
                });
            });
            this.setState({
                diseaseDateCombineArray: diseaseDateCombineArray,
                diseasesListArr: diseasesArray,
                diseasesDateList: diseasesDateArray,
                diseasesData: diseaseList,
            });
        }
        if (data.drug_list !== undefined && data.drug_list.length > 0) {
            const drugList = data.drug_list;
            let drugArray = [];
            let drugDateArray = [];
            let drugDateCombineArray = [];
            drugList !== null &&
            drugList.length > 0 &&
            drugList.map((i, key) => {
                i.drug_list !== null &&
                i.drug_list.length > 0 &&
                i.drug_list.map((j, index) => {
                    let foundDisease = drugArray.includes(j.Drug);
                    if (!foundDisease) {
                        drugArray.push(j.Drug);
                    }
                    let modifyDate =
                        j.date !== undefined && j.date !== null
                            ? j.date.split(' ')
                            : null;
                    let formatModifyDate = Moment(new Date(modifyDate[0])).format(
                        'MMM-DD',
                    );
                    let foundDate = drugArray.includes(formatModifyDate);
                    if (!foundDate) {
                        drugDateArray.push(formatModifyDate);
                    }
                    let resArr = [];
                    if (drugDateCombineArray.length === 0) {
                        let resObj = {
                            date: formatModifyDate,
                            dosage: j.dosage,
                            strength: j.strength,
                        };
                        resArr.push(resObj);
                        let obj = {
                            drugName: j.Drug,
                            dateList: resArr,
                        };
                        drugDateCombineArray.push(obj);
                    } else {
                        let drugFilter = drugDateCombineArray.filter(
                            (i) => i.drugName === j.Drug,
                        );
                        let formatDate = Moment(new Date(modifyDate[0])).format(
                            'MMM-DD',
                        );
                        if (drugFilter.length > 0) {
                            let resObj = {
                                date: formatDate,
                                dosage: j.dosage,
                                strength: j.strength,
                            };
                            drugDateCombineArray.map((item, index) => {
                                if (item.drugName === j.Drug) {
                                    item.dateList.push(resObj);
                                }
                            });
                        } else {
                            let resObj = {
                                date: formatDate,
                                dosage: j.dosage,
                                strength: j.strength,
                            };
                            resArr.push(resObj);
                            let obj = {
                                drugName: j.Drug,
                                dateList: resArr,
                            };
                            drugDateCombineArray.push(obj);
                        }
                    }
                });
            });
            this.setState({
                drugDateCombineArray: drugDateCombineArray,
                drugList: drugArray,
                drugDateList: drugDateArray,
                drugData: drugList,
            });
        }
        if (data.test_list !== undefined && data.test_list.length > 0) {
            const testList = data.test_list;
            let testArray = [];
            let testUnitArray = [];
            let testDateArray = [];
            let testDateCombineArray = [];
            testList !== null &&
            testList.length > 0 &&
            testList.map((i, key) => {
                i.test_list !== null &&
                i.test_list.length > 0 &&
                i.test_list.map((j, index) => {
                    let foundTest = testArray.filter((item) => item.label === j.name);
                    if (foundTest.length === 0) {
                        let obj = {
                            label: j.name,
                            value: j.unit,
                        };
                        testArray.push(obj);
                        let unitObj = {
                            label: j.name,
                            value: j.unit,
                        };
                        testUnitArray.push(unitObj);
                    }
                    let modifyDate =
                        j.date !== undefined && j.date !== null
                            ? j.date.split(' ')
                            : null;
                    let formatDate = Moment(new Date(modifyDate[0])).format('MMM-DD');
                    let foundDate = testArray.includes(formatDate);
                    if (!foundDate) {
                        testDateArray.push(formatDate);
                    }
                    let resArr = [];
                    if (testDateCombineArray.length === 0) {
                        let resObj = {
                            date: formatDate,
                            diagnostic_url: j.diagnostic_url,
                            unit: j.unit,
                            value: j.value,
                        };
                        resArr.push(resObj);
                        let obj = {
                            testName: j.name,
                            dateList: resArr,
                        };
                        testDateCombineArray.push(obj);
                    } else {
                        let testFilter = testDateCombineArray.filter(
                            (i) => i.testName === j.name.slice(0, 8),
                        );
                        if (testFilter.length > 0) {
                            let resObj = {
                                date: formatDate,
                                diagnostic_url: j.diagnostic_url,
                                unit: j.unit,
                                value: j.value,
                            };
                            testDateCombineArray.map((item, index) => {
                                if (item.testName === j.name) {
                                    item.dateList.push(resObj);
                                }
                            });
                        } else {
                            let resObj = {
                                date: formatDate,
                                diagnostic_url: j.diagnostic_url,
                                unit: j.unit,
                                value: j.value,
                            };
                            resArr.push(resObj);
                            let obj = {
                                testName: j.name,
                                dateList: resArr,
                            };
                            testDateCombineArray.push(obj);
                        }
                    }
                });
            });
            this.setState({
                testDateCombineArray: testDateCombineArray,
                testList: testArray,
                testDateList: testDateArray,
                testData: testList,
                testUnitArray: testUnitArray,
            });
        }
        if (data.vital_list !== undefined && data.vital_list.length > 0) {
            const vitalList = data.vital_list;
            let vitalArray = [];
            let vitalDateArray = [];
            let vitalDateCombineArray = [];
            vitalList !== null &&
            vitalList.length > 0 &&
            vitalList.map((i, key) => {
                i.vital_list !== null &&
                i.vital_list.length > 0 &&
                i.vital_list.map((j, index) => {
                    let foundVital = vitalArray.includes(j.name);
                    if (!foundVital) {
                        vitalArray.push(j.name);
                    }
                    let modifyDate =
                        j.date !== undefined && j.date !== null
                            ? j.date.split(' ')
                            : null;
                    let formatModifyDate = Moment(new Date(modifyDate[0])).format(
                        'MMM-DD',
                    );
                    let foundDate = vitalArray.includes(formatModifyDate);
                    if (!foundDate) {
                        vitalDateArray.push(formatModifyDate);
                    }
                    let resArr = [];
                    if (vitalDateCombineArray.length === 0) {
                        let resObj = {
                            date: formatModifyDate,
                            value: j.value + ' ' + j.unit,
                        };
                        resArr.push(resObj);
                        let obj = {
                            name: j.name,
                            dateList: resArr,
                        };
                        vitalDateCombineArray.push(obj);
                    } else {
                        let vitalFilter = vitalDateCombineArray.filter(
                            (i) => i.name === j.name,
                        );
                        let formatDate = Moment(new Date(modifyDate[0])).format(
                            'MMM-DD',
                        );
                        if (vitalFilter.length > 0) {
                            let resObj = {
                                date: formatDate,
                                value: j.value + ' ' + j.unit,
                            };
                            vitalDateCombineArray.map((item, index) => {
                                if (item.name === j.name) {
                                    item.dateList.push(resObj);
                                }
                            });
                        } else {
                            let resObj = {
                                date: formatDate,
                                value: j.value + ' ' + j.unit,
                            };
                            resArr.push(resObj);
                            let obj = {
                                name: j.name,
                                dateList: resArr,
                            };
                            vitalDateCombineArray.push(obj);
                        }
                    }
                });
            });
            this.setState({
                vitalDateCombineArray: vitalDateCombineArray,
                vitalList: vitalArray,
                vitalDateList: vitalDateArray,
                vitalData: vitalList,
            });
        }
    };

    // fetchUserProfile = (user) => {
    //     const self = this;
    //     fetchUserProfileData(user.user_id)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 self.setState({userData: response.data});
    //             }
    //         }).catch((error) => {
    //             if (error.response !== undefined && error.response.status === 401) {
    //                 logout();
    //                 self.props.navigation.replace('Login');
    //             }
    //             if (error.response !== undefined && error.response.status === 500) {
    //                 self.showToast(ErrorHandler('Please Try After Sometimes!!!'));
    //             }
    //         });
    // };

    showToast = (message) => {
        Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
    };

    saveData = () => {
        console.log('save new item clicked');
    };

    onPressHealth = (e) => {
        console.log(e);
    };

    navigateScreen = () => {
        this.props.navigation.navigate('DoctorScreen');
    };

    filterData = () => {
        const {filterDiseasesList, filterDrugList, filterTestList} = this.state;
        if (filterDiseasesList.length > 0) {
            this.setState({isFilterDiseaseSelect: true}, () => {
                console.log('filter');
            });
        } else {
            this.setState({isFilterDiseaseSelect: false}, () => {
                console.log('filter');
            });
        }
        if (filterDrugList.length > 0) {
            this.setState({isFilterDrugSelect: true}, () => {
                console.log('filter');
            });
        } else {
            this.setState({isFilterDrugSelect: false}, () => {
                console.log('filter');
            });
        }
        if (filterTestList.length > 0) {
            this.setState({isFilterTestSelect: true}, () => {
                console.log('filter');
            });
        } else {
            this.setState({isFilterTestSelect: false}, () => {
                console.log('filter');
            });
        }
        this.setState({isFilterModalOpen: false});
    };

    renderDiseaseList = (item, index) => {
        const {filterDiseasesList} = this.state;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setFilterDiseaseValues(item)}
                style={styles.filterListContainer}
                key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>
                    {item}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setFilterDiseaseValues(item)}>
                    <NeomorphBlur
                        inner
                        style={
                            filterDiseasesList.includes(item)
                                ? styles.neoCheckBoxOuter
                                : styles.neoCheckBoxOuter
                        }>
                        {filterDiseasesList.includes(item) ? (
                            <NeomorphBlur inner style={styles.neoCheckBoxInner}/>
                        ) : null}
                    </NeomorphBlur>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    setFilterDiseaseValues = (item) => {
        const self = this;
        const allDiseaseList = self.state.diseasesListArr;
        let allDiseaseFilterList = self.state.filterDiseasesList;
        const foundDisease = allDiseaseFilterList.includes(item);
        if (foundDisease) {
            const index = allDiseaseFilterList.indexOf(item);
            if (index > -1) {
                allDiseaseFilterList.splice(index, 1);
            }
        } else {
            allDiseaseFilterList.push(item);
        }
        self.setState({filterDiseasesList: allDiseaseFilterList}, () => {
            self.setState({diseasesListArr: allDiseaseList});
        });
    };

    renderDrugList = (item, index) => {
        const {filterDrugList} = this.state;
        return (
            <TouchableOpacity
                onPress={() => this.setFilterDrugValues(item)}
                style={styles.filterListContainer}
                key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>
                    {item}
                </Text>
                <TouchableOpacity onPress={() => this.setFilterDrugValues(item)}>
                    <View
                        style={
                            filterDrugList.includes(item)
                                ? styles.checkedBox
                                : styles.unCheckedBox
                        }>
                        <View
                            style={
                                filterDrugList.includes(item) ? styles.innerCheckBox : null
                            }
                        />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    setFilterDrugValues = (item) => {
        let allDrugFilterList = this.state.filterDrugList;
        let foundDrug = allDrugFilterList.includes(item);
        if (foundDrug) {
            const index = allDrugFilterList.indexOf(item);
            if (index > -1) {
                allDrugFilterList.splice(index, 1);
            }
        } else {
            allDrugFilterList.push(item);
        }
        this.setState({filterDrugList: allDrugFilterList});
    };

    renderTestList = (item, index) => {
        let filterItem = this.state.filterTestList.filter(
            (i) => i.label === item.label,
        );
        return (
            <TouchableOpacity
                onPress={() => this.setFilterTestValues(item)}
                style={styles.filterListContainer}
                key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>
                    {item.label}
                </Text>
                <TouchableOpacity onPress={() => this.setFilterTestValues(item)}>
                    <View
                        style={
                            filterItem.length > 0 ? styles.checkedBox : styles.unCheckedBox
                        }>
                        <View style={filterItem.length > 0 ? styles.innerCheckBox : null}/>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    setFilterTestValues = (item) => {
        let allTestFilterList = this.state.filterTestList;
        let foundTest = allTestFilterList.filter((i) => i.label === item.label);
        if (foundTest.length > 0) {
            allTestFilterList = allTestFilterList.filter(
                (i) => i.label !== item.label,
            );
        } else {
            allTestFilterList.push(item);
        }
        this.setState({filterTestList: allTestFilterList}, () => {
            console.log(allTestFilterList);
        });
    };

    onClickNavigate = (navigateType) => {
        const navigateObj = {navigateType: navigateType};
        this.setState(
            {
                navigateType: navigateType,
            },
            () => {
                this.props.typeNavigate(navigateObj);
            },
        );
    };

    render() {
        const {navigation} = this.props;
        const {
            allDateArray,
            diseasesListArr,
            diseaseDateCombineArray,
            drugList,
            drugDateCombineArray,
            testList,
            testDateCombineArray,
            testUnitArray,
            isAddDetailsModal,
            healthType,
            targetValue,
            targetValueError,
            targetValueErrorMessage,
            currentValueError,
            currentValue,
            currentValueErrorMessage,
            isFilterModalOpen,
            isFilterDiseaseSelect,
            filterDiseasesList,
            isFilterDrugSelect,
            filterDrugList,
            isFilterTestSelect,
            filterTestList,
            vitalDateCombineArray,
            vitalList,
            isFilterVitalSelect,
            filterVitalList,
            activeMonth,
        } = this.state;
        return (
            <>
                <View style={styles.mainContainer}>
                    <ScrollView
                        onContentSizeChange={this.onContentSizeChange}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'}>
                        {/* // ************************   USER OR PROFILE Selection container  ************************************ */}
                        {/*<ProfileSlider/>*/}
                        <View style={styles.separatorContainer}/>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                            <OptionCategory onPress={this.navigateScreen}/>
                            <View style={{padding: 5}}/>
                            {/* *****************    Neo at Tracker Manager *************** */}
                            <View style={{
                                width: width * 0.2,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                alignItems: 'center',
                            }}>
                                <NeoMediumButton
                                    icon={
                                        <Icon
                                            name="filter-plus"
                                            size={20}
                                            color={Color.blue}
                                            style={{textAlign: 'center'}}
                                        />
                                    }
                                    label={'Filters'}
                                    onPress={() => this.setState({isFilterModalOpen: true})}
                                />
                            </View>
                        </View>
                        {/* *****************    Tracker Time Stamp *************** */}
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <NeomorphBlur
                                inner
                                style={{
                                    ...styles.neoBaseOuterStyle,
                                    ...styles.flexRowCenter,
                                    width: 205,
                                    height: 30,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({activeMonth: 'D'})}>
                                    <NeomorphBlur
                                        inner
                                        style={{
                                            ...styles.neoBaseInnerStyle,
                                            ...styles.flexRowCenter,
                                            width: 32,
                                            height: 23,
                                            backgroundColor:
                                                activeMonth === 'D' ? Color.blue : Color.white,
                                        }}>
                                        <Text
                                            style={{
                                                ...styles.subTitlesText,
                                                color: activeMonth === 'D' ? Color.white : Color.blue,
                                            }}>
                                            1D
                                        </Text>
                                    </NeomorphBlur>
                                </TouchableOpacity>
                                <View style={{padding: 5}}/>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({activeMonth: 'W'})}>
                                    <NeomorphBlur
                                        inner
                                        style={{
                                            ...styles.neoBaseInnerStyle,
                                            ...styles.flexRowCenter,
                                            width: 32,
                                            height: 23,
                                            backgroundColor:
                                                activeMonth === 'W' ? Color.blue : Color.white,
                                        }}>
                                        <Text
                                            style={{
                                                ...styles.subTitlesText,
                                                color: activeMonth === 'W' ? Color.white : Color.blue,
                                            }}>
                                            1W
                                        </Text>
                                    </NeomorphBlur>
                                </TouchableOpacity>
                                <View style={{padding: 5}}/>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({activeMonth: 'M'})}>
                                    <NeomorphBlur
                                        inner
                                        style={{
                                            ...styles.neoBaseInnerStyle,
                                            ...styles.flexRowCenter,
                                            width: 32,
                                            height: 23,
                                            backgroundColor:
                                                activeMonth === 'M' ? Color.blue : Color.white,
                                        }}>
                                        <Text
                                            style={{
                                                ...styles.subTitlesText,
                                                color: activeMonth === 'M' ? Color.white : Color.blue,
                                            }}>
                                            1M
                                        </Text>
                                    </NeomorphBlur>
                                </TouchableOpacity>
                                <View style={{padding: 5}}/>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({activeMonth: 'Q'})}>
                                    <NeomorphBlur
                                        inner
                                        style={{
                                            ...styles.neoBaseInnerStyle,
                                            ...styles.flexRowCenter,
                                            width: 32,
                                            height: 23,
                                            backgroundColor:
                                                activeMonth === 'Q' ? Color.blue : Color.white,
                                        }}>
                                        <Text
                                            style={{
                                                ...styles.subTitlesText,
                                                color: activeMonth === 'Q' ? Color.white : Color.blue,
                                            }}>
                                            3M
                                        </Text>
                                    </NeomorphBlur>
                                </TouchableOpacity>
                                <View style={{padding: 5}}/>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({activeMonth: 'A'})}>
                                    <NeomorphBlur
                                        inner
                                        style={{
                                            ...styles.neoBaseInnerStyle,
                                            ...styles.flexRowCenter,
                                            width: 32,
                                            height: 23,
                                            backgroundColor:
                                                activeMonth === 'A' ? Color.blue : Color.white,
                                        }}>
                                        <Text
                                            style={{
                                                ...styles.subTitlesText,
                                                color: activeMonth === 'A' ? Color.white : Color.blue,
                                            }}>
                                            A
                                        </Text>
                                    </NeomorphBlur>
                                </TouchableOpacity>
                            </NeomorphBlur>
                        </View>
                        {/* *********************    TRACKER    ************************* */}
                        {allDateArray.length > 0 && diseasesListArr.length > 0 ? (
                            <DiseaseTrackerView
                                allDateArray={allDateArray}
                                diseasesList={diseasesListArr}
                                diseaseDateCombineArray={diseaseDateCombineArray}
                                isFilterDiseaseSelect={isFilterDiseaseSelect}
                                filterDiseasesList={filterDiseasesList}
                            />
                        ) : null}
                        {allDateArray.length > 0 && drugList.length > 0 ? (
                            <DrugTrackerView
                                allDateArray={allDateArray}
                                drugList={drugList}
                                drugDateCombineArray={drugDateCombineArray}
                                isFilterDrugSelect={isFilterDrugSelect}
                                filterDrugList={filterDrugList}
                            />
                        ) : null}
                        {allDateArray.length > 0 && vitalList.length > 0 ? (
                            <VitalTrackerView
                                allDateArray={allDateArray}
                                vitalList={vitalList}
                                vitalDateCombineArray={vitalDateCombineArray}
                                isFilterVitalSelect={isFilterVitalSelect}
                                filterVitalList={filterVitalList}
                            />
                        ) : null}
                        {allDateArray.length > 0 && testList.length > 0 ? (
                            <DiagnosisTrackerView
                                allDateArray={allDateArray}
                                testList={testList}
                                testDateCombineArray={testDateCombineArray}
                                testUnitArray={testUnitArray}
                                isFilterTestSelect={isFilterTestSelect}
                                filterTestList={filterTestList}
                            />
                        ) : null}
                        <View style={styles.separatorContainer}/>
                    </ScrollView>
                    <Modal
                        testID={'modal'}
                        transparent={true}
                        animationIn={'slideInUp'}
                        animationInTiming={400}
                        animationOut={'slideOutDown'}
                        animationOutTiming={100}
                        backdropOpacity={0.2}
                        useNativeDriver={true}
                        hideModalContentWhileAnimating={true}
                        isVisible={isAddDetailsModal}
                        style={styles.QRView}>
                        <View style={[styles.contentQRModal]}>
                            <RadioGroup
                                radioButtons={healthType}
                                onPress={(e) => this.onPressHealth(e)}
                                flexDirection="column"
                            />
                            <View style={[styles.textField, {paddingTop: 10}]}>
                                <Text style={styles.labelTextStyle}>Current Value</Text>
                                <InputBox
                                    placeholder={'Enter Current Value'}
                                    error={currentValueError}
                                    value={currentValue}
                                    errorMessage={currentValueErrorMessage}
                                    onChangeText={(currentValue) => this.setState({currentValue})}
                                />
                            </View>
                            <View style={[styles.textField, {paddingTop: 10}]}>
                                <Text style={styles.labelTextStyle}>Target Value</Text>
                                <InputBox
                                    placeholder={'Enter Target Value'}
                                    error={targetValueError}
                                    value={targetValue}
                                    errorMessage={targetValueErrorMessage}
                                    onChangeText={(targetValue) => this.setState({targetValue})}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.setState({isAddDetailsModal: false})}
                                style={styles.hideSymbol}>
                                <Icon
                                    name="close"
                                    size={30}
                                    color={Color.textColor}
                                    style={{textAlign: 'right'}}
                                />
                            </TouchableOpacity>
                            <Button title="Submit" onPress={this.saveData}/>
                        </View>
                    </Modal>
                    <Modal
                        testID={'modal'}
                        transparent={true}
                        animationIn={'slideInUp'}
                        animationInTiming={400}
                        animationOut={'slideOutDown'}
                        animationOutTiming={100}
                        backdropOpacity={0.2}
                        useNativeDriver={true}
                        hideModalContentWhileAnimating={true}
                        isVisible={isFilterModalOpen}
                        style={styles.QRView}>
                        <ScrollView
                            onContentSizeChange={this.onContentSizeChange}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}>
                            <View style={[styles.contentQRModal]}>
                                <View
                                    style={{
                                        width: width * 0.9,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        marginHorizontal: 10,
                                        marginVertical: 5,
                                    }}>
                                    <View style={{width: '84%'}}>
                                        <Neomorph
                                            inner
                                            style={{
                                                width: width * 0.73,
                                                height: 60,
                                                shadowRadius: 2,
                                                shadowOffset: {width: 4, height: 4},
                                                borderRadius: 10,
                                                backgroundColor: Color.primaryNeo,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                //backgroundColor: Color.yellow,
                                            }}>
                                            <Neomorph
                                                style={{
                                                    width: width * 0.71,
                                                    height: 50,
                                                    shadowRadius: 4,
                                                    shadowOffset: {width: -2, height: -2},
                                                    borderRadius: 10,
                                                    backgroundColor: Color.primaryNeo,
                                                    // borderColor: Color.red,
                                                    // borderWidth: 1,
                                                }}>
                                                <InputBox placeholder={'search here'}/>
                                            </Neomorph>
                                        </Neomorph>
                                    </View>

                                    <View
                                        style={{
                                            width: width * 0.1,
                                            justifyContent: 'center',
                                            //backgroundColor: Color.red,
                                        }}>
                                        <NeoSquareIconContainer
                                            onPress={() => this.setState({isFilterModalOpen: false})}
                                            style={styles.hideSymbol}
                                            icon={
                                                <Icon
                                                    name="close"
                                                    size={22}
                                                    color={Color.textColor}
                                                    style={{textAlign: 'right'}}
                                                />
                                            }
                                        />
                                    </View>
                                </View>
                                <CardView heading={'Manage Tracker Dashboard'} style={{}}>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{...styles.listHeadingContainer, fontSize: 16}}>
                                            Create Custom Tracker
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({isFilterModalOpen: false});
                                            this.onClickNavigate('AddCustomTracker');
                                        }}
                                        style={styles.filterListContainer}>
                                        <Text style={{...styles.nameStyle, fontWeight: '700', color: Color.blue}}>
                                            Custom Tracker{'\n'}
                                            <Text style={styles.smallTextStyle}>
                                                Ex: Homeopathy,Ayurvedic etc.
                                            </Text>
                                        </Text>
                                        <Icon
                                            name="plus"
                                            size={25}
                                            color={Color.textColor}
                                            style={{textAlign: 'right'}}
                                        />
                                    </TouchableOpacity>
                                    {/* // ********* create event ************* */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({isFilterModalOpen: false});
                                            this.onClickNavigate('CustomTrackerEvent');
                                        }}
                                        style={styles.filterListContainer}>
                                        <Text style={{...styles.nameStyle, fontWeight: '700', color: Color.blue}}>
                                            Create Rare Events{'\n'}
                                            <Text style={styles.smallTextStyle}>
                                                Ex: Surgeries, Accidents, Deaths etc.
                                            </Text>
                                        </Text>
                                        <Icon name="plus" size={25} color={Color.textColor}
                                              style={{textAlign: 'right'}}/>
                                    </TouchableOpacity>
                                    {diseasesListArr.length > 0
                                        ?
                                        (<>
                                                <View style={{
                                                    marginTop: 5,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <Text style={{...styles.listHeadingContainer, fontSize: 16}}>
                                                        Disease List
                                                    </Text>
                                                    <TouchableOpacity>
                                                        <Text style={{
                                                            ...styles.smallTextHighlightStyle,
                                                            color: Color.blue,
                                                        }}>
                                                            Select All
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <FlatList
                                                    style={{marginLeft: 5}}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal={false}
                                                    key={'flat list1'}
                                                    data={diseasesListArr}
                                                    renderItem={({item, index}) =>
                                                        this.renderDiseaseList(item, index)
                                                    }
                                                    keyExtractor={(item) => item}
                                                />
                                            </>
                                        ) : null}
                                    {drugList.length > 0 ? (
                                        <>
                                            <View
                                                style={{
                                                    marginTop: 5,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{...styles.listHeadingContainer, fontSize: 16}}>
                                                    Medicines List
                                                </Text>
                                                <TouchableOpacity>
                                                    <Text
                                                        style={{
                                                            ...styles.smallTextHighlightStyle,
                                                            color: Color.blue,
                                                        }}>
                                                        Select All
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <FlatList
                                                style={{marginLeft: 5}}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={false}
                                                key={'flat list2'}
                                                data={drugList}
                                                renderItem={({item, index}) =>
                                                    this.renderDrugList(item, index)
                                                }
                                                keyExtractor={(item) => item}
                                            />
                                        </>
                                    ) : null}
                                    {testList.length > 0 ? (
                                        <>
                                            <View
                                                style={{
                                                    marginTop: 5,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{...styles.listHeadingContainer, fontSize: 16}}>
                                                    Diagnostics List
                                                </Text>
                                                <TouchableOpacity>
                                                    <Text
                                                        style={{
                                                            ...styles.smallTextHighlightStyle,
                                                            color: Color.blue,
                                                        }}>
                                                        Select All
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <FlatList
                                                style={{marginLeft: 5}}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={false}
                                                key={'flat list3'}
                                                data={testList}
                                                renderItem={({item, index}) =>
                                                    this.renderTestList(item, index)
                                                }
                                                keyExtractor={(item) => item}
                                            />
                                        </>
                                    ) : null}
                                </CardView>
                                <View style={{alignSelf: 'center', marginBottom: 20}}>
                                    <SaveButton onPress={this.filterData}/>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    <Loading ref="loading" indicatorColor={Color.colorPrimary}/>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.white,
        flexDirection: 'column',
    },
    userNameContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    dateDataContainer: {
        flex: 0.3,
        borderWidth: 1.5,
        borderColor: Color.colorPrimaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginRight: 5,
        maxHeight: 40,
    },
    pointContainer: {
        height: 20,
        width: 20,
        borderRadius: 100,
        backgroundColor: Color.lightgreen,
    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.colorPrimaryDark,
        padding: 5,
    },
    nameStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.textColor,
    },
    nameTextContainer: {
        flex: 0.3,
        display: 'flex',
        borderWidth: 1.5,
        borderColor: Color.colorPrimaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 3,
        marginBottom: 3,
    },
    separatorContainer: {
        height: 1,
        backgroundColor: Color.borderColor,
        //backgroundColor: Color.yellow,
        width: '100%',
    },
    rowData: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    headingContainer: {
        paddingBottom: 10,
        paddingTop: 5,
        paddingLeft: 15,
    },
    headingTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: Color.textColor,
        fontWeight: '900',
    },
    headingContainerStyle: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 15,
        marginLeft: 15,
    },
    headingStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: Color.colorPrimaryDark,
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Color.colorPrimary,
        borderWidth: 0.8,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 30,
        textAlign: 'center',
    },
    documentContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: Color.white,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 9,
    },
    documentHeadingContainer: {
        flex: 0.2,
        borderBottomWidth: 1,
        borderColor: Color.borderColor,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        display: 'flex',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 0.7,
        borderColor: Color.borderColor,
    },
    modalHeadingContainer: {
        borderBottomWidth: 0.7,
        borderColor: Color.borderColor,
        paddingBottom: 7,
    },
    headingText: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.textColor,
        textAlign: 'center',
    },
    idProofContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    optionText: {
        fontWeight: '500',
        fontSize: 16,
        padding: 10,
    },
    allProfileImage: {
        height: 60,
        width: 60,
        borderColor: Color.colorPrimaryDark,
        borderWidth: 0.5,
        borderRadius: 100,
    },
    view: {
        justifyContent: 'center',
        margin: 20,
    },
    idImageStyle: {
        height: 400,
        width: 400,
    },
    documentBodyContainer: {
        marginTop: 15,
    },
    imageContainer: {
        borderWidth: 0.5,
        borderColor: Color.lightgray,
        borderRadius: 7,
        height: 150,
        width: 100,
        margin: 15,
    },
    imageStyle: {
        height: 150,
        width: 100,
        borderRadius: 7,
    },
    allImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        //backgroundColor: 'yellow',
        borderRadius: 10,
    },
    addIconContainer: {
        right: 20,
        top: 25,
        position: 'absolute',
    },
    QRView: {
        justifyContent: 'center',
        margin: 10,
        height: 500,
        maxHeight: 750,
    },
    hideSymbol: {
        position: 'absolute',
        right: 0,
        top: 0,
        //margin: 20,
        marginRight: 10,
        marginTop: 10,
    },
    contentQRModal: {
        backgroundColor: Color.white,
        paddingTop: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
    },
    filterListContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Color.borderColor,
        borderWidth: 0.7,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        backgroundColor: Color.lightgray,
    },
    listHeadingContainer: {
        fontSize: 18,
        fontWeight: '500',
        color: Color.borderColor,
    },
    checkedBox: {
        height: 20,
        width: 20,
        backgroundColor: Color.white,
        borderWidth: 1,
        borderColor: Color.colorPrimaryDark,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unCheckedBox: {
        height: 20,
        width: 20,
        backgroundColor: Color.white,
        borderWidth: 1,
        borderColor: Color.textColor,
        padding: 5,
    },
    innerCheckBox: {
        height: 10,
        width: 10,
        backgroundColor: Color.colorPrimaryDark,
    },
    // ************ Neomorph Styling  *****************
    addUserNeoOuter: {
        width: 55,
        height: 55,
        backgroundColor: Color.primaryNeo,
        borderRadius: 28,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowOffset: {width: -4, height: -4},
        right: 20,
        top: 25,
        position: 'absolute',
    },
    addUserNeoInner: {
        width: 45,
        height: 45,
        backgroundColor: Color.primaryNeo,
        borderRadius: 25,
        shadowRadius: 10,
        shadowOffset: {width: -5, height: -5},
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    neoBaseOuterStyle: {
        shadowRadius: 4,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 80,
        backgroundColor: Color.primaryNeo,
    },
    neoBaseInnerStyle: {
        shadowRadius: 4,
        shadowOffset: {width: -2, height: -2},
        //borderRadius: 80,
        borderRadius: 20,
        backgroundColor: Color.primaryNeo,
    },
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    subTitlesText: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.textColor,
        // paddingRight: 5,
        //backgroundColor: Color.red,
    },
    neoCheckBoxOuter: {
        width: 22,
        height: 22,
        borderRadius: 4,
        shadowRadius: 2,
        backgroundColor: Color.lightgrey,
        shadowOffset: {width: -2, height: -2},
        justifyContent: 'center',
        alignItems: 'center',
    },
    neoCheckBoxInner: {
        width: 14,
        height: 14,
        shadowRadius: 2,
        shadowOffset: {width: 2, height: 2},
        borderRadius: 2,
        backgroundColor: Color.grey,
        // backgroundColor: Color.grey,
        //shadowColor: 'red',
    },
    ///// tracker Filter style....

    neo1: {
        width: 67,
        height: 52,
        shadowRadius: 2,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 20,
        backgroundColor: Color.primaryNeo,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    neo2: {
        width: 62,
        height: 49,
        shadowRadius: 4,
        shadowOffset: {width: -4, height: -4},
        borderRadius: 15,
        backgroundColor: Color.primaryNeo,
        justifyContent: 'center',
        alignItems: 'center',
        //position: 'absolute',
    },
    neo3: {
        width: 55,
        height: 46,
        shadowRadius: 4,
        shadowOffset: {width: 4, height: 4},
        borderRadius: 15,
        backgroundColor: Color.primaryNeo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
    },
    smallTextStyle: {
        color: Color.textColor,
        fontWeight: '500',
        fontSize: 13,
    },
    smallTextHighlightStyle: {
        color: Color.textColor,
        fontWeight: '700',
        fontSize: 13,
    },
});

export default TrackerScreen;

TrackerScreen.propTypes = {
    typeNavigate: PropTypes.func,
};
