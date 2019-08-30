import React, {Component} from 'react';
import {Footer, FooterTab, Button, Text, Icon, Container, Header} from "native-base";
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";

const BottomTabNavigator = createBottomTabNavigator({
    CreateGame: CreateGame,
    JoinGame: JoinGame
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: props => {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical onPress={()=> props.navigation.navigate('JoinGame')}>
                        <Icon/>
                        <Text>JoinGame</Text>
                    </Button>
                    <Button vertical onPress={()=> props.navigation.navigate('CreateGame')}>
                        <Icon/>
                        <Text>CreateGame</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
});


export default class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.AppContainer = createAppContainer(BottomTabNavigator);
    }

    render() {
        return (
            <Container>
                <Header/>
                <this.AppContainer/>
            </Container>
        );
    }
}

MainMenu.router = BottomTabNavigator.router;
