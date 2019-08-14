import authentication from './authentication';
import spcall from './spcall';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    spcall
})