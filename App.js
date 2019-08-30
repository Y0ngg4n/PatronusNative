import React from 'react';
import {Container, Root} from "native-base";
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
//Authentication
import Login from './src/screens/Authentication/Login';
import Register from './src/screens/Authentication/Register';

import MainMenu from "./src/screens/MainMenu/MainMenu";

const AuthenticationStack = createSwitchNavigator({Login: Login, Register: Register},
    {
        defaultNavigationOptions: {
            header: null
        }
    });

const AppContainer = createAppContainer(createStackNavigator(
    {
        Authentication: AuthenticationStack,
        MainMenu: MainMenu
    },
    {
        initialRouteName: 'Authentication',
        defaultNavigationOptions: {
            header: null
        }
    }
));


export default () =>
    <Root>
        <AppContainer/>
    </Root>
