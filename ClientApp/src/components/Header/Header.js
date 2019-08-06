import React from 'react';
import './Header.css';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';


const HeaderForm = () => (
    <Grid>
        <Grid.Row columns={5} >
            <Grid.Column floated='left'>
                  
            </Grid.Column>
            <Grid.Column floated='left' >
                <Header as='h3' color='teal' textAlign='center'>Prototype App</Header>
            </Grid.Column>
            <Grid.Column floated='right'>
                <Button icon colo='red'>
                    <Icon name='key' size='large' />
                </Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default HeaderForm;