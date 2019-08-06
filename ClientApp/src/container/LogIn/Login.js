import React, { Component } from 'react';
import { LoginForm } from '../../components';
import { connect } from 'react-redux';
import { loginRequest } from '../../module/LoginModule'

class Login extends Component {
    render() {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);