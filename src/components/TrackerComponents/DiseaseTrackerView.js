import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import Notes from '../UserInput/Notes';
import {Neomorph} from 'react-native-neomorph-shadows';
import ModalSaveButton from '../Neo/SaveButton';

class DiseaseTrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseasesList: [],
            allDateArray: [],
            diseaseDateCombineArray: [],
            isModalOpen: false,
            itemName: '',
            selectDate: '',
            value: null,
            valueError: false,
            valueErrorMessage: '',
            note: '',
            noteError: false,
            noteErrorMessage: '',
        };
    }

    componentDidMount() {
        const {diseasesList, allDateArray, diseaseDateCombineArray} = this.props;
        this.setState({
            diseasesList: diseasesList,
            allDateArray: allDateArray,
            diseaseDateCombineArray: diseaseDateCombineArray,
        });
    }

    renderDiseaseData = (item, index) => {
        return (
            <View
                style={
                    this.state.diseasesList.length < 10
                        ? styles.nameTextContainer
                        : [
                            styles.nameTextContainer,
                            {
                                paddingTop: 5,
                                paddingBottom: 5,
                            },
                        ]
                }
                key={index}>
                <Text numberOfLines={2} style={[styles.nameStyle]}>
                    {item}
                </Text>
            </View>
        );
    };

    renderDiseaseFilterData = (item, index) => {
        return (
            <View
                style={
                    this.state.diseasesList.length < 10
                        ? styles.nameTextContainer
                        : [
                            styles.nameTextContainer,
                            {
                                paddingTop: 10,
                                paddingBottom: 10,
                            },
                        ]
                }
                key={index}>
                <Text numberOfLines={2} style={styles.nameStyle}>
                    {item}
                </Text>
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
                {diseaseDateCombineArray.length > 0 &&
                diseaseDateCombineArray.map(
                    (disease, key) =>
                        diseasesList.length > 0 &&
                        diseasesList.map((i, id) =>
                            disease.diseaseName === i ? (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            isModalOpen: true,
                                            itemName: disease.diseaseName,
                                            selectDate: item,
                                        })
                                    }
                                    key={id}
                                    style={styles.dataContainer}>
                                    {disease.dateList.length > 0 &&
                                    disease.dateList.map((date, dateId) =>
                                        item === date.date ? (
                                            <View
                                                key={dateId}
                                                style={
                                                    date.level === 'high' || date.level === '1'
                                                        ? [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.red},
                                                        ]
                                                        : date.level === 'medium' || date.level === '2'
                                                        ? [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.yellow},
                                                        ]
                                                        : [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.green},
                                                        ]
                                                }
                                            />
                                        ) : null,
                                    )}
                                </TouchableOpacity>
                            ) : null,
                        ),
                )}
            </View>
        );
    };

    renderFilterDiseaseData = (item, index) => {
        const {diseaseDateCombineArray} = this.state;
        const {filterDiseasesList} = this.props;
        return (
            <View style={{flexDirection: 'column', display: 'flex'}} key={index}>
                <View style={styles.dateDataContainer}>
                    <Text style={styles.dateStyle}>{item}</Text>
                </View>
                {diseaseDateCombineArray.length > 0 &&
                diseaseDateCombineArray.map(
                    (disease, key) =>
                        filterDiseasesList.length > 0 &&
                        filterDiseasesList.map((i, id) =>
                            disease.diseaseName === i ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.setState({isModalOpen: true,});
                                        console.log('item');
                                        console.log(item);
                                        console.log(disease.diseaseName);
                                    }}
                                    key={id}
                                    style={styles.dataContainer}>
                                    {disease.dateList.length > 0 &&
                                    disease.dateList.map((date, dateId) =>
                                        item === date.date ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // this.setState({isModalOpen: true,});
                                                    console.log('item');
                                                    console.log(item);
                                                    console.log(date.date);
                                                    console.log(disease.diseaseName);
                                                }}
                                                key={dateId}
                                                style={
                                                    date.level === 'high' || date.level === '1'
                                                        ? [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.red},
                                                        ]
                                                        : date.level === 'medium' || date.level === '2'
                                                        ? [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.yellow},
                                                        ]
                                                        : [
                                                            styles.pointContainer,
                                                            {backgroundColor: Color.green},
                                                        ]
                                                }
                                            />
                                        ) : null,
                                    )}
                                </TouchableOpacity>
                            ) : null,
                        ),
                )}
            </View>
        );
    };

    updateData = () => {
        const self = this;
        const {value, note, itemName, selectDate} = this.state;
        // updateTrackerValues(itemName, 'drug', value, selectDate)
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
        //                 noteErrorMessage: '',
        //             });
        //         }
        //     })
        //     .catch(async (error) => {
        //         if (error.response !== undefined && error.response.status === 401) {
        //             await logout();
        //             self.props.navigation.replace('Login');
        //         }
        //         if (error.response !== undefined && error.response.status === 500) {
        //             self.showToast(ErrorHandler('Please Try After Sometimes!!!'));
        //         }
        //     });
    };

    render() {
        const {
            diseasesList,
            allDateArray,
            isModalOpen,
            itemName,
            selectDate,
            value,
            valueError,
            valueErrorMessage,
            note,
            noteError,
            noteErrorMessage,
        } = this.state;
        const {isFilterDiseaseSelect, filterDiseasesList} = this.props;
        return (
            <View style={{}}>
                <View style={styles.rowData}>
                    <View style={{flex: 0.3}}>
                        <View style={[styles.nameTextContainer, {marginLeft: 10}]}>
                            <Text numberOfLines={2} style={[styles.nameStyle]}>
                                Diseases/Item
                            </Text>
                        </View>
                        {isFilterDiseaseSelect ? (
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={filterDiseasesList}
                                renderItem={({item, index}) =>
                                    this.renderDiseaseFilterData(item, index)
                                }
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        ) : (
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                key={'flat list'}
                                data={diseasesList}
                                renderItem={({item, index}) =>
                                    this.renderDiseaseData(item, index)
                                }
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        )}
                    </View>
                    <View style={{flex: 0.7}}>
                        {isFilterDiseaseSelect ? (
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) =>
                                    this.renderFilterDiseaseData(item, index)
                                }
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        ) : (
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flat list'}
                                data={allDateArray}
                                renderItem={({item, index}) =>
                                    this.renderAllDiseaseData(item, index)
                                }
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        )}
                    </View>
                </View>
                <Modal
                    testID={'modal'}
                    transparent={true}
                    animationIn={'slideInUp'}
                    animationInTiming={500}
                    animationOut={'slideOutDown'}
                    animationOutTiming={100}
                    backdropOpacity={0.2}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    isVisible={isModalOpen}
                    style={styles.QRView}>
                    <View style={[styles.contentQRModal]}>
                        <Text
                            style={{
                                marginRight: 50,
                                // backgroundColor: Color.yellow,
                                fontSize: 17,
                                fontWeight: '700',
                                color: Color.textColor,
                                textAlign: 'center',
                                marginTop: 5,
                            }}>
                            Update Tracker
                        </Text>
                        <Text
                            style={{
                                marginRight: 50,
                                //backgroundColor: Color.yellow,
                                fontSize: 17,
                                fontWeight: '700',
                                color: Color.blue,
                                textAlign: 'center',
                                marginTop: 5,
                                marginBottom: 10,
                            }}>
                            {itemName.toUpperCase()}
                        </Text>
                        <ScrollView
                            onContentSizeChange={this.onContentSizeChange}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}>
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: Color.lightgrey,
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    padding: 10,
                                }}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    {/* ************* for 1 parameters ************** */}
                                    {/* <View
                    style={[
                      styles.textField,
                      {
                        width: '100%',
                        paddingTop: 10,
                      },
                    ]}>
                    <OutlinedTextField
                      label="Enter Value"
                      title="error message"
                      tintColor={Color.colorPrimaryDark}
                      fontSize={18}
                      labelFontSize={16}
                      lineWidth={1}
                      suffix={'mg/dl'}
                    />
                  </View> */}
                                    {/* ************* for 2 parameters ************** */}
                                    <View
                                        style={[
                                            styles.textField,
                                            {
                                                width: '49%',
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                ...styles.smallTextHighlightStyle,
                                                textAlign: 'left',
                                                //paddingTop: 4,
                                                paddingBottom: 10,
                                            }}>
                                            Pre prandial{' '}
                                        </Text>
                                        <OutlinedTextField
                                            label="Enter Value"
                                            title="error message"
                                            tintColor={Color.colorPrimaryDark}
                                            fontSize={18}
                                            labelFontSize={16}
                                            lineWidth={1}
                                            suffix={'mg/dl'}
                                        />
                                    </View>
                                    <View style={{width: '2%'}}/>
                                    <View
                                        style={[
                                            styles.textField,
                                            {
                                                width: '49%',
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                ...styles.smallTextHighlightStyle,
                                                textAlign: 'left',
                                                //paddingTop: 4,
                                                paddingBottom: 10,
                                            }}>
                                            Post prandial{' '}
                                        </Text>
                                        <OutlinedTextField
                                            label="Enter Value"
                                            title="error message"
                                            tintColor={Color.colorPrimaryDark}
                                            fontSize={18}
                                            labelFontSize={16}
                                            lineWidth={1}
                                            suffix={'mg/dl'}
                                        />
                                    </View>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.smallTextStyle}>Date & Time : </Text>
                                    <Text style={styles.smallTextHighlightStyle}>
                                        {selectDate}
                                    </Text>
                                </View>
                            </View>
                            <Notes
                                onLongPress={() => alert('Props Not Yet set ?')}
                                mainContainerColor={Color.white}
                                userNotesContainerColor={Color.lightgray}
                                textInputContainer={Color.silver}
                                //notesBorderColor={Color.white}
                            />
                            {/* <CardView heading={'Notes'}>
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
              </CardView> */}
                            <View
                                style={{
                                    alignSelf: 'center',
                                }}>
                                <ModalSaveButton onPress={this.updateData}/>
                                {/* <Button title="Submit" onPress={this.updateData} /> */}
                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() =>
                                this.setState({
                                    isModalOpen: false,
                                    itemName: '',
                                    selectDate: '',
                                    valueError: false,
                                    value: null,
                                    valueErrorMessage: '',
                                    note: '',
                                    noteError: false,
                                    noteErrorMessage: '',
                                })
                            }
                            style={styles.hideSymbol}>
                            <Neomorph
                                style={{
                                    width: 40,
                                    height: 40,
                                    shadowRadius: 1,
                                    shadowOffset: {width: 1, height: 1},
                                    borderRadius: 8,
                                    backgroundColor: Color.primaryNeo,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    resizeMode: 'contain',
                                }}>
                                <Icon
                                    name="close"
                                    size={30}
                                    color={Color.textColor}
                                    style={{textAlign: 'right'}}
                                />
                            </Neomorph>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* <Modal
              testID={'modal'}
              transparent={true}
              animationIn={'slideInUp'}
              animationInTiming={2000}
              animationOut={'slideOutDown'}
              animationOutTiming={100}
              backdropOpacity={0.2}
              useNativeDriver={true}
              hideModalContentWhileAnimating={true}
              isVisible={isModalOpen}
              style={styles.QRView}>
              <View style={[styles.contentQRModal]}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: Color.colorPrimaryDark,
                    textAlign: 'center',
                    marginTop: 30,
                  }}>
                  Update {itemName.toUpperCase()} Tracker
                </Text>
                <ScrollView
                  onContentSizeChange={this.onContentSizeChange}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps={'always'}>
                  <CardView heading={itemName}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
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
                        <Text style={{fontWeight: '500', fontSize: 14}}>
                          Mg/dl
                        </Text>
                      </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={{fontWeight: '600', fontSize: 18}}>
                        Date & Time :{' '}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 18,
                          color: Color.borderColor,
                        }}>
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
                  <View
                    style={{
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginBottom: 20,
                    }}>
                    <Button title="Submit" onPress={this.updateData} />
                  </View>
                </ScrollView>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    this.setState({
                      isModalOpen: false,
                      itemName: '',
                      selectDate: '',
                      valueError: false,
                      value: null,
                      valueErrorMessage: '',
                      note: '',
                      noteError: false,
                      noteErrorMessage: '',
                    })
                  }
                  style={styles.hideSymbol}>
                  <Icon
                    name="close"
                    size={30}
                    color={Color.textColor}
                    style={{textAlign: 'right'}}
                  />
                </TouchableOpacity>
              </View>
            </Modal> */}
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
        //backgroundColor: Color.yellow,
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
        //backgroundColor: Color.yellow,
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
        height: 25,
        width: 25,
        borderRadius: 100,
        marginTop: -25,
        top: 10,
    },
    QRView: {
        justifyContent: 'center',
        margin: 10,
    },
    hideSymbol: {
        position: 'absolute',
        right: 0,
        top: 0,
        // margin: 20,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 5,
        marginBottom: 10,
    },
    contentQRModal: {
        backgroundColor: Color.white,
        padding: 15,
        paddingTop: 15,
        borderRadius: 10,
        minHeight: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
    },

    /// kishore
    subTitlesText: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.blue,
        // paddingRight: 5,
        //backgroundColor: Color.red,
    },
    dataTextStyle: {
        color: Color.textColor,
        fontWeight: '600',
        fontSize: 16,
        //marginLeft: 5,
        //paddingRight: 30,
        //marginRight: 5,
        //backgroundColor: Color.yellow,
    },
    designationTextHighlight: {
        fontSize: 14,
        fontWeight: '700',
        color: Color.textColor,
    },
    smallTextStyle: {
        color: Color.textColor,
        fontWeight: '500',
        fontSize: 13,
        // marginLeft: 5,
        //paddingRight: 30,
        // marginRight: 5,
    },
    smallTextHighlightStyle: {
        color: Color.textColor,
        fontWeight: '700',
        fontSize: 13,
        // marginLeft: 5,
        //paddingRight: 30,
        // marginRight: 5,
    },
});

export default DiseaseTrackerView;
