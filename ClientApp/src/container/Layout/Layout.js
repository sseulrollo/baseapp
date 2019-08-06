import React, { Component } from 'react';
import { 
    HeaderForm,
    MenuList
} from '../../components'
// import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import {
    Container,
    Divider,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Menu,
    Grid
} from 'semantic-ui-react';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



class Layout extends Component {
    state = {}

    handleSidebarHide = () => this.setState({sidebarOpened: false})

    handleToggle = () => this.setState({sidebarOpened: true});

    
    render() {
        const {children} = this.props
        const {sidebarOpened} = this.state

        return (
            <Responsive 
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar>
                    <MenuList />
                    <Menu.Item>
                        Log In
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
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
                    </Segment>
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

export default Layout;
