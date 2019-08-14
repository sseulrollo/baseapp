import * as types from '../module/ActionTypes'
import update from 'react-addons-update'


const initailState = {
    spcall: {
        status: 'INIT'
    },
    returnData: {
        isSuccess: false,
        data : {},
        message: ''
    }
};

export default function spcall(state, action) {
    if(typeof state === "undefined")
        state  = initailState

    switch(action.type) {
        case types.DB_REQUEST:
            return update(state, {
                    spcall: {
                        status: { $set: 'WATING' }
                    }
                });
        case types.DB_SELECT_SUCCESS:
            return update(state, {
                    spcall: {
                        status: { $set: 'SUCCESS' }
                    },
                    returnData: {
                        isSuccess: { $set: true },
                        data: { $set: action.data }
                    }
                });
        case types.DB_EXECUTE_SUCCESS :
            return update(state, {
                    spcall: {
                        status: { $set: 'SUCCESS' }
                    },
                    returnData: {
                        isSuccess: { $set: true },
                        message: { $set: action.data }
                    }
                });
        case types.DB_FAIL:
            return update(state, {
                    spcall: {
                        status: { $set: 'FAIL' }
                    },
                    returnData: {
                        message: { $set: action.data }
                    }
                });
        case types.DB_DOUBLE_SELECT:
            return update(state, {
                spcall: {
                    status: { $set: 'SUCCESS' }
                },
                returnData: {
                    isSuccess: { $set: true },
                    data: { $set: action.data },
                    header: { $set: action.header }
                }
            });
        default:
            return state
    }

    return state;
}