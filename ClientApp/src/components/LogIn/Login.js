import React from 'react';
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';
import logo from 'logo.png';

const InpuForm = () => (
    <Form size='large'>
        <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='ID' />
            <Form.Input 
                fluid 
                icon='lock' 
                iconPosition='left' 
                placeholder='password' 
                type='password' 
            />

            <Button color='teal' fluid size='large'>Log In</Button>
        </Segment>
    </Form>
)

const LoginForm = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src={logo} /> Log in
            </Header>
            <InpuForm />
        </Grid.Column>
    </Grid>
);


export default LoginForm;