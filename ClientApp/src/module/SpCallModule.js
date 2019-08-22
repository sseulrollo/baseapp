import { selectSp, executeSp, getCode, getMenu, getCodeDynamic, loadSingle } from '../services/SpCall'
import { 
    DB_REQUEST,
    DB_FAIL,
    DB_SELECT_SUCCESS,
    DB_DOUBLE_SELECT,
    DB_EXECUTE_SUCCESS,
    DB_CODE_DYNAMIC
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


export function loadSingleRequest (spname, where) {
    
    return async (dispatch) => {

        dispatch(request());
        return await loadSingle(spname, where)
                .then(                    
                    response => {
                        dispatch(selectDouble(response))}
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


export function codeDynamicReq (groupid, where) {
    
    return async (dispatch) => {

        dispatch(request());
        return await getCodeDynamic(groupid, where)
                .then(                    
                    response => {
                        dispatch(selectCodeDynamic(response.data))}
                ).catch(
                    e => dispatch(requestFail(e))
                )
    }
}

export function menuRequest (user_id) {
    return async (dispatch) => {

        dispatch(request());
        
        return await getMenu(user_id).then(
            response => {
                
                dispatch(selectSuccess(response))}
            ).catch(
                e => dispatch(requestFail(e))
            )
    }
}

export function request() {
    return {
        type: DB_REQUEST
    }
}

export function selectSuccess (data){
    return {
        type: DB_SELECT_SUCCESS,
        data
    }
}

export function selectDouble (data){
    return {
        type: DB_DOUBLE_SELECT,
        data
    }
}

export function selectCodeDynamic (data){
    return {
        type: DB_CODE_DYNAMIC,
        data
    }
}

export function executeSuccess (data){
    return {
        type: DB_EXECUTE_SUCCESS,
        data
    }
}

export function requestFail (data){
    return {
        type: DB_FAIL,
        data
    }
}

