import React, {Component} from 'react';
import {
    Container, Header, Content, Form, Item, Input, Label, Button, Toast, Title, Text
} from 'native-base';
import i18n from "../../locales/Languages";
import {AppLoading} from "expo";
import Constants from "expo-constants";
import config from "../../public/config";
import Login from "./Login";


export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            nickname: ''
        };
    }

    async componentDidMount() {
        this.setState({isReady: true});
    }

    register = () => {

        if (this.state.password !== this.state.repeatPassword) {
            Toast.show({text: "Passwords do not match"});
            return;
        }

        const data = {
            email: this.state.email.trim(),
            password: this.state.password,
            nickname: this.state.nickname,
            installationId: Constants.installationId
        };
        Toast.show({text: "Trying to register your account..."});
        fetch(config.API_BASE_URL + "/accounts/register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                response.json().then(json => {
                    Toast.show({text: "Register successful"});
                    console.log(json);
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

    switchToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    render() {

        if (!this.state.isReady) {
            return <AppLoading/>;
        }

        return (
            <Container>
                <Header>
                    <Title>{i18n.t('navigation.auth.register.header')}</Title>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.register.email')}</Label>
                            <Input onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.register.password')}</Label>
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.register.repeatPassword')}</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(text) => this.setState({repeatPassword: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{i18n.t('navigation.auth.register.nickname')}</Label>
                            <Input onChangeText={(text) => this.setState({nickname: text})}/>
                        </Item>
                        <Button onPress={this.register} title={i18n.t('navigation.auth.register.register')}>
                            <Text>{i18n.t('navigation.auth.register.register')}</Text>
                        </Button>
                        <Button onPress={this.switchToLogin} title={i18n.t('navigation.auth.register.login')}>
                            <Text>{i18n.t('navigation.auth.register.login')}</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

