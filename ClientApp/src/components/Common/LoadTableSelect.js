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
            params: props.params,
            _isLoading: props._isLoad
        }
    }

    componentDidMount = async() => {
        this._isMounted = true;
        
        this.getData();
    }

    async getData() {
        const { params } = this.props

        await this.props.loadSingleRequest(this.state.sp_name, params)
            .then(() => {
                if (this._isMounted)
                    this.setState({
                        gridData: this.props.data
                    });
            });
    }

  
    componentWillReceiveProps(nextProps) {
        if(nextProps.params !== this.props.params)
            this.getData();
    }

    render () {
        const {gridData, _isLoading} = this.state
        
        return (
            <Fragment>{
                gridData !== undefined?                     
                    <SelectRowTable 
                        gridData={gridData} 
                        _isLoad={_isLoading}
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
        header: state.spcall.returnData.header,
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