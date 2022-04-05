import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Color} from "../../theme";

class VitalTrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vitalList: [],
            allDateArray: [],
            vitalDateCombineArray: [],
        };
    }

    componentDidMount() {
        const {vitalList, allDateArray, vitalDateCombineArray} = this.props;
        this.setState({
            vitalList: vitalList,
            allDateArray: allDateArray,
            vitalDateCombineArray: vitalDateCombineArray,
        });
    }

    renderVitalData = (item, index) => {
        return (
            <View style={styles.nameTextContainer} key={index}>
                <Text style={styles.nameStyle}>{item}</Text>
            </View>
        );
    };

    renderAllVitalData = (item, index) => {
        const {vitalDateCombineArray, vitalList} = this.state;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {vitalDateCombineArray.length > 0 && vitalDateCombineArray.map((vital, key) => (
                    vitalList.length > 0 && vitalList.map((i, id) => (
                        vital.name === i
                            ?
                            <View key={id} style={styles.dataContainer}>
                                {vital.dateList.length > 0 && vital.dateList.map((date, dateId) => (
                                    item === date.date
                                        ?
                                        (<View style={styles.pointContainer}>
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

    renderFilterVitalData = (item, index) => {
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
        const {vitalList, allDateArray} = this.state;
        const {isFilterVitalSelect, filterVitalList} = this.props;
        return (
            <>
                <View style={styles.rowData}>
                    <View style={{flex: 0.3}}>
                        <View style={[styles.nameTextContainer, {marginLeft: 10}]}>
                            <Text numberOfLines={2} style={styles.nameStyle}>Vital/Item</Text>
                        </View>
                        {isFilterVitalSelect
                            ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={filterVitalList}
                                renderItem={({item, index}) => this.renderDrugFilterData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                            :
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={vitalList}
                                renderItem={({item, index}) => this.renderVitalData(item, index)}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        }
                    </View>
                    <View style={{flex: 0.7}}>
                        {isFilterVitalSelect
                            ?
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) => this.renderFilterVitalData(item, index)}
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
                                renderItem={({item, index}) => this.renderAllVitalData(item, index)}
                                keyExtractor={(item) => item.id}
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
        marginLeft: 10
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

export default VitalTrackerView;
