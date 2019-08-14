import React, {Component} from 'react';
import { Table, Segment, Responsive } from 'semantic-ui-react';



class SelectRowTable extends Component {

    state = {}

    constructor(props) {
        super(props);

        if (props.gridData !== undefined){
            
            this.state = {
                header: props.gridData.header,
                content: props.gridData.data
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.gridData !== this.props.gridData 
    }

    render() {
        const {header, content} = this.state;
        console.log(header, content, this.state, this.props)

        if (content !== undefined && header !== undefined
            && content.length > 0 && header.length > 0)
            return (
                <Segment.Group>
                    <Responsive as={Segment} minWidth={1000} >
                        <Table celled selectable>
                            <HeaderRow data={header} />
                            <BodyRow data={content} header={header} />
                        </Table>
                    </Responsive>
                    <Responsive as={Segment} maxWidth={Responsive.onlyMobile.maxWidth} >
                        <Table celled selectable>
                            <BodyRow data={content} header={header} />
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
            cellData.push(<Table.Cell>{data.data[i][data.header[j]]}</Table.Cell>)
        }
        rowData.push(<Table.Row>{cellData}</Table.Row>)
    }

    return (
        <Table.Body>
            {rowData}
        </Table.Body>
    )
}


export default SelectRowTable;