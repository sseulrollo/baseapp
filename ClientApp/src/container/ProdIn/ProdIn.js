import React, {Component, Fragment} from 'react'
import { codeRequest, codeDynamicReq, loadRequest, executeRequest } from '../../module/SpCallModule'
import { connect } from 'react-redux';
import {ProdComponent, CommandButton, SelectRowTable, SearchForm} from '../../components';
import {Loader, Grid} from 'semantic-ui-react'

class ProdIn extends Component {

    _isMount = false;
    state = {
        comboData: [],
        gridData: []
    }

    loadSp= "PK_PWA_LABEL_SCAN" ;
    saveSp= 'PK_PWA_LABEL_SAVE';
    delSp= '';

    constructor(props) {
        super(props)
        
        this.state = {
            comboData: [],
            user_id: this.props.user_id,
            status: 'INIT',
            _isLoad: false,
            comboValue: '',
            selectParams: [],
            addParams: [],
            selectedList: [],
            _isDel: false
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

    buttonClickEvent = (types) => {
        const {selectedList} = this.state
        if(types === "save") {
            console.log('h')
            this.props.executeRequest(this.saveSp, {
                values: selectedList
            }).catch(e => console.log(e))
                    
        } else if(types === "del") {
            this.setState({
                selectedList: {},
                _isDel: true
            })
        }        
    }
    
    selectedChange = (data, types) => {

        const {selectedList} = this.state

        if (types === 'add'){
            this.setState({
                selectedList: selectedList.concat(data),
                _isDel: false
            })
        } else 
            this.setState({
                selectedList: selectedList.filter(i => i.keys !== data.keys),
                _isDel: false
            })
    }

    render() {
        const {
            comboData, 
            comboHeader, 
            _isLoad, _isDel, 
            selectParams, 
            addParams, 
            selectedList
        } = this.state

        if(comboData !== undefined && comboData.length > 0){
            const controlList = [{
                key: 'WORK_SHOP_ID',
                name: '작업장',
                type: 'combo',
                data: comboData,
                header: comboHeader,
                commandType: 'conn',       
            }, {
                key: 'work_date',
                name: '기준일자',
                type: 'date',
                commandType: 'conn' 
            }, {
                key: 'test',
                name: 'TEST',
                type: 'text',
                commandType: 'conn',
                linked: ['WORK_SHOP_ID', 'WORK_DATE']
            }, {
                key: 'lot_no',
                name: 'LOT No',
                type: 'text',
                commandType: 'add' 
            }]
            
            return (                
                    <Grid >  
                        <Grid.Row>
                            <Grid.Column>
                            <SearchForm 
                                controlList={controlList} 
                                onAdded={this.valueAdded} 
                                onNew= {this.valueChange}
                            />           
                            </Grid.Column> 
                        </Grid.Row>          
                        <Grid.Row>
                            <Grid.Column>
                            <SelectRowTable
                                sp_name={this.loadSp}
                                loaded={_isLoad} 
                                selectParams={selectParams}
                                addParams={addParams}
                                selectedList={selectedList}
                                selectedChange={this.selectedChange}
                                delFlag={_isDel}
                            />
                            </Grid.Column>
                        </Grid.Row>        
                        <Grid.Row>
                            <Grid.Column>
                            <CommandButton 
                                onButton={this.buttonClickEvent}
                            />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>     
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
