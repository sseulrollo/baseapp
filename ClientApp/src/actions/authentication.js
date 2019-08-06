import React from 'react';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from "./ActionTypes";
import axios from 'axios';


export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());
        var userInfo = {
            user_id : username,
            password : password
        }
        return  axios.post('/User/Login', {
                    headers : {
                        'Content-type' : 'x-www-form-urlencoded',
                        'Accept' : 'application/json',
                        'data-Type' : 'json'
                    },
                    body:JSON.stringify(userInfo)
                }).then(response => response.data)
                .then(response => {
                    if (response === "OK"){
                        dispatch(loginSuccess(this.state.requestId))
                    } else {
                        dispatch(loginFailure(response))
                    }
                });
    }
}


export function login() {
    return {
        type : AUTH_LOGIN
    }
}

export function loginSuccess(username) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        username
    }
}

export function loginFailure() {
    return {
        type : AUTH_LOGIN_FAILURE
    }
}