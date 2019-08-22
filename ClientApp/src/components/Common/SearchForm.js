import React, {Component, Fragment} from 'react'
import {SearchCombo} from '../SingleComponent';
import {Loader, Form, Input} from 'semantic-ui-react'

class SearchForm extends Component {
    _isMounted = false;    
    state = {}

    constructor(props) {
        super(props)

        this.state = {
            controlList: props.controlList
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
    }

    lenderingControl = () => {
        const {controlList} = this.state 
       
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
                            onChange={item.commandType === "new" ? this.handleParamChange : this.handleParamAdded}
                            key={item.key}
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
                            onChange={item.commandType === "new" ? this.handleChange : this.handleAddChange}
                        />
                                    
                    </Form.Field>
                )}
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