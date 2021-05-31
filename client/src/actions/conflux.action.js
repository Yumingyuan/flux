import { confluxConstants } from '../constant';
import { AlertResp } from '../helpers/alert';
import { updateTx } from '../service/api';
const DEV = false;
const allowedNetowrk = DEV ? 1029 : 1;
const adminAccount = DEV? 'cfxtest:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc': 'cfx:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc';
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
    // console.log('all==>s ', allowed);
    if(allowed){
      window.conflux.enable().then((conflux)=>{
        // console.log(conflux);
        if(conflux && conflux.length > 0){
          return dispatch(success({account:conflux}));
        } else{
          return dispatch(failure({error: conflux}))
        }
      });
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
    // console.log('coecty');
    let allowed = Boolean(window.conflux && window.conflux.isConfluxPortal);
    // console.log(allowed);
    if(!allowed) dispatch(failure({}));
    if(allowed){
      window.conflux.send({ method: 'cfx_accounts' }).then((accounts)=>{
        // console.log('acct===>', accounts, window.conflux.selectedAddress);
        if(accounts && accounts.length > 0){
          restoreSession(accounts);
        }
        dispatch(success(accounts));
      });
    }
  };
  function success(user) {
    return { type: confluxConstants.CONNECT_ALLOWED, user };
  }
  function failure(error) {
    return { type: confluxConstants.CONNECT_NOT_ALLOWED, error };
  }
}

function sendTx(data, setSubmitting, resetForm){
  // const { acctRec, amount } = data;
  const conflux = window.conflux;
  // console.log(data)
  const accounts = conflux.selectedAddress
  // console.log(accounts);
  const params = [
    {
      from: accounts,
      to: adminAccount,
      gas: "0x76c0",
      gasPrice: '0x1',
      value: data.amountCFXUnit
    },
  ];
  // console.log(params, conflux.networkVersion, allowedNetowrk)
  // return (dispatch) => {
    if(accounts && conflux.networkVersion!=allowedNetowrk){
      window.conflux
        .send("cfx_sendTransaction", params)
        .then(function (result) {
          // The result varies by method, per the JSON RPC API.
          // For example, this method will return a transaction hash on success.
          console.log(result);
          updateTx(data._id, 'success', result, JSON.stringify(result), 'null');
          AlertResp('Transaction Successful', 'transaction sent successful', 'success', 'close');
          setSubmitting(false);
          resetForm();
        })
        .catch(function (error) {
          console.log(error);
          updateTx(data._id, 'failed', 'null', 'null', JSON.stringify(error));
          AlertResp('Transaction Failed', error.message, 'error', 'Close');
          setSubmitting(false);
          // Like a typical promise, returns an error on rejection.
        })
    }else{
      // console.log('error==>s', conflux.networkVersion, allowedNetowrk, accounts);
      if(conflux.networkVersion==allowedNetowrk) AlertResp('Info', `Please Switch to ${ DEV ? 'Test': 'Conflux Main'} Network!!!`, 'info', 'close');
      if(!accounts) AlertResp('Info', 'Please Connect to Conflux Wallet!!!', 'info', 'close');
      AlertResp('error', 'unknown error', 'error', 'close');
      setSubmitting(false);
    }
  // }
}