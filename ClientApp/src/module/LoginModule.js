const LOGIN_SUCCESS = 'SUCCESS';
const LOGIN_FAIL = 'FAIL';
const LOGIN_REQUEST = 'REQUEST';


const success = () => ({ type: LOGIN_SUCCESS });
const fail = () => ({ type: LOGIN_FAIL })
const request = () => ({ type: LOGIN_REQUEST })


const initailState = {
    user_id: '',
    password: ''
};


const loginAction = (state = initailState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {

            };
        case LOGIN_SUCCESS:
            return {

            };
        case LOGIN_FAIL:
            return {

            };
        default:
            return state
    }
}