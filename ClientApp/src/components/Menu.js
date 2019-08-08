import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import axios from 'axios';


export class MenuRender extends Component {
    state = {}
    handleItemClick = name => {
        this.setState({ activeItem : name})
    }


    constructor (props) {
        super(props);
        this.state = {
            menu : []
        }

        axios.get('/Menu')
        .then(response => 
                response.data)
        .then(data => this.setState({
            menu : data
        }))
        
    }
    render() {
        const { data } = this.state.menu;
        const { activeItem } = this.state;
        return (
            !data ? <h2>hello</h2> : 
            <Menu.Item >
                <MenuHeader title="재고" />
                <MenuList 
                    data = { this.state.menu } 
                    active = {activeItem} 
                    clickEvent ={this.handleItemClick} 
                />
            </Menu.Item>
        )
    }
}


function MenuList ({data, activeItem, clickEvent}) {
    return (
        <Menu.Menu>
            {data.map(item => 
                <Menu.Item 
                    name = {item.TITLE} 
                    
                    active = {activeItem === item.url} 
                    onClick = {clickEvent} 
                />
            )}
        </Menu.Menu>
    )
}


function MenuHeader ({title}) {
    return(
        <Menu.Header> {title} </Menu.Header>
    );
}
