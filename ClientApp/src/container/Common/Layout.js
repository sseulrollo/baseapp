import React, { Component, Fragment } from 'react';
import {MenuContainer, Login } from '..'///MenuContainer/MenuContainer'
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
    Grid,
    Visibility
} from 'semantic-ui-react';
import logo from '../../logo.png';

import Cookies from 'js-cookie';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const {children} = this.props
        const {fixed} = this.state

        return (
            <Responsive
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 30, padding:'1em 0em'}}
                        vertical
                    >
                        <MenuContainer click={this.handleItemClick} />
                    </Segment>
                </Visibility>
                {children}
            </Responsive>
        )
    }
}

class MobilContainer extends Component {
// class Layout extends Component {
    state = {
        sidebarOpened: false,
        activeItem: ''
    }

        
    handleItemClick = (e, {name}) => {
        this.setState({activeItem : name})
    }

    handleSidebarHide = () => this.setState({sidebarOpened: false})

    handleToggle = () => this.setState({sidebarOpened: true});

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.activeItem !== this.props.activeItem ||
            nextProps.sidebarOpened !== this.props.sidebarOpened
            || nextProps.sidebarOpened === undefined
    }
    
    render() {
        const {children} = this.props
        const {sidebarOpened} = this.state

        return (
             <Responsive 
                 as={Sidebar.Pushable}
                 getWidth={getWidth}
                 maxWidth={Responsive.onlyMobile.maxWidth}
                 minHeight={Responsive.onlyMobile.maxHeight}
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
                    <MenuContainer click={this.handleItemClick} />
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

const ResponsiveContainer  = ({children}) => (
    <Fragment>
        <DesktopContainer>{children}</DesktopContainer>
        <MobilContainer>{children}</MobilContainer>
    </Fragment>
)

const NonLogin = (children) => {
    
    this.props.history.push('/LogIn');
}

class Layout extends Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        
        if (Cookies.get('key') === undefined || Cookies.get('key') === null)
            return <Login />
        else
            return (
                <ResponsiveContainer>
                    <Segment
                        style={{padding: '1em 0em' }} vertical>
                        <Container>
                            <Grid container stackable verticalAlign='middle'>
                                <Grid.Row style={{minHeight: 500}}>
                                    <Grid.Column width={3}  >
                                        {this.props.children}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                    <Segment
                        style={{padding: '2em 1em' }} vertical>
                        <Container>
                            <Grid container stackable>
                                <Grid.Row>
                                    <p>Dabom prototype.</p>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                </ResponsiveContainer> 
            )
        // else
        //     this.props.history.push('/LogIn');
    }
}
   

export default Layout;
