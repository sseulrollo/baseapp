import React, {Component, Fragment} from 'react';
import {Menu} from 'semantic-ui-react';

class MenuComponent extends Component{

    _isMount = false;

    state = {}

    constructor (props) {
        super(props);

        this.setState({
            data = this.props.data
        })
    }

    componentDidMount () {
        this._isMount = true;
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    render () {

        const menuItems = menuList.map(
            item => {
                const { type, title, route, clickActive } = item.toJS();
                if (type === 'H')
                    return <MenuHeader title={{title}} />
                else
                    return <MenuItem 
                                title={title} 
                                clickActive={clickActive} 
                                route={route} 
                            />            
        });
        console.log(menuItems)
        return (
            <Fragment>
                {menuItems}
            </Fragment>
        )
    }  
}



const MenuHeader = ({title}) => (   
    <Menu.Header> {title} </Menu.Header>
)

const MenuItem = ({title, route, clickActive}) => (
    <MenuList 
        title={title} 
        onClick={clickActive}
        activItem={route}
    />
)

const MenuRender = () => (
    <MenuList />
);

export default MenuComponent;