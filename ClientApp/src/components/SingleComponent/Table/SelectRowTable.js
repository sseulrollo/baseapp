import React, {Component} from 'react';
import { Table, Segment, Responsive, Checkbox } from 'semantic-ui-react';
import { loadRequest, loadSingleRequest } from '../../../module/SpCallModule'
import { connect } from 'react-redux';


class SelectRowTable extends Component {

    state = {}


    _isMounted = false;

    state = {
        sp_name: '',
        selectParams: [],
        addParams:[],
        header: [],
        data: []
    }

    constructor(props) {
        super(props);

        this.state = {
            sp_name: props.sp_name,
            selectParams: props.selectParams,
            addParams: props.addParams,
            _isLoading: props._isLoad
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        
        this.getData(this.state.selectParams);
    }

    async getData(params) {
       
        let paramData = {}

        if(params !== undefined &&params.length > 0)
            params.forEach(element => {
                paramData = {
                    [element.id]: element.value
                }
            });

        await this.props.loadSingleRequest(this.state.sp_name, paramData)
            .then(() => {
                if (this._isMounted){
                    this.setState({
                        header: this.props.header,
                        data:  this.props.data
                    });
                }
            });


    }

    async getAddData(params) {
       
        let paramData = {}
        params.forEach(element => {
            paramData = {
                [element.id]: element.value
            }
        });

        await this.props.loadSingleRequest(this.state.sp_name, paramData)
            .then(() => {
                if (this._isMounted){
                    this.setState({
                        data:  this.state.data.concat(this.props.data)
                    });
                }
            });


    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selectParams !== this.props.selectParams 
            || nextState.data !== this.state.data
            
    }

    
    componentWillReceiveProps(nextProps) {

        console.log('componentWillReceiveProps', nextProps)

        if(nextProps.selectParams !== this.props.selectParams && nextProps.selectParams != []){            
            
        console.log('componentWillReceiveProps', '전체')
            this.getData(nextProps.selectParams);
        } else if(nextProps.addParams !== this.props.addParams && nextProps.addParams != []){
            
        console.log('componentWillReceiveProps', '추가')
            this.getAddData(nextProps.addParams)
        } 
    }

    render() {
        const {header, data} = this.state;

        if (data !== undefined && header !== undefined
            && data.length > 0 && header.length > 0)
            return (
                <Segment.Group>
                    <Responsive as={Segment} maxWidth={Responsive.onlyMobile.maxWidth} >
                        <Table celled selectable>
                            <BodyRow data={data} header={header} />
                        </Table>
                    </Responsive>
                    <Responsive as={Segment} minWidth={Responsive.onlyMobile.maxWidth + 1} >
                        <Table celled selectable>
                            <HeaderRow data={header} />
                            <BodyRow data={data} header={header} />
                        </Table>
                    </Responsive>
                </Segment.Group>
            )
        else if (header !== undefined && header.length > 0)
        return (
            <Table celled selectable>
                <HeaderRow data={header} />
            </Table>
        )
        else
            return <Table celled selectable></Table>
    }
}

const HeaderRow = (data) => {

    let lstData = data.data.map(m => <Table.HeaderCell>{m}</Table.HeaderCell>)
    
    return (
        <Table.Header>
            <Table.Row>
              {lstData}
            </Table.Row>
        </Table.Header>
    )
}


const BodyRow = (data) => {
    let rowData = []
   
    for(let i =0; i < data.data.length; i++){
        let cellData = []
        for (let j=0; j<data.header.length; j++){
            const headerText = data.header[j]
            const dataText = data.data[i][data.header[j]];
            const headerTag = headerText.split(">").length > 1 ? headerText.split(">")[0] : ""

            const outText = headerTag !== "" ? <Checkbox checked={dataText === ""  || dataText.toLowerCase() === "false" ? false : true}></Checkbox> : dataText

            cellData.push(<Table.Cell>{outText}</Table.Cell>)
        }
        rowData.push(<Table.Row>{cellData}</Table.Row>)
    }

    return (
        <Table.Body>
            {rowData}
        </Table.Body>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectRowTable)
