import React, {Component} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import SelectMultiple from 'react-native-select-multiple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

class  TestData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testList: [],
            allDateArray: [],
            testDateCombineArray: [],
            isFilterSelect: false,
            filterDrugList: [],
            isFilterModalOpen: false,
            testUnitArray: [],
            currentYear: null
        };
    }

    componentDidMount() {
        const {testList, allDateArray, testDateCombineArray, testUnitArray, currentYear} = this.props;
        this.setState({
            testList: testList,
            allDateArray: allDateArray,
            testDateCombineArray: testDateCombineArray,
            testUnitArray: testUnitArray,
            currentYear: currentYear
        });
    }

    renderTestData = (item, index) => {
        return (
            <View style={this.state.testList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                paddingTop: 5,
                paddingBottom: 5,
            }]}
                  key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>{item.label}</Text>
            </View>
        );
    };

    renderTestFilterData = (item, index) => {
        return (
            <View style={this.state.filterTestList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                paddingTop: 5,
                paddingBottom: 5,
            }]}
                  key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>{item.label}</Text>
            </View>
        );
    };

    renderAllWeekData = (item, index) => {
        const {testDateCombineArray, testList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {testDateCombineArray.length > 0 && testDateCombineArray.slice(0, 7).map((test, key) => (
                    testList.length > 0 && testList.map((i, id) => (
                        test.testName === i.label
                            ?
                            <View key={id} style={{
                                width: 100,
                                marginTop: 28,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: Color.textColor,
                                // width: 100,
                                // marginTop: 11,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // borderBottomWidth: 1.5,
                                // borderColor: Color.textColor,
                            }}>
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

    renderFilterWeekData = (item, index) => {
        const {testDateCombineArray, filterTestList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {testDateCombineArray.length > 0 && testDateCombineArray.map((test, key) => (
                    filterTestList.length > 0 && filterTestList.map((i, id) => (
                        test.testName === i.label
                            ?
                            <View key={id} style={{
                                width: 100,
                                marginTop: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: Color.textColor,
                                // width: 100,
                                // marginTop: 11,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // borderBottomWidth: 1.5,
                                // borderColor: Color.textColor,
                            }}>
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
        const {filterTestList} = this.state;
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

    onSelectionsChange = (e) => {
        this.setState({filterTestList: e});
    };

    applyFilter = () => {
        if (this.state.filterTestList.length > 0) {
            this.setState({isFilterSelect: true, isFilterModalOpen: false});
        } else {
            this.setState({isFilterSelect: false, isFilterModalOpen: false});
        }
    };

    render() {
        const {testList, allDateArray, isFilterSelect, filterTestList, isFilterModalOpen, testUnitArray, currentYear} = this.state;
        return (
            <View style={styles.rowData}>
                <View style={{flex: 0.4}}>
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity
                            onPress={() => this.setState({isFilterModalOpen: true})}
                            style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[styles.headingStyle]}>Diagnosis</Text>
                            <Icon
                                name='chevron-down'
                                size={30}
                                color={Color.textColor}
                                style={{textAlign: 'right', right: 2}}
                            />
                        </TouchableOpacity>
                        {isFilterSelect
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
                                data={testList.slice(0, 7)}
                                renderItem={({item, index}) => this.renderTestData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        }
                    </View>
                </View>
                <ScrollView horizontal={true} style={{flex: 0.6}} showsHorizontalScrollIndicator={false}>
                    <View style={{flex: 0.4}}>
                        <View style={{marginTop: 30}}>
                            <View style={{marginLeft: 10, marginBottom: 12}}>
                                <Text style={styles.headingStyle}>Unit</Text>
                            </View>
                            {isFilterSelect
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
                    </View>
                    <View style={{flex: 0.6}}>
                        {isFilterSelect
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
                    isVisible={isFilterModalOpen}
                    style={styles.QRView}>
                    <View style={[styles.contentQRModal]}>
                        <SelectMultiple
                            items={testList}
                            selectedItems={filterTestList}
                            onSelectionsChange={this.onSelectionsChange}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.setState({isFilterModalOpen: false})}
                            style={styles.hideSymbol}>
                            <Icon
                                name='close'
                                size={30}
                                color={Color.textColor}
                                style={{textAlign: 'right'}}
                            />
                        </TouchableOpacity>
                        <Button title="Apply Filter" onPress={this.applyFilter}/>
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
    nameTextContainer: {
        borderWidth: 1.5,
        borderColor: Color.colorPrimaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 3,
        marginBottom: 3,
    },
    nameStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.colorPrimaryDark,
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
        marginBottom: 40,
    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.colorPrimaryDark,
        padding: 5,
    },
    pointContainer: {
        borderRadius: 100,
        marginTop: -35,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        height: 25,
        minWidth: 95,
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

export default TestData;
