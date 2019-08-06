import React, { Component } from 'react';
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';
import logo from '../../logo.png';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state)
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

                            <Button color='teal' fluid size='large'>Log In</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}


export default LoginForm;