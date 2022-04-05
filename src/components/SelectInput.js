import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Color} from '../theme';
import {CustomPicker} from 'react-native-custom-picker';

const {width, height} = Dimensions.get('window');
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <View style={styles.optionContainer}>
        <View style={styles.pickerInnerContainer}>
          <Text
            style={{color: Color.textColor, fontWeight: '600', fontSize: 16}}>
            {getLabel(item)}
          </Text>
        </View>
      </View>
    );
  };

  renderHeader = (e) => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.modalHeaderTextStyle}>{e}</Text>
      </View>
    );
  };

  renderField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <>
        <View
          style={{
            ...styles.pickerContainer,
            borderColor: this.props.borderColor,
            paddingLeft: selectedItem ? 7 : 10,
            // borderWidth: selectedItem ? 1.8 : 1,
            // borderColor: selectedItem ? Color.blue : Color.textColor,
          }}>
          <View>
            {!selectedItem && (
              <Text
                style={{...styles.labelStyle, color: this.props.labelColor}}>
                {defaultText}
              </Text>
            )}
            {selectedItem && (
              <View style={styles.pickerInnerContainer}>
                <View
                  style={{
                    ...styles.activeLabelText,
                    backgroundColor: this.props.activeLabelBackgroundColor,
                  }}>
                  <Text
                    style={{
                      ...styles.activeLabelStyle,
                      color: this.props.activeLabelStyle,
                    }}>
                    {this.props.label}
                  </Text>
                </View>
                <Text style={styles.valueText}>{getLabel(selectedItem)}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.titleStyle}>
          <Text style={{...styles.titleText, color: this.props.titleColor}}>
            {this.props.title ? this.props.title : ''}
          </Text>
        </View>
      </>
    );
  };

  render() {
    const {placeholder, options, onValueChange, width, value, headerTemplate} =
      this.props;
    return (
      <View style={{width: width}}>
        <CustomPicker
          placeholder={placeholder}
          options={options}
          getLabel={(item) => item.label}
          value={value}
          fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          headerTemplate={() => this.renderHeader(headerTemplate)}
          onValueChange={onValueChange}
          modalStyle={{
            backgroundColor: Color.white,
            borderRadius: 10,
            paddingBottom: 20,
          }}
          maxHeight={height * 0.8}
        />
      </View>
    );
  }
}
SelectInput.defaultProps = {
  borderColor: Color.textColor,
  labelColor: Color.textColor,
  titleColor: Color.textColor,
  activeLabelStyle: Color.textColor,
  activeLabelBackgroundColor: Color.white,
};
const styles = StyleSheet.create({
  optionContainer: {
    width: '90%',
    padding: 10,
    borderBottomColor: Color.grey,
    backgroundColor: Color.lightgray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    alignSelf: 'center',
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pickerContainer: {
    //marginTop: -2,
    borderWidth: 1,
    height: 55.4,
    borderColor: Color.textColor,
    borderRadius: 4,
    justifyContent: 'center',
    paddingLeft: 7,
  },
  pickerInnerContainer: {
    paddingLeft: 4,
    // backgroundColor: Color.yellow,
  },
  headerFooterContainer: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '400',
    //color: Color.black,
  },
  labelText: {
    marginTop: -32,
    backgroundColor: Color.white,
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute',
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '900',
    color: Color.textColor,
    paddingBottom: 5,
  },
  activeLabelText: {
    marginTop: -26.5,
    backgroundColor: Color.white,
    paddingLeft: 4,
    paddingRight: 4,
    position: 'absolute',
  },
  activeLabelStyle: {
    fontSize: 12,
    fontWeight: '900',
    color: Color.textColor,
  },
  titleStyle: {
    marginTop: 2,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.textColor,
  },
  modalHeaderTextStyle: {
    color: Color.white,
    fontWeight: '700',
    fontSize: 17,
    backgroundColor: Color.blue,
    paddingHorizontal: 10,
    paddingBottom: 1,
    borderRadius: 4,
  },
});
