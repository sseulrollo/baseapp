import React, { Component } from 'react';
import { HeaderForm } from '../../components'
import { Container } from 'reactstrap';
import { Grid } from 'semantic-ui-react';

class Layout extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <HeaderForm />
                </Grid.Row>
                <Grid.Row>
                    <Container>
                        {this.props.children}
                    </Container>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Layout;
