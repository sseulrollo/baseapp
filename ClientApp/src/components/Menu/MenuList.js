import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';


const MenuList = ({menuList}) => {
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
    })
      
    return (
        <Menu>
            {menuItems}
        </Menu>
    )
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