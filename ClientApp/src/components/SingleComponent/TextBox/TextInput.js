import React, {Component, Fragment, createRef} from 'react'
import {Input, Grid, Form} from 'semantic-ui-react'


export class TextInput extends Component {
    
    state={}
    inputRef = createRef()
    
    constructor(props){
        super(props)
        
        this.state = {
            name: props.name,
            value: props.value
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const {name, value} = this.state
        
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <Form>
                        <Form.Field fluid>
                            <label>
                                {name}
                            </label>
                            <Input 
                                ref={this.inputRef} 
                                placeholder={name} 
                                // onChange={this.handleChange}
                            />
                            
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}