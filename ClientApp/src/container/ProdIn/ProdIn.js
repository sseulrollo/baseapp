import React, {Component, Fragment} from 'react'
import { codeRequest, codeDynamicReq, loadRequest, executeRequest } from '../../module/SpCallModule'
import { connect } from 'react-redux';
import {ProdComponent, LoadTableSelect} from '../../components';


class ProdIn extends Component {

    _isMount = false;
    state = {
        comboData: [],
        gridData: []
    }

    constructor(props) {
        super(props)
        
        this.state = {
            comboData: [],
            gridData: [],
            user_id: this.props.user_id,
            status: 'INIT'
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data
        console.log('shouldComponentUpdate');
    }

    componentDidMount = async () => {
        this._isMount = true;

        await this.props.codeDynamicReq('WORK_SHOP')
            .then(() => {
                if(this._isMount)
                    this.setState({
                        comboData: this.props.data.data,
                        comboHeader: this.props.data.header
                    })           
            })

    }

    render() {
        const {comboData, comboHeader} = this.state
        
        return (
            
            <Fragment>
                { comboData.length > 0 ? 
                    <ProdComponent 
                        comboName='작업장' 
                        comboData={comboData} 
                        comboHeader= {comboHeader}
                    /> : 'Waiting' }  
                <LoadTableSelect sp_name="PK_PWA_LABEL_SCAN" />
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
        codeRequest: (gropu_id, where) => {
            return dispatch(codeRequest(gropu_id, where));
        },
        codeDynamicReq: (gropu_id, where) => {
            return dispatch(codeDynamicReq(gropu_id, where));
        },
        loadRequest: (sp, params) => {
            return dispatch(loadRequest(sp, params))
        },
        executeRequest: (sp, params) => {
            return dispatch(executeRequest(sp, params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdIn)
