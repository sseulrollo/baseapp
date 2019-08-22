import React, {Component, Fragment} from 'react'
import { Grid, Form, Input } from 'semantic-ui-react';
import {SearchCombo, TextInput} from '../SingleComponent'


class ProdComponent extends Component {
    
    _isMounted = false;

    state = {}

    constructor(props){
        super(props)

        this.state ={
            workshop: '',
            lotno: ''
        }

        this.handleDDChange = this.handleDDChange.bind(this)
        this.handleTxtChange = this.handleTxtChange.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return nextProps.comboData !== this.props.comboData 
            || nextProps.comboHeader !== this.props.comboHeader
            || nextState !== this.state
        console.log('shouldComponentUpdate')
    }
    

    componentDidMount() {
        this._isMounted = true;
    }

    handleDDChange = (names, data) => {
        this.setState({
            [names]: data
        })    
        this.props.onEdit(names, data)
    }

    handleTxtChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
        this.props.onEdit(e.target.name, e.target.value)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        const { comboData, comboName,comboHeader } = this.props;
        
        return (
            <Fragment>
                <Form>
                    <Form.Field fluid>
                        <label>
                            {comboName}
                        </label>
                        <SearchCombo 
                            name={comboName} 
                            keys='work_shop_id'
                            data={comboData} 
                            header={comboHeader} 
                            onChange={this.handleDDChange}
                            value={this.state.workshop}
                            key='work_shop_id'
                            commandType= 'new'
                        />
                    </Form.Field>
                    <Form.Field fluid>
                        <label>
                            Lot no
                        </label>
                        <Input 
                            name="lot_no" 
                            key='lotno' 
                            onChange={this.handleTxtChange} 
                            commandType= 'add'
                        />
                                    
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}


export default ProdComponent;