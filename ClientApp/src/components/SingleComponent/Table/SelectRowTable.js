import React, {Component} from 'react';
import { Table, Segment, Responsive, Checkbox, Item } from 'semantic-ui-react';
import { loadRequest, loadSingleRequest } from '../../../module/SpCallModule'
import { connect } from 'react-redux';
import update from 'immutability-helper';


class SelectRowTable extends Component {

    _isMounted = false;

    state = {
        sp_name: '',
        selectParams: [],
        addParams:[],
        header: [],
        data: [],
        selections: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            sp_name: props.sp_name,
            selectParams: props.selectParams,
            addParams: props.addParams,
            _isLoading: props._isLoad,
            selections: {},
            selectedList: props.selectedList
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
                        data:  this.state.data.concat(this.props.data),
                        header: this.props.header,
                    });
                }
            });
    }

    removeData(params) {
        
        const {data} = this.state
        let lst = [];

        params.map(item => 
            lst = data.filter(row => row["@@KEY"] !== item.keys))

        this.setState({
            data: lst
        })
    }

    handleChkChange = (e) => {
        e.preventDefault();
        this.props.selectedChange(e)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selectParams !== this.props.selectParams 
            || nextState.data !== this.state.data
            
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectParams !== this.props.selectParams && nextProps.selectParams != []){             
            this.getData(nextProps.selectParams);
        } else if(nextProps.addParams !== this.props.addParams && nextProps.addParams != []){            
            this.getAddData(nextProps.addParams)
        } else if(nextProps.selectedList !== this.props.selectedList && nextProps.delFlag === true)
            this.removeData(this.props.selectedList)
    }

    isItemSelected = id => this.state.selections[id]
 
    
    handleSelect = (id) => {
       
        this.setState((prevState) => {
            if (prevState.selections[id]) {
              // { 1: true } -> {}
              return update(prevState, {
                selections: { $unset: [id] },
              });
            }
            // {} -> { 1: true }
            return update(prevState, {
              selections: { [id]: { $set: true } },
            });
          });

          if(this.state.selections[id] === undefined)
            this.props.selectedChange(id, 'add')
          else  
            this.props.selectedChange(id, 'subtract')
        //   this.props.selectedChange(this.state.selections[id])
        }
            
       


    render() {
        const {header, data} = this.state;


        if (data !== undefined && header !== undefined
            && data.length > 0 && header.length > 0){
                
            const newLocal = <Table.Body>
                {data.map((row, index) => {
                    let cellData = [];
                    const keys = row["@@key"] === "" || row["@@key"] === undefined ? 
                                    row["@@KEY"] === "" || row["@@KEY"] === undefined ? 
                                        index : row["@@KEY"] 
                                : row["@@key"]; 
                    
                    header.map(head => {
                        const headerTag = head.split(">").length > 1 ? head.split(">")[0] : "";
                        if (head.startsWith("@@")) { }
                        else if (headerTag === "")
                            cellData.push(<Table.Cell>{row[head]}</Table.Cell>);
                        else {
                            const tags = headerTag.replace('<', '').toUpperCase();
                            
                            switch (tags) {
                                case "CHK":
                                    cellData.push(<Table.Cell>
                                        <Checkbox 
                                            checked={this.isItemSelected({keys})} 
                                            onChange={() => this.handleSelect({keys})} 
                                        />
                                    </Table.Cell>);
                                    break;
                            }
                        }
                    });
                    return <Table.Row key={keys}>{cellData}</Table.Row>;
                })}
            </Table.Body>;
            
            return (
                <Segment.Group>
                    <Responsive as={Segment} maxWidth={Responsive.onlyMobile.maxWidth} >
                        <Table celled selectable compact definition>
                            {newLocal}
                        </Table>
                    </Responsive>
                    <Responsive as={Segment} minWidth={Responsive.onlyMobile.maxWidth + 1} >
                        <Table celled selectable compact>
                            <HeaderRow data={header} />
                            {newLocal}
                        </Table>
                    </Responsive>
                </Segment.Group>
            )}
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

    let lstData = data.data.map(m => {
        if (m.startsWith("<")) 
            return <Table.HeaderCell>{m.split('>')[1]}</Table.HeaderCell>
        else if(!m.startsWith("@@"))
            return <Table.HeaderCell>{m.replace('_', ' ')}</Table.HeaderCell>
        // else {
        //     console.log('hehe')
        //     return <Table.HeaderCell width="0px"></Table.HeaderCell>
        // }
    })
    
    return (
        <Table.Header fullWidth>
            <Table.Row>
              {lstData}
            </Table.Row>
        </Table.Header>
    )
}


// const BodyRow = ({data, header, click}) => {
//     let rowData = []

//     console.log('BodyRow', data, header, click);
   
//     for(let i =0; i < data.length; i++){
//         let cellData = []
//         for (let j=0; j<header.length; j++){
//             const headerText = header[j]
//             const dataText = data[i][header[j]];
//             const headerTag = headerText.split(">").length > 1 ? headerText.split(">")[0] : ""

//             const outText = headerTag !== "" ? <Checkbox key={data[i]} onChange={click} /> : dataText

//             cellData.push(<Table.Cell>{outText}</Table.Cell>)
//         }
//         rowData.push(<Table.Row>{cellData}</Table.Row>)
//     }

//     return (
//         <Table.Body>
//             {rowData}
//         </Table.Body>
//     )
// }

//function BodyRow
// const BodyRow = ({data, header, isItemSelected, handleSelect}) => {
//     let rowData = []
//     // function handleChkChang(e){
//     //     e.preventDefault();
//     //     console.log(e, e.target.name, e.target, e.key, e.target.value);

        
//     // }
    

//     // function handleClick (e) {
//     //     e.preventDefault();
//     //     console.log(e, e.target.name, e.target, e.key, e.target.value);
//     // }

//     console.log('BodyRow', data, header, isItemSelected, handleSelect);
   
//     {data.map(row => {
//         let cellData = [];
        
//         header.map(head => {
//             const headerTag = head.split(">").length > 1? head.split(">")[0] : "";

//             if(headerTag === "") 
//                 cellData.push(<Table.Cell>{row[head]}</Table.Cell>)
//             else if (head.startsWith("@@")) {}
//             else {
//                 const tags = headerTag.replace('<','').toUpperCase()

//                 switch(tags) {
//                     case "CHK" :
//                         <Table.Cell>
//                             <Checkbox
//                                 checked={isItemSelected(row["@@key"])}
//                                 onChange={() => handleSelect(row["@@key"])}
//                             />
//                         </Table.Cell>
//                         break;
//                 }
//             }
//         })        
//         rowData.push(<Table.Row key={row["@@key"]}>{cellData}</Table.Row>);
//     })}

//     // for(let i =0; i < data.length; i++){
//     //     let cellData = []
//     //     const item = data[i];

//     //     const key = item["@@KEY"];
     
    

//     //     for (let j=0; j<header.length; j++){
//     //         const headerText = header[j]

//     //         const dataText = item[header[j]];
//     //         const headerTag = headerText.split(">").length > 1 ? headerText.split(">")[0] : ""

//     //         if(headerTag !== ""){
//     //             const outText = <Checkbox /> 
//     //             cellData.push(<Table.Cell collapsing selectable>{outText}</Table.Cell>)
//     //         } else if (headerText.startsWith("@@")) {
//     //             <Table.Cell width="0">{dataText}</Table.Cell>
//     //         } 
//     //         else {
//     //             cellData.push(<Table.Cell>{dataText}</Table.Cell>)
//     //         }
            
//     //     }
//     //     rowData.push(<Table.Row onClick={handleClick} key={"row"+key}>{cellData}</Table.Row>)
//     // }

//     return (
//         <Table.Body>
//             {rowData}
//         </Table.Body>
//     )
// }

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
