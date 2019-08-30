import React, {Component} from 'react';
import {
    Container, Header, Content, Form, Item, Input, Label, Button, Toast, Text, Title
} from 'native-base';
import config from "../../public/config";
import i18n from "../../locales/Languages";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({isReady: true});

        const token = await SecureStore.getItemAsync("account.token");
        this.props.navigation.navigate('MainMenu')
    }

    login = () => {
        const data = {
            email: this.state.email.trim(),
            password: this.state.password,
            installationId: Constants.installationId
        };
        Toast.show({text: "Trying to logging you in..."});
        fetch(config.API_BASE_URL + "/accounts/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                response.json().then(json => {
                    Toast.show({text: "Login successful"});
                });
            } else {
                response.json().then(json => {
                    Toast.show({text: json.error});
                });
            }
        }).catch(reason => {
            Toast.show({text: "Could not connect to Server!"});
        });
    };

    switchToRegister = () => {
        this.props.navigation.navigate('Register');
    };

    render() {

        if (!this.state.isReady) {
            return <AppLoading/>;
        }

        return (
            <Container>
                <Header>
                    <Title>{i18n.t('navigation.auth.login.header')}</Title>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.login.email')}</Label>
                            <Input onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.login.password')}</Label>
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Button onPress={this.login} title={i18n.t('navigation.auth.login.login')}>
                            <Text>{i18n.t('navigation.auth.login.login')}</Text>
                        </Button>
                        <Button onPress={this.switchToRegister} title={i18n.t('navigation.auth.login.register')}>
                            <Text>{i18n.t('navigation.auth.login.register')}</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

