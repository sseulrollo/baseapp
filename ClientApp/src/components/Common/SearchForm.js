import React, {Component, Fragment} from 'react'
import {SearchCombo} from '../SingleComponent';
import {Loader, Form, Input} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';

// import update from 'immutability-helper';

class SearchForm extends Component {
    _isMounted = false;    
    state = {}

    constructor(props) {
        super(props)

        this.state = {
            controlList: props.controlList,
            linkedList: []
        }
    }

    handleParamChange = (names, data) => {
        this.setState({
            [names]: data
        })    
        this.props.onNew(names, data)
    }

    
    handleParamAdded = (names, data) => {
        this.setState({
            [names]: data
        })    
        this.props.onAdded(names, data)
        
        this.setState({
            [names]: ''
        })
    }

    handleParamConnect = (names, data) => {
        this.setState({
            [names]: data
        })  
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
        this.props.onNew(e.target.name, e.target.value)
    }

    handleAddChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
        this.props.onAdded(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: ''
        })
    }

    handleConnect = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props
            || nextState !== this.state
    }

    componentWillUpdate(nextProps, nextState)  {
        const {linkedList} = this.state;

        if(linkedList !== undefined && linkedList.length > 0){
            linkedList.map(i => {
                if(nextState[i.id] !== this.state[i.id]) {
                    this.props.onLinkedChange(i.id, i.connect)
                }
            })
        }
    }

    getValue = (id) => this.state[id]

    linkedSet = (id, linked) =>{
        const {linkedList} = this.state;

        if(linkedList !== undefined ) {
            const pick = linkedList.map(i => i.id === id)

            if(pick.length === 0){
                let addData = []
                linked.map(item => addData.push({id:item, connect:id}))
                
                console.log(addData)
                this.setState({
                    linkedList: this.state.linkedList.concat(addData)
                })
            }
        } 
    }

    lenderingControl = () => {
        const {controlList, linkedList} = this.state 
       
        const lender = [];
        
        controlList.forEach(item => {
            if(item.type === "combo") {
                lender.push(
                    <Form.Field fluid>
                        <label>
                            {item.name}
                        </label>
                        <SearchCombo 
                            name={item.name} 
                            keys={item.key}
                            data={item.data} 
                            header={item.header} 
                            value={this.getValue(item.key)}                            
                            onChange={item.commandType === "new" ? this.handleParamChange 
                                : item.commandType === "conn" ? this.handleParamConnect :  this.handleParamAdded}
                            key={item.key}
                        />
                    </Form.Field>
                )
            }
            else if(item.type === "Date") {
                lender.push(
                    <Form.Field fluid>
                        <label>
                            {item.name}
                        </label>
                        <DatePicker
                            onChange={item.commandType === "new" ? this.handleChange 
                                : item.commandType === "conn" ? this.handleConnect :  this.handleAddChange}
                            name={item.name}
                            key={item.key}
                            selected={this.getValue(item.key)}
                        />
                    </Form.Field>
                )
            }
            else if(item.type === "text") {
                lender.push(
                    <Form.Field fluid>
                        <label>
                            {item.name}
                        </label>
                        <Input 
                            name={item.key}
                            key={item.key}
                            value={this.getValue(item.key)}
                            onChange={item.commandType === "new" ? this.handleChange 
                                : item.commandType === "conn" ? this.handleConnect :  this.handleAddChange}
                        />
                                    
                    </Form.Field>
                )}

                if(item.linked !== undefined)
                    this.linkedSet(item.key, item.linked)
        })

        return (
            <Form>
                {lender}
            </Form>
        )
    }
        

    render() {
        const {controlList} = this.state

        return (
            <Fragment>
                { controlList === undefined ? <Loader inline='centered' /> 
                    : this.lenderingControl() }
            </Fragment>
        )
    }
}


export default SearchForm;