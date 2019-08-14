import React, {Component, Fragment} from 'react';
import { SelectRowTable } from '../SingleComponent';
import { loadRequest, loadSingleRequest } from '../../module/SpCallModule'
import { connect } from 'react-redux';


class LoadTableSelect extends Component {

    _isMounted = false;

    state = {
        sp_name: '',
        params: {},
        gridData: []
    }

    constructor(props) {
        super(props);

        this.state = {
            sp_name: props.sp_name,
            params: props.params
        }
    }

    componentDidMount = async() => {
        this._isMounted = true;
        
        await this.props.loadSingleRequest(this.state.sp_name).then(() => {
            if(this._isMounted)
                this.setState({
                    gridData: this.props.data
                })
        })
    }

    render () {
        const {gridData} = this.state
        
        return (
            <Fragment>{
                gridData !== undefined?                     
                    <SelectRowTable 
                        gridData={gridData} 
                    /> : 'Loading...' 
                }
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
        loadRequest: (sp, params) => {
            return dispatch(loadRequest(sp, params))
        },    
        loadSingleRequest: (sp, params) => {
            return dispatch(loadSingleRequest(sp, params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadTableSelect)