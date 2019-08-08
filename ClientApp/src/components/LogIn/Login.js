import React, { Component } from 'react';
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';
import logo from '../../logo.png';

class LoginForm extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.user_id !== this.state.user_id
    }

    handleChange (e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin () {
        
        let id= this.state.user_id;
        let pw= this.state.password;


        this.props.onLogin(id, pw).then(
            (success) => {
                if(this._isMounted) {
                    this.setState({
                        password: ''
                    });
                    console.log('handleLogin');
                }
            }
        )
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={logo} />
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input 
                                fluid icon='user' 
                                iconPosition='left' 
                                placeholder='ID' 
                                name='user_id'
                                onChange={this.handleChange}
                                value={this.state.user_id}
                            />
                            <Form.Input 
                                fluid 
                                icon='lock' 
                                iconPosition='left' 
                                placeholder='password' 
                                type='password'
                                name='password' 
                                onChange={this.handleChange}
                                value={this.state.password}
                            />

                            <Button 
                                color='teal' 
                                fluid size='large'
                                onClick={this.handleLogin}>
                                   Log In
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}


export default LoginForm;