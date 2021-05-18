// import confluxService from '../service/conflux';
import { confluxConstants } from '../constant';

var initialState = {
  confluxInstalled: false,
  connected: false,
  connecting: false,
  account: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case confluxConstants.CONNECT_SUCCESS:
      // console.log(action);
      localStorage.setItem('account', action.user.account);
      return {
        ...state,
        connected:true,
        confluxInstalled:true,
        account: action.user.account
      }
    case confluxConstants.CONNECT_LOADING:
        return{
            ...state,
            connecting: true,
            connected: false,
        }
    case confluxConstants.CONNECT_FAILED:
        return{
            ...initialState
        }
    case confluxConstants.CONNECT_ALLOWED:
      return{
        ...state,
        confluxInstalled: true
      }
    case confluxConstants.CONNECT_NOT_ALLOWED:
      return{
        ...state,
        confluxInstalled: false
      }
    default:
      return state
  }
}
