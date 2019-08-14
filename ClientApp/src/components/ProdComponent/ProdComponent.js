import React, {Component, Fragment} from 'react'
import { Grid, Form } from 'semantic-ui-react';
import {SearchCombo, SelectRowTable} from '../SingleComponent'


class ProdComponent extends Component {
    
    _isMounted = false;

    state = {}

    constructor(props){
        super(props)

        console.log('hello', props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return nextProps.comboData !== this.props.comboData 
            || nextProps.comboHeader !== this.props.comboHeader
            || nextProps.gridData !== this.props.gridData
        console.log('shouldComponentUpdate')
    }
    
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        const { comboData, comboName,comboHeader, gridData } = this.props;
        
        console.log('heyllo', this.props)
         
        return (
            <Fragment>
                <Form>
                    <SearchCombo 
                        name={comboName} 
                        data={comboData} 
                        header={comboHeader} 
                    />
                </Form>
                <SelectRowTable data={gridData} />
            </Fragment>
        )
    }
}


export default ProdComponent;