import React, {Component, Fragment } from 'react';
import {MenuComponent} from '../../components'

class MenuContainer extends Component {
    
    isMount = false;
    state = {}

    componentDidMount() {
        this.isMount = true;
        /// menu 불러오는 처리
        this.state = {
            data: []
        }
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    render() {
        const { data } = this.state 
        return () => (
            <MenuComponent 
                data = {data}
            />
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
        getMenu: () => {
            return dispatch(getMenu());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);