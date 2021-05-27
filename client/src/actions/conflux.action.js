import { confluxConstants } from '../constant';
import { AlertResp } from '../helpers/alert';
import { updateTx } from '../service/api';
const allowedNetowrk = 1;
const adminAccount = 'cfxtest:aak2zfppgz9xe0w4tnfcts7cwamwv53e36hk1f8ceg';
export default {
  connectPortal,
  isPortalInstalled,
  sendTx,
  restoreSession
};

function connectPortal(setSubmitting) {
  return async (dispatch) => {
    // console.log('here');
    dispatch(request());
    let allowed = Boolean(window.conflux && window.conflux.isConfluxPortal);
    console.log(allowed);
    if(allowed){
      await window.conflux.enable();
      const conflux = await window.conflux.send("cfx_requestAccounts");
      console.log(conflux);
      if(conflux && conflux.length > 0){
        return dispatch(success({account:conflux}));
      } else{
        return dispatch(failure({error: conflux}))
      }
    }else{
      return dispatch(failureTOconnect({error: "Please Install conflux portal"}))
    }
  };

  function request(user) {
    return { type:  confluxConstants.CONNECT_LOADING, user };
  }
  function success(user) {
    return { type: confluxConstants.CONNECT_SUCCESS, user };
  }
  function failure(error) {
    return { type: confluxConstants.CONNECT_FAILED, error };
  }
  function failureTOconnect(error) {
    return { type: confluxConstants.CONNECT_NOT_ALLOWED, error };
  }
}

function restoreSession(account){
  return async (dispatch) => {
    return dispatch(success({account}));
  };
  function success(user) {
    return { type: confluxConstants.CONNECT_SUCCESS, user };
  }
}

function isPortalInstalled(){
  return async(dispatch) => {
    console.log('coecty');
    let allowed = Boolean(window.conflux && window.conflux.isConfluxPortal);
    console.log(allowed);
    if(!allowed) dispatch(failure({}));
    if(allowed){
      const accounts = await window.conflux.send({ method: 'cfx_accounts' })
      console.log('acct===>', accounts, window.conflux.selectedAddress);
      if(accounts && accounts.length > 0){
        restoreSession(accounts);
      }
      dispatch(success({}));
    }
  };
  function success(user) {
    return { type: confluxConstants.CONNECT_ALLOWED, user };
  }
  function failure(error) {
    return { type: confluxConstants.CONNECT_NOT_ALLOWED, error };
  }
}

function sendTx(data, setSubmitting){
  // const { acctRec, amount } = data;
  const conflux = window.conflux;
  console.log(data)
  const accounts = conflux.selectedAddress
  console.log(accounts);
  const params = [
    {
      from: accounts,
      to: adminAccount,
      gas: "0x76c0",
      gasPrice: "0x9184e72a000",
      value: data.amountCFXUnit, 
      // value: "3"
    },
  ]
  return async(dispatch) => {
    if(accounts && conflux.networkVersion==allowedNetowrk){
      window.conflux
        .send("cfx_sendTransaction", params)
        .then(function (result) {
          // The result varies by method, per the JSON RPC API.
          // For example, this method will return a transaction hash on success.
          console.log(result);
          updateTx(data._id, 'success', result, JSON.stringify(result), 'null');
          AlertResp('Transaction Successful', 'transaction sent successful', 'success', 'close');
          setSubmitting(false);
        })
        .catch(function (error) {
          console.log(error);
          updateTx(data._id, 'failed', 'null', 'null', JSON.stringify(error));
          AlertResp('Transaction Failed', error.message, 'error', 'Close');
          setSubmitting(false);
          // Like a typical promise, returns an error on rejection.
        })
    }else{
      console.log(conflux.networkVersion, accounts);
      if(conflux.networkVersion!==allowedNetowrk) AlertResp('Info', 'Please Switch to Test Network!!!', 'info', 'close');
      if(!accounts) AlertResp('Info', 'Please Connect to Conflux Wallet!!!', 'info', 'close');
      setSubmitting(false);
    }
  }
}