import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../theme';

class DrugTrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugList: [],
            allDateArray: [],
            drugDateCombineArray: [],
        };
    }

    componentDidMount() {
        const {drugList, allDateArray, drugDateCombineArray} = this.props;
        this.setState({
            drugList: drugList,
            allDateArray: allDateArray,
            drugDateCombineArray: drugDateCombineArray,
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
                <Text numberOfLines={1} style={styles.nameStyle}>{item}</Text>
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
                            <View key={id} style={styles.dataContainer}>
                                {drug.dateList.length > 0 && drug.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={date.dosage === '1'
                                            ? [styles.pointContainer]
                                            :
                                            date.dosage === '2'
                                                ?
                                                [styles.pointContainer]
                                                :
                                                [styles.pointContainer]}>
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
        const {drugDateCombineArray} = this.state;
        const {filterDrugList} = this.props;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {drugDateCombineArray.length > 0 && drugDateCombineArray.map((drug, key) => (
                    filterDrugList.length > 0 && filterDrugList.map((i, id) => (
                        drug.drugName === i
                            ?
                            <View key={id} style={styles.dataContainer}>
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

    render() {
        const {drugList, allDateArray, isFilterSelect} = this.state;
        const {filterDrugList, isFilterDrugSelect} = this.props;
        return (
            <>
                <View style={styles.rowData}>
                    <View style={{flex: 0.3}}>
                        <View style={[styles.nameTextContainer, {marginLeft: 10}]}>
                            <Text numberOfLines={2} style={styles.nameStyle}>Medicines/Item</Text>
                        </View>
                        {isFilterDrugSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={filterDrugList}
                                renderItem={({item, index}) => this.renderDrugFilterData(item, index)}
                                keyExtractor={(item) => item}
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
                                keyExtractor={(item) => item}
                                extraData={this.state}
                            />
                        }
                    </View>
                    <View style={{flex: 0.7}}>
                        {isFilterDrugSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) => this.renderFilterDrugData(item, index)}
                                keyExtractor={(item) => item}
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
                                keyExtractor={(item) => item}
                                extraData={this.state}
                            />
                        }
                    </View>
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
        marginBottom: 6,
    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: Color.textColor,
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

export default DrugTrackerView;
