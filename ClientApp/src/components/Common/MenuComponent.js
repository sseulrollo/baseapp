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
        const lender =  data.map(
            item => {
                const { attr, title, url, menU_ID } = item;
                if (attr === 'F')
                    return <MenuHeader title={title} key={menU_ID} />
                else
                    return <MenuItem 
                                title={title} 
                                url={url} 
                                keys={menU_ID}
                                key={menU_ID}
                                onClick={this.props.onClick}
                                activeItem ={this.props.activeItem}
                            />            
        });

        return lender
    }

    render () {
        const { data } = this.props;
        return (
            <Fragment>
                { data === [] || data === undefined ? this.loading() : this.lenderMenuItems() }
            </Fragment>
        )
    }  
}



const MenuHeader = ({title}) => (   
    <Menu.Item header> {title} </Menu.Item>
)

const MenuItem = ({title, url, keys, onClick, activeItem}) => (
    // <Fragment>
    <Menu.Item 
        name={url}
        as={NavLink}
        key={keys}
        activItem={url}
        to={'/' + url}
        onClick={onClick}
        active={activeItem === url}
    >{title} 
    </Menu.Item>
    // </Fragment>
)


export default MenuComponent;