import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';

class FacebookTabBar extends React.Component {
    icons = [];

    constructor(props) {
        super(props);
        this.icons = [];
    }

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
    }

    setAnimationValue({value}) {
        this.icons.forEach((icon, i) => {
            const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    }

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 59 + (204 - 59) * progress;
        const green = 89 + (204 - 89) * progress;
        const blue = 152 + (204 - 152) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    render() {
        return <View style={[styles.tabs, this.props.style]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                    <Text style={this.props.activeTab === i ?
                        {color: 'rgb(59,89,152)', fontWeight: '900', fontSize: 16}
                        : {color: 'rgb(204,204,204)', fontWeight: '500', fontSize: 14}}>
                        {tab}
                    </Text>
                    <View style={this.props.activeTab === i ? {
                        height: 3,
                        width: (tab.length * 9) < 70 ? (tab.length * 9 + 10) : (tab.length * 9 - 5),
                        marginTop: 2,
                        backgroundColor: Color.blue,
                    } : null}/>
                </TouchableOpacity>;
            })}
        </View>;
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: Color.lightgray,
    },
});

export default FacebookTabBar;
