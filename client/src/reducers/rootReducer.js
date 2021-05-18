import { combineReducers } from 'redux';
import confluxReducer from './confluxReducer';

export default combineReducers({
   conflux: confluxReducer,
})
