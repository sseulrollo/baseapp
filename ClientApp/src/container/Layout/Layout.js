import React, { Component, Fragment } from 'react';
import { 
    HeaderForm,
    MenuList
} from '../../components'
// import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import {
    Container,
    Button,
    Responsive,
    Segment,
    Sidebar,
    Icon,
    Menu,
    Image,
    Grid
} from 'semantic-ui-react';
import logo from '../../logo.png';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



class MobilContainer extends Component {
// class Layout extends Component {
    state = {
        sidebarOpened: false
    }

    // hideFixedMenu = () => this.setState({ fixed: false })
    // showFixedMenu = () => this.setState({ fixed: true })

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
                <Sidebar
                    onHide={this.handleSidebarHide}
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >                    
                    <Menu.Item>
                        Hello
                    </Menu.Item>
                    <Menu.Item>
                        Stranger
                    </Menu.Item>
                    <Menu.Item>
                        Movie
                    </Menu.Item>
                    <Menu.Item>
                        Imagin
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher
                    dimmed={sidebarOpened}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        vertical
                        style={{ maxHeight: 150, padding: '1em 0em' }}
                    >
                        <Container>
                            <Menu
                                inverted
                                pointing
                                secondary
                                size='large'>
                                <Menu.Item>
                                    <Image src={logo} size='tiny' />
                                </Menu.Item>
                                <Menu.Item onClick={this.handleToggle}  position='right'>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                    {children}
                </Sidebar.Pusher>
             </Responsive>
        )
    }
}

// MobilContainer.prototype = {
//     children: PropTypes.node
// }


// const HeaderLaycontainer = ({children}) => (
//     <Fragment>
//         <MobilContainer>{children}</MobilContainer>
//     </Fragment>
// )

// HeaderLaycontainer.prototype = {
//     children: PropTypes.node
// }

const Layout = () => (
    <MobilContainer>
        <Segment
            style={{padding: '2em 0em' }} vertical>
            <h2>Hello</h2>
            <p>학교종이</p>
            <p>땡땡땡</p>
            <p>어서 모이자</p>
            <p>선생님이</p>
            <p>우리를</p>
            <p>기다리신다.</p>
        </Segment>
    </MobilContainer>
)

export default Layout;
