import React, { Component, Fragment } from 'react';
import MenuContainer  from '../../container/MenuContainer/MenuContainer'
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

class Layout extends Component {

    constructor(props) {
        super(props);
    }


    
    render() {
        return (
            <MobilContainer>
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
            </MobilContainer>
        )
    }
}
   

export default Layout;
