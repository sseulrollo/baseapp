import { setLogin } from '../services/SpCall'
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './ActionTypes'


const success = () => ({ type: LOGIN_SUCCESS });
const fail = () => ({ type: LOGIN_FAIL })
const request = () => ({ type: LOGIN_REQUEST })


export function loginRequest(user_id, password) {
    return (dispatch) => {
        // log in api 시작
        dispatch(login());

        return setLogin(this.state.user_id, this.state.password)
                .then(response => 
                    dispatch(loginSuccess())
                ).catch ( e => 
                    dispatch(loginFail())
                );
    }
}

export function login() {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFail() {
    return {
        type: LOGIN_FAIL
    }
}
