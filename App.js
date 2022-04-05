import React, {Component} from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TrackerScreen from './src/Screen/TrackerScreen';

const RootStack = createStackNavigator();

global.currentScreenIndex = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    RootStackScreen = () => (
        <RootStack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
            <RootStack.Screen name="TrackerScreen" component={TrackerScreen}/>
        </RootStack.Navigator>
    );

    async componentDidMount() {
        this.authSubscription = auth().onAuthStateChanged((user) => {
            console.log(user);
            this.setState({
                loading: false,
                user,
            });
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
    }
}

export default App;
