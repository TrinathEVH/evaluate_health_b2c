import React, {Component} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Color, Strings} from "../../theme";
import CardView from "../cardView";
import InputBox from "../UserInput/inputBox";
import UserInput from "../UserInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import Moment from "moment";

class DiagnosisTrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testList: [],
            allDateArray: [],
            testDateCombineArray: [],
            testUnitArray: [],
            isModalOpen: false,
            itemName: '',
            selectDate: '',
            value: null,
            valueError: false,
            valueErrorMessage: '',
            note: '',
            noteError: false,
            noteErrorMessage: '',
            unit: null,
            oldValue: {}
        };
    }

    componentDidMount() {
        const {testList, allDateArray, testDateCombineArray, testUnitArray} = this.props;
        this.setState({
            testList: testList,
            allDateArray: allDateArray,
            testDateCombineArray: testDateCombineArray,
            testUnitArray: testUnitArray,
        });
    }

    renderTestData = (item, index) => {
        return (
            <View style={styles.nameTextContainer}
                  key={index}>
                <Text numberOfLines={2} style={styles.nameStyle}>{item.label}</Text>
            </View>
        );
    };

    renderTestFilterData = (item, index) => {
        return (
            <View style={styles.nameTextContainer}
                  key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>{item.label}</Text>
            </View>
        );
    };

    renderAllWeekData = (item, index) => {
        const {testDateCombineArray, testList, testUnitArray} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {testDateCombineArray.length > 0 && testDateCombineArray.map((test, key) => (
                    testList.length > 0 && testList.map((i, id) => (
                        test.testName === i.label
                            ?
                            <TouchableOpacity
                                onPress={() => {
                                    let filterValue = test.dateList.filter((i) => i.date === item);
                                    console.log(filterValue);
                                    console.log(test);
                                    console.log(i);
                                    let filterUnit = testUnitArray.filter((j) => j.label === test.testName);
                                    this.setState({
                                        isModalOpen: true,
                                        itemName: test.testName,
                                        selectDate: item,
                                        value: filterValue.length ? filterValue[0].value : null,
                                        unit: filterUnit.length ? filterUnit[0].value : null,
                                    });
                                }}
                                key={id} style={styles.dataContainer}>
                                {test.dateList.length > 0 && test.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={styles.pointContainer}>
                                            <Text style={styles.dateStyle}>
                                                {date.value}
                                            </Text>
                                        </View>)
                                        :
                                        null
                                ))}
                            </TouchableOpacity>
                            :
                            null
                    ))
                ))}
            </View>
        );
    };

    renderFilterWeekData = (item, index) => {
        const {testDateCombineArray} = this.state;
        const {filterTestList} = this.props;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {testDateCombineArray.length > 0 && testDateCombineArray.map((test, key) => (
                    filterTestList.length > 0 && filterTestList.map((i, id) => (
                        test.testName === i.label
                            ?
                            <View key={id} style={styles.dataContainer}>
                                {test.dateList.length > 0 && test.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={[styles.pointContainer, {borderColor: Color.red}]}>
                                            <Text style={[styles.dateStyle, {color: Color.textColor}]}>
                                                {date.value}
                                            </Text>
                                        </View>)
                                        :
                                        null
                                ))}
                            </View>
                            :
                            <View style={{height: 1, color: Color.borderColor}}/>
                    ))
                ))}
            </View>
        );
    };

    renderUnitData = (item, index) => {
        const {testList} = this.state;
        return (
            testList.length > 0 && testList.map((i, key) => (
                item.label === i.label
                    ?
                    (<View
                        style={testList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                            paddingTop: 5,
                            paddingBottom: 5,
                        }]}
                        key={key}>
                        <Text numberOfLines={1} style={styles.nameStyle} key={index}>
                            {item.value !== 'No units found' && item.value !== 'No unit here' ? item.value : 'Nil'}
                        </Text>
                    </View>)
                    :
                    null
            ))
        );
    }

    renderUnitFilterData = (item, index) => {
        const {filterTestList} = this.props;
        return (
            filterTestList.length > 0 && filterTestList.map((i, key) => (
                item.label === i.label
                    ?
                    (<View
                        style={filterTestList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                            paddingTop: 5,
                            paddingBottom: 5,
                        }]}
                        key={key}>
                        <Text numberOfLines={1} style={styles.nameStyle} key={index}>
                            {item.value !== 'No units found' && item.value !== 'No unit here' ? item.value : 'Nil'}
                        </Text>
                    </View>)
                    :
                    null
            ))
        );
    }

    updateData = () => {
        const self = this;
        const {value, note, itemName, selectDate, unit, oldValue} = this.state;
        const formatDate = Moment(new Date(selectDate)).format('YYYY-MM-DD');
        let currentYear = new Date().getFullYear();
        let currentTime = new Date();
        console.log(currentTime);
        var str = formatDate;
        var arr = str.split('-');
        arr.shift();
        arr.unshift(currentYear.toString());
        str = arr.join('-');
        // updateTrackerValues(itemName, 'test', oldValue, value, unit, str)
        //     .then((response) => {
        //         if (response.status === 200) {
        //             console.log(response.data);
        //             self.setState({
        //                 isModalOpen: false,
        //                 itemName: '',
        //                 selectDate: '',
        //                 valueError: false,
        //                 value: null,
        //                 valueErrorMessage: '',
        //                 note: '',
        //                 noteError: false,
        //                 noteErrorMessage: ''
        //             })
        //         }
        //     }).catch(async (error) => {
        //     console.log(error);
        //     if (error.response !== undefined && error.response.status === 401) {
        //         await logout();
        //         self.props.navigation.replace('Login');
        //     }
        //     if (error.response !== undefined && error.response.status === 500) {
        //         self.showToast(ErrorHandler('Please Try After Sometimes!!!'));
        //     }
        // });
    }

    render() {
        const {testList, allDateArray, testUnitArray, isModalOpen, itemName, selectDate, value, valueError, valueErrorMessage, note, noteError, noteErrorMessage, unit} = this.state;
        const {filterTestList, isFilterTestSelect} = this.props;
        return (
            <View style={styles.rowData}>
                <View style={{flex: 0.4}}>
                    <View style={[styles.nameTextContainer, {marginLeft: 10}]}>
                        <Text numberOfLines={2} style={styles.nameStyle}>Diagnostics/Item</Text>
                    </View>
                    {isFilterTestSelect
                        ?
                        <FlatList
                            style={{marginLeft: 10}}
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            key={'flat list'}
                            data={filterTestList}
                            renderItem={({item, index}) => this.renderTestFilterData(item, index)}
                            keyExtractor={(item) => item.id}
                            extraData={this.state}
                        />
                        :
                        <FlatList
                            style={{marginLeft: 10}}
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            key={'flat list'}
                            data={testList}
                            renderItem={({item, index}) => this.renderTestData(item, index)}
                            keyExtractor={(item) => item.id}
                            extraData={this.state}
                        />
                    }
                </View>
                <ScrollView horizontal={true} style={{flex: 0.6}} showsHorizontalScrollIndicator={false}>
                    <View style={{flex: 0.4}}>
                        <View style={[styles.nameTextContainer, {marginLeft: 10}]}>
                            <Text numberOfLines={2} style={styles.nameStyle}>Diagnostics/Item</Text>
                        </View>
                        {isFilterTestSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={testUnitArray}
                                renderItem={({item, index}) => this.renderUnitFilterData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                            :
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={testUnitArray.slice(0, 7)}
                                renderItem={({item, index}) => this.renderUnitData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        }
                    </View>
                    <View style={{flex: 0.6}}>
                        {isFilterTestSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) => this.renderFilterWeekData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                            :
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) => this.renderAllWeekData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        }
                    </View>
                </ScrollView>
                <Modal
                    testID={'modal'}
                    transparent={true}
                    animationIn={'slideInUp'}
                    animationInTiming={2000}
                    animationOut={'slideOutDown'}
                    animationOutTiming={100}
                    backdropOpacity={0.20}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    isVisible={isModalOpen}
                    style={styles.QRView}>
                    <View style={[styles.contentQRModal]}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: '700',
                            color: Color.colorPrimaryDark,
                            textAlign: 'center',
                            marginTop: 30
                        }}>Update {itemName.toUpperCase()} Tracker</Text>
                        <ScrollView onContentSizeChange={this.onContentSizeChange}
                                    showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                            <CardView heading={itemName}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <View style={[styles.textField, {width: '80%'}]}>
                                        <Text style={styles.labelTextStyle}>Enter Value</Text>
                                        <InputBox
                                            placeholder={Strings.value}
                                            error={valueError}
                                            value={value}
                                            errorMessage={valueErrorMessage}
                                            maxLength={10}
                                            onChangeText={(value) => this.setState({value})}
                                        />
                                    </View>
                                    <View style={{width: '15%'}}>
                                        <Text style={{fontWeight: '500', fontSize: 14}}>{unit}</Text>
                                    </View>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: 18}}>Date & Time : </Text>
                                    <Text style={{fontWeight: '600', fontSize: 18, color: Color.borderColor}}>
                                        {selectDate}
                                    </Text>
                                </View>
                            </CardView>
                            <CardView heading={'Notes'}>
                                <View style={styles.textField}>
                                    <UserInput
                                        placeholder={Strings.note}
                                        error={noteError}
                                        value={note}
                                        errorMessage={noteErrorMessage}
                                        maxLength={150}
                                        onChangeText={(note) => this.setState({note})}
                                    />
                                </View>
                            </CardView>
                            <View style={{paddingLeft: 15, paddingRight: 15, marginBottom: 20}}>
                                <Button title="Submit" onPress={this.updateData}/>
                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.setState({
                                isModalOpen: false,
                                itemName: '',
                                selectDate: '',
                                valueError: false,
                                value: null,
                                valueErrorMessage: '',
                                note: '',
                                noteError: false,
                                noteErrorMessage: ''
                            })}
                            style={styles.hideSymbol}>
                            <Icon
                                name='close'
                                size={30}
                                color={Color.textColor}
                                style={{textAlign: 'right'}}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowData: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    headingStyle: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: '500',
        color: Color.textColor,
    },
    dataContainer: {
        width: 100,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: Color.borderColor,
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 10,
        marginBottom: 3,
        marginTop: 3,
        marginRight: 5,
    },
    nameTextContainer: {
        borderWidth: 1.5,
        width: 100,
        borderColor: Color.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 10,
    },
    nameStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.textColor,
        padding: 5,
    },
    dateDataContainer: {
        flex: 0.3,
        borderWidth: 1.5,
        borderColor: Color.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 5,
        minHeight: 50,
        maxHeight: 50,
        marginTop: 3,

    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.textColor,
    },
    pointContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    QRView: {
        justifyContent: 'center',
        margin: 20,
    },
    hideSymbol: {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 20,
    },
    contentQRModal: {
        backgroundColor: Color.white,
        padding: 15,
        paddingTop: 15,
        borderRadius: 10,
        height: 450,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
    },
});

export default DiagnosisTrackerView;
