import React, {Component} from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react';
import axios from 'axios';




export class LoginForm extends Component {

    state = {};

    constructor() {
        super(...arguments);

        this.state = {
            requestId : '',
            requestPw : '',
        }
        
        this.RequestIdChange = this.RequestIdChange.bind(this);
        this.RequestPwChange = this.RequestPwChange.bind(this);

        this.SubmitEvent = this.SubmitEvent.bind(this);
    }

    RequestIdChange (event) {
        this.setState ({
            requestId : event.target.value
        });
        console.log(this.state.requestId)
    }

    RequestPwChange (event) {
        this.setState ({
            requestPw : event.target.value
        });
        console.log(this.state.requestPw)
    }

    SubmitEvent(event) {
        const userInfo = {
            'user_id' : this.state.requestId,
            'password' : this.state.requestPw
        };


        axios.post('/Post/Login', {
            headers : {
                // 'Content-type' : 'application/json;charset=UTF-8'//x-www-form-urlencoded'
                'Content-type' : 'x-www-form-urlencoded',
                'Host' : 'localhost:5001'
            },
            // body:JSON.stringify(userInfo)
            body : {
                username : this.state.requestId,
                password : this.state.requestPw
            }
        }).then(response => response.JSON())
        .then(response => console.log(response.loginresult));
    }

    render() {
        return(
            <Form >
                <Form.Field>
                    <label>Id</label>
                    <input placeholder="Id" onChange={this.RequestIdChange} type="text" />
                </Form.Field>
                <Form.Field>
                    <label>Pw</label>
                    <input placeholder="Password" onChange={this.RequestPwChange} type="password" />
                </Form.Field>
                <Form.Field>
                    <Checkbox label="Save Id" />
                </Form.Field>
                <Button type="submit" onClick={this.SubmitEvent}>Log in</Button>
            </Form>
        )
    }
}