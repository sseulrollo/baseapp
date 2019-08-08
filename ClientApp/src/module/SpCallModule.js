import { selectSp, executeSp, getCode, getMenu } from '../services/SpCall'
import { 
    DB_REQUEST,
    DB_FAIL,
    DB_SELECT_SUCCESS,
    DB_EXECUTE_SUCCESS
} from './ActionTypes'

export function loadRequest (spname, params) {
    
    return (dispatch) => {

        dispatch(request());

        return selectSp(spname, params)
                .then(
                    response => {
                        dispatch(selectSuccess(response))
                    }
                ).catch(
                    e => dispatch(requestFail(e))
                )

    }
}

export function executeRequest (spname, params) {
    
    return (dispatch) => {

        dispatch(request());

        return executeSp(spname, params)
                .then(
                    response => {
                        dispatch(executeSuccess(response))
                    }
                ).catch(
                    e => dispatch(requestFail(e))
                )

    }
}

export function codeRequest (groupid, where) {
    
    return (dispatch) => {

        dispatch(request());
        return getCode(groupid, where)
                .then(
                    response => {
                        dispatch(selectSuccess(response))
                    }
                ).catch(
                    e => dispatch(requestFail(e))
                )
    }
}

export function menuRequest () {
    
    return (dispatch) => {

        dispatch(request());
        return getCode()
                .then(
                    response => {
                        dispatch(selectSuccess(response))
                    }
                ).catch(
                    e => dispatch(requestFail(e))
                )
    }
}

export function request() {
    return {
        types: DB_REQUEST
    }
}

export function selectSuccess (data){
    return {
        types: DB_SELECT_SUCCESS,
        data
    }
}

export function executeSuccess (data){
    return {
        types: DB_EXECUTE_SUCCESS,
        data
    }
}

export function requestFail (data){
    return {
        types: DB_FAIL,
        data
    }
}

