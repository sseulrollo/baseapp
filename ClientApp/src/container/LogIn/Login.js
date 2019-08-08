import React, { Component } from 'react';
import { LoginForm } from '../../components';
import { connect } from 'react-redux';
import { loginRequest } from '../../module/LoginModule'
import { setLogin, setCheck } from '../../services/SpCall'

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
    }

    
    handleLogin (id, pw) {
        return this.props.loginRequest(id, pw)
                .then(
                    response =>  {

                        console.log('this.props')
                        console.log(this.props.returnValue)
                        if(this.props.status === "SUCCESS") {
                            let loginData = {
                                isLoggedIn: true,
                                username: this.props.returnValue.currentUser
                            };
                            console.log(JSON.stringify(loginData));

                            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                            console.log('로그인되었습니다.');

                    //         // link를 누른 것과 같은 효과를 줌
                            this.props.history.push('/Main');
                    //         return true;
                        } else {
                            console.log('로그인을 실패했습니다.')
                        }
                    }
                )
    }
    render() {
        return (
            <div>
                <LoginForm 
                    mode={true} 
                    onLogin={this.handleLogin}
                    // callDb= {this.handleDb}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        returnValue: state.authentication.status //? '' : state.authentication.status.currentUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        },
        setCheck: (types, params) => {
            return dispatch(setCheck(types, params))
        },
        setLogin: (id, pw) => {
            return dispatch(setCheck(id, pw))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);