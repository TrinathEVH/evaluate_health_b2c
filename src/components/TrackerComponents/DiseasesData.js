import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import SelectMultiple from 'react-native-select-multiple';

class DiseasesData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseasesList: [],
            allDateArray: [],
            diseaseDateCombineArray: [],
            isFilterSelect: false,
            filterDiseaseList: [],
            isFilterModalOpen: false,
            currentYear: null
        };
    }

    componentDidMount() {
        const {diseasesList, allDateArray, diseaseDateCombineArray, currentYear} = this.props;
        this.setState({
            diseasesList: diseasesList,
            allDateArray: allDateArray,
            diseaseDateCombineArray: diseaseDateCombineArray,
            currentYear: currentYear
        });
    }

    renderDiseaseData = (item, index) => {
        return (
            <View style={this.state.diseasesList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                paddingTop: 5,
                paddingBottom: 5,
            }]}
                  key={index}>
                <Text numberOfLines={1} style={[styles.nameStyle]}>{item}</Text>
            </View>
        );
    };

    renderDiseaseFilterData = (item, index) => {
        return (
            <View style={this.state.diseasesList.length < 10 ? styles.nameTextContainer : [styles.nameTextContainer, {
                paddingTop: 10,
                paddingBottom: 10,
            }]}
                  key={index}>
                <Text numberOfLines={1} style={styles.nameStyle}>{item.value}</Text>
            </View>
        );
    };

    renderAllDiseaseData = (item, index) => {
        const {diseaseDateCombineArray, diseasesList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {diseaseDateCombineArray.length > 0 && diseaseDateCombineArray.map((disease, key) => (
                    diseasesList.length > 0 && diseasesList.map((i, id) => (
                        disease.diseaseName === i
                            ?
                            <View key={id} style={styles.dataContainer}>
                                {disease.dateList.length > 0 && disease.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View
                                            key={dateId}
                                            style={
                                                date.level === 'high' || date.level === '1'
                                                    ? [styles.pointContainer, {backgroundColor: Color.red}]
                                                    :
                                                    date.level === 'medium' || date.level === '2'
                                                        ?
                                                        [styles.pointContainer, {backgroundColor: Color.yellow}]
                                                        :
                                                        [styles.pointContainer, {backgroundColor: Color.green}]
                                            }
                                        />)
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

    renderFilterDiseaseData = (item, index) => {
        const {diseaseDateCombineArray, filterDiseaseList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {diseaseDateCombineArray.length > 0 && diseaseDateCombineArray.map((disease, key) => (
                    filterDiseaseList.length > 0 && filterDiseaseList.map((i, id) => (
                        disease.diseaseName === i.value
                            ?
                            <View key={id} style={styles.dataFilterContainer}>
                                {disease.dateList.length > 0 && disease.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View
                                            key={dateId}
                                            style={
                                                date.level === 'high' || date.level === '1'
                                                    ? [styles.pointContainer, {backgroundColor: Color.red}]
                                                    :
                                                    date.level === 'medium' || date.level === '2'
                                                        ?
                                                        [styles.pointContainer, {backgroundColor: Color.yellow}]
                                                        :
                                                        [styles.pointContainer, {backgroundColor: Color.green}]
                                            }
                                        />)
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
        console.log(e);
        this.setState({filterDiseaseList: e});
    };

    applyFilter = () => {
        if (this.state.filterDiseaseList.length > 0) {
            this.setState({isFilterSelect: true, isFilterModalOpen: false});
        } else {
            this.setState({isFilterSelect: false, isFilterModalOpen: false});
        }
    };

    render() {
        const {diseasesList, allDateArray, isFilterModalOpen, isFilterSelect, filterDiseaseList, currentYear} = this.state;
        return (
            <>
                <View style={styles.rowData}>
                    <View style={{flex: 0.3}}>
                        <View style={{marginTop: 35}}>
                            <TouchableOpacity
                                onPress={() => this.setState({isFilterModalOpen: true})}
                                style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.headingStyle}>Health Condition</Text>
                                <Icon
                                    name='chevron-down'
                                    size={30}
                                    color={Color.textColor}
                                    style={{textAlign: 'right', right: 25}}
                                />
                            </TouchableOpacity>
                            {isFilterSelect
                                ?
                                <FlatList
                                    style={{marginLeft: 10}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={false}
                                    key={'flat list'}
                                    data={filterDiseaseList}
                                    renderItem={({item, index}) => this.renderDiseaseFilterData(item, index)}
                                    keyExtractor={(item) => item.id}
                                    extraData={this.state}
                                />
                                :
                                <FlatList
                                    style={{marginLeft: 10}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={false}
                                    key={'flat list'}
                                    data={diseasesList}
                                    renderItem={({item, index}) => this.renderDiseaseData(item, index)}
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
                                renderItem={({item, index}) => this.renderFilterDiseaseData(item, index)}
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
                                renderItem={({item, index}) => this.renderAllDiseaseData(item, index)}
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
                                items={diseasesList}
                                selectedItems={filterDiseaseList}
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
    dataContainer: {
        width: 100,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1.5,
        borderColor: Color.textColor,
    },
    dataFilterContainer: {
        width: 100,
        marginTop: 33,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: Color.textColor,
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
        marginBottom: 50,
    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.colorPrimaryDark,
        padding: 5,
    },
    pointContainer: {
        height: 25,
        width: 25,
        borderRadius: 100,
        marginTop: -25,
        top: 10
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

export default DiseasesData;
