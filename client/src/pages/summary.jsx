
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";
// import { productSchema } from '../../helpers/schemas/formSchema';
// import { newTx, getTxServ } from '../../service/api';
// import confluxAction from '../../actions/conflux.action';

import { DefMainImg } from '../assets/image';
import { AlertResp } from '../helpers/alert';
import { updateTx } from '../service/api';


const DEV = false;
const allowedNetowrk = DEV ? 1029 : 1;
const adminAccount = DEV ? 'cfxtest:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc': 'cfx:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc';
const adminAccountOld = '0x1d924bEB8dC49cA60b6bE2727C027fE24fa8F173';


const defaultImage = DefMainImg;

const Summary = () => {
    const state = useSelector((state) => state.conflux);
    const [data, setData] = useState(null);
    const history = useHistory();
    const [isSubmitting, setSubmitting] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        // console.log('location--->', location);
        if(!location.state){
            return history.push('/');
        }else{
            setData(location.state.data);
        }
    },[]);

    const payNow = () => {
        console.log('pay');
        return makePayment(data);
    }

    const makePayment = (data) => {
        const sendTx = (data, setSubmitting, resetForm) => {
          const conflux = window.conflux;
          const accounts = conflux.selectedAddress
          const params = [
            {
              from: accounts,
              to: adminAccountOld,
              gas: "0x76c0",
              gasPrice: '0x1',
              value: data.amountCFXUnit
            },
          ];
          console.log(params, accounts, conflux.networkVersion, allowedNetowrk);
            if(accounts && String(conflux.networkVersion)!=String(allowedNetowrk)){
                // setSubmitting(true);
              const response = (res) => {
                console.log('response=',res);
                if(res.code===4001){
                  updateTx(data._id, 'failed', 'null', 'null', JSON.stringify(res));
                  AlertResp('Transaction Failed', res.message, 'error', 'Close');
                }else{
                    updateTx(data._id, 'success', res, JSON.stringify(res), 'null');
                    AlertResp('Transaction Successful', 'transaction sent successful', 'success', 'close');
                    // setSubmitting(false);
                }
              }
              window.conflux.sendAsync({
                method: "cfx_sendTransaction",
                params,
                from: accounts
              }, response);
                // .then(function (result) {
                //   // The result varies by method, per the JSON RPC API.
                //   // For example, this method will return a transaction hash on success.
                // //   console.log(result);
                //   updateTx(data._id, 'success', result, JSON.stringify(result), 'null');
                //   // AlertResp('Transaction Successful', 'transaction sent successful', 'success', 'close');
                //   // setSubmitting(false);
                //   history.push({ 
                //     pathname:'/info',
                //     state: { success: true, msg:'transaction successful'}
                //   });
                // })
                // .catch(function (error) {
                //   console.log('error===>', error);
                //   updateTx(data._id, 'failed', 'null', 'null', JSON.stringify(error));
                //   // AlertResp('Transaction Failed', error.message, 'error', 'Close');
                //   // setSubmitting(false);
                //   history.push({ 
                //     pathname:'/info',
                //     state: { success: false, msg:error.message}
                //   });
                //   // history.replace();
                //   // Like a typical promise, returns an error on rejection.
                // })
            }else{
              let error;
              console.log('error==>s', conflux.networkVersion, allowedNetowrk, accounts, DEV, String(conflux.networkVersion)==String(allowedNetowrk));
              if(String(conflux.networkVersion)==String(allowedNetowrk))
                // AlertResp('Info', `Please Switch to ${ DEV ? 'Test': 'Conflux Main'} Network!!!`, 'info', 'close');
                error = `Please Switch to ${ DEV ? 'Test': 'Conflux Main'} Network!!!`;
              else if(!accounts)
                // AlertResp('Info', 'Please Connect to Conflux Wallet!!!', 'info', 'close');
                error = 'Please Connect to Conflux Wallet!!!'
              else 
                // AlertResp('error', 'unknown error', 'error', 'close');
                error = 'unkown error';
                history.push({ 
                  pathname:'/info',
                  state: { success: false, msg:error}
                });
            }
        }
        sendTx(data, setSubmitting, null);
    }

    return (
        <div className="maxwidth-sl wrapper-y will-grow-more min-height-100-vh mx-auto clearfix">
            <div className="left-50 wrapper-y will-grow show-mediumup">
                <img src={defaultImage} alt="" className="desired-height h-100 z-depth-2"/>
            </div>
            <div className="pos-r z-depth-3 wrapper will-grow right-50 ">
            <div>
                <h2>Summary</h2>
                {/* <p>No account required. Start living on crypto.</p> */}
    
                {data && <div className="wrapper-y form-area">
                    <div className="input-group">
                        <p>Country : {data.country}</p>
                        <p>Amount : {data.amount}</p>
                        <p>Customer : {data.customer}</p>
                        <p>Amount in CFX : {Number(data.amountCFX).toFixed(6)}</p>
                    </div>
                    <div className="py-2">
                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting || !state.confluxInstalled } onClick={payNow} >
                            {!isSubmitting ? 'Start Buying' : 'Please Wait...'}</button>
                    </div>
                </div>}
            </div>
            </div>
        </div>
    )
}

export default Summary;