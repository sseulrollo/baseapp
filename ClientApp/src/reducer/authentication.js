import * as types from '../module/ActionTypes'
import update from 'react-addons-update'




const initailState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: ''
    }
};



export default function authentication(state, action) {
    if(typeof state === "undefined")
        state  = initailState;

    switch(action.type) {
        case types.LOGIN_REQUEST:
            return update(state, {
                    login: {
                        status: { $set: 'WAITING' }
                    }
                });
        case types.LOGIN_SUCCESS:
            return update(state, {
                    login: {
                        status: { $set: 'SUCCESS' }
                    },
                    status: {
                        isLoggedIn: { $set: true },
                        currentUser: { $set: action.username }
                    }
                });
        case types.LOGIN_FAIL:
            return update(state, {
                    login: {
                        status: { $set: 'FAIL' }
                    }
                });
        default:
            return state
    }

    return state;
}