import React, {Component, Fragment} from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';


class MenuComponent extends Component{

    _isMount = false;

    state = {
        activeItem: ''
    }

    constructor (props) {
        super(props);

        this.setState({
            data : this.props.data
        })

    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data
    }

    loading () {
        return (
        <Menu.Item type='a'>
            Hello
        </Menu.Item>
    )}

    lenderMenuItems = () => {
        const { data } = this.props;
        return data.map(
            item => {
                const { attr, title, url, menU_ID } = item;
                if (attr === 'H')
                    return <MenuHeader title={{title}} />
                else
                    return <MenuItem 
                                title={title} 
                                url={url} 
                                key={menU_ID}
                                onClick={this.props.onClick}
                                activeItem ={this.activeItem}
                            />            
        });
    }

    render () {
        const { data } = this.props;
        return (
            <Fragment>
                { data === [] ? this.loading() : this.lenderMenuItems() }
            </Fragment>
        )
    }  
}



const MenuHeader = ({title}) => (   
    <Menu.Item header> {title} </Menu.Item>
)

const MenuItem = ({title, url, onClick, activeItem}) => (
    <Menu.Item 
        name={url}
        as={NavLink}
        activItem={url}
        to={'/' + url}
        onClick={onClick}
        active={activeItem === url}
    >{title} </Menu.Item>
)


export default MenuComponent;