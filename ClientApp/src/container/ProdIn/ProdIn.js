import React, {Component, Fragment} from 'react'
import { codeRequest, codeDynamicReq, loadRequest, executeRequest } from '../../module/SpCallModule'
import { connect } from 'react-redux';
import {ProdComponent, LoadTableSelect, SelectRowTable, SearchForm} from '../../components';
import {Loader} from 'semantic-ui-react'

class ProdIn extends Component {

    _isMount = false;
    // params = [];
    state = {
        comboData: [],
        gridData: []
    }

    constructor(props) {
        super(props)
        
        this.state = {
            comboData: [],
            user_id: this.props.user_id,
            status: 'INIT',
            _isLoad: false,
            comboValue: '',
            selectParams: [],
            addParams: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data
            || nextState !== this.state
    }

    componentDidMount = async () => {
        this._isMount = true;

        await this.props.codeDynamicReq('WORK_SHOP')
            .then(() => {
                if(this._isMount){
                    this.setState({
                        comboData: this.props.data,
                        comboHeader: this.props.header
                    })     
                }      
            })
    }

    valueChange = (names, data) => {
        
        this.setState({
            [names]: data
        })

        if(this.state.selectParams !== undefined && this.state.selectParams.length> 0 )
            this.state.selectParams = this.state.selectParams.filter(item => item.id !== names)
        this.state.selectParams = this.state.selectParams.concat({id:names, value:data});
        
    }

    
    valueAdded = (names, data) => {
        
        this.setState({
            [names]: data
        })

        if(this.state.addParams !== undefined && this.state.addParams.length> 0 )
            this.state.addParams = this.state.addParams.filter(item => item.id !== names)
        this.state.addParams = this.state.addParams.concat({id:names, value:data});
        
    }

    render() {
        const {comboData, comboHeader} = this.state

        if(comboData !== undefined && comboData.length > 0){
            const controlList = [{
                key: 'WORK_SHOP_ID',
                name: '작업장',
                type: 'combo',
                data: comboData,
                header: comboHeader,
                commandType: 'new',       
            }, {
                key: 'lot_no',
                name: 'LOT No',
                type: 'text',
                commandType: 'add' 
            }]
            
            return (
                
                <Fragment>                    
                    <SearchForm 
                        controlList={controlList} 
                        onAdded={this.valueAdded} 
                        onNew= {this.valueChange}
                    />                    
                    <SelectRowTable
                        sp_name="PK_PWA_LABEL_SCAN" 
                        loaded={this.state._isLoad} 
                        selectParams={this.state.selectParams}
                        addParams={this.state.addParams}
                    />
                </Fragment>
        )} else {
            return (
                <Fragment>
                    <Loader />
                </Fragment>
            )
        }
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
