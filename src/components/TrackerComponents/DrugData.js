import React, {Component} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMultiple from 'react-native-select-multiple';
import Modal from 'react-native-modal';

class DrugData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugList: [],
            allDateArray: [],
            drugDateCombineArray: [],
            isFilterSelect: false,
            filterDrugList: [],
            isFilterModalOpen: false,
            currentYear: null
        };
    }

    componentDidMount() {
        const {drugList, allDateArray, drugDateCombineArray, currentYear} = this.props;
        this.setState({
            drugList: drugList,
            allDateArray: allDateArray,
            drugDateCombineArray: drugDateCombineArray,
            currentYear: currentYear
        });
    }

    renderDrugData = (item, index) => {
        return (
            <View style={item !== '' ? styles.nameTextContainer : [styles.nameTextContainer, {borderWidth: 0}]}
                  key={index}>
                <Text style={styles.nameStyle}>{item}</Text>
            </View>
        );
    };

    renderDrugFilterData = (item, index) => {
        return (
            <View style={item.value !== '' ? styles.nameTextContainer : [styles.nameTextContainer, {borderWidth: 0}]}
                  key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>{item.value}</Text>
            </View>
        );
    };

    renderAllDrugData = (item, index) => {
        const {drugDateCombineArray, drugList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {drugDateCombineArray.length > 0 && drugDateCombineArray.map((drug, key) => (
                    drugList.length > 0 && drugList.map((i, id) => (
                        drug.drugName === i
                            ?
                            <View key={id} style={{
                                width: 100,
                                marginTop: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: Color.textColor,
                            }}>
                                {drug.dateList.length > 0 && drug.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={date.dosage === '1'
                                            ? [styles.pointContainer, {borderColor: Color.green}]
                                            :
                                            date.dosage === '2'
                                                ?
                                                [styles.pointContainer, {borderColor: Color.yellow}]
                                                :
                                                [styles.pointContainer, {borderColor: Color.red}]}>
                                            <Text style={[styles.dateStyle, {color: Color.textColor}]}>
                                                {date.strength}
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

    renderFilterDrugData = (item, index) => {
        const {drugDateCombineArray, filterDrugList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {drugDateCombineArray.length > 0 && drugDateCombineArray.map((drug, key) => (
                    filterDrugList.length > 0 && filterDrugList.map((i, id) => (
                        drug.drugName === i.value
                            ?
                            <View key={id} style={{
                                width: 100,
                                marginTop: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: Color.textColor,
                            }}>
                                {drug.dateList.length > 0 && drug.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={date.dosage === '1'
                                            ?
                                            [styles.pointContainer, {borderColor: Color.green}]
                                            :
                                            date.dosage === '2'
                                                ?
                                                [styles.pointContainer, {borderColor: Color.yellow}]
                                                :
                                                [styles.pointContainer, {borderColor: Color.red}]}>
                                            <Text style={[styles.dateStyle, {color: Color.textColor}]}>
                                                {date.strength}
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

    onSelectionsChange = (e) => {
        this.setState({filterDrugList: e});
    };

    applyFilter = () => {
        if (this.state.filterDrugList.length > 0) {
            this.setState({isFilterSelect: true, isFilterModalOpen: false});
        } else {
            this.setState({isFilterSelect: false, isFilterModalOpen: false});
        }
    };

    render() {
        const {drugList, allDateArray, filterDrugList, isFilterSelect, isFilterModalOpen, currentYear} = this.state;
        return (
            <>
                {/*<Text style={styles.headingStyle}>{currentYear}</Text>*/}
                <View style={styles.rowData}>
                    <View style={{flex: 0.3}}>
                        <View style={{marginTop: 20}}>
                            <TouchableOpacity
                                onPress={() => this.setState({isFilterModalOpen: true})}
                                style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.headingStyle}>Drug</Text>
                                <Icon
                                    name='chevron-down'
                                    size={30}
                                    color={Color.textColor}
                                    style={{textAlign: 'right'}}
                                />
                            </TouchableOpacity>
                            {isFilterSelect
                                ?
                                <FlatList
                                    style={{marginLeft: 10}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={false}
                                    key={'flat list'}
                                    data={filterDrugList}
                                    renderItem={({item, index}) => this.renderDrugFilterData(item, index)}
                                    keyExtractor={(item) => item.id}
                                    extraData={this.state}
                                />
                                :
                                <FlatList
                                    style={{marginLeft: 10}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={false}
                                    key={'flat list'}
                                    data={drugList}
                                    renderItem={({item, index}) => this.renderDrugData(item, index)}
                                    keyExtractor={(item) => item.id}
                                    extraData={this.state}
                                />
                            }
                        </View>
                    </View>
                    <View style={{flex: 0.7}}>
                        {isFilterSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) => this.renderFilterDrugData(item, index)}
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
                                renderItem={({item, index}) => this.renderAllDrugData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        }
                    </View>
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
                                items={drugList}
                                selectedItems={filterDrugList}
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
            </>
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
        padding: 5,
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
        marginBottom: 15,
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
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        maxHeight: 30,
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

export default DrugData;
