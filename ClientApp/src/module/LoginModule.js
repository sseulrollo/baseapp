import { setLogin, setCheck } from '../services/SpCall'
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './ActionTypes'


export function loginRequest(user_id, password) {
  
    return (dispatch) => {
        // log in api 시작
        dispatch(login());

        return setLogin(user_id, password)
                .then(
                    response => {
                        console.log('dsaf');
                        console.log(response)
                        dispatch(loginSuccess(response))
                    }
                )
                .catch(e => dispatch(loginFail()));
    }
}

export function login() {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function loginFail() {
    return {
        type: LOGIN_FAIL
    }
}
