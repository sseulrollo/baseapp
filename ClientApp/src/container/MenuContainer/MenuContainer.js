import React, {Component, Fragment } from 'react';
import {MenuComponent} from '../../components';
import { menuRequest } from '../../module/SpCallModule'
import { connect } from 'react-redux';
import { has } from 'immutable';


const BoundaryHOC = ProtectedComponent => class Boundary extends Component{
    state= {
        hasError: false
    }

    componentDidMount = () => {
        this.setState({
            hasError: true
        });
    }

    render() {
        const { hasError } = this.state
        if(hasError) 
            return <ErrorFallback />
        else
            return <ProtectedComponent />
    }
}

const ErrorFallback = () => "Sorry"
const hocMenuComponent = BoundaryHOC(MenuComponent)

class MenuContainer extends Component {
    
    isMount = false;
    state = {
        activeItem: ''
    }

    constructor(props) {
        super(props)
        
        this.state = {
            data: [],
            user_id: this.props.user_id,
            status: 'INIT'
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.status === this.props.status;
    }

    componentDidMount() {
        this.isMount = true;
        /// menu 불러오는 처리
        this.props.menuRequest('mes')
            .then(() => {
                if(this.isMount) {
                    this.setState({
                        data: this.props.data
                    })}
            })
    }

    componentWillUnmount() {
        this.isMount = false;
    }
    
    handleItemClick = (e, {name}) => {
        this.setState({activeItem : name})

        // let nameing = '/' + name

        // this.props.history.push(nameing);
    }

    render() {
        const { data, activeItem } = this.state 
        return (
            <Fragment>
                <MenuComponent
                    data = {data}
                    onClick={this.props.click}
                    activeItem={activeItem}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.spcall.spcall.status,
        data: state.spcall.returnData.data,
        message: state.spcall.returnData.message
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        menuRequest: (user_id) => {
            return dispatch(menuRequest(user_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);