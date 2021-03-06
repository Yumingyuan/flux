import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import { productSchema } from '../../helpers/schemas/formSchema';
import { newTx, getTxServ } from '../../service/api';
import confluxAction from '../../actions/conflux.action';
import { DefMainImg } from '../../assets/image';
import { AlertResp } from '../../helpers/alert';
import { updateTx } from '../../service/api';
import { useHistory } from "react-router-dom";

const DEV = false;
const allowedNetowrk = DEV ? 1029 : 1;
const adminAccount = DEV? 'cfxtest:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc': 'cfx:aas3ew9nv1ck3kunrtvhe9act9ve9mhvspt4a2nchc';

const countries = [
  { label: 'Nigeria', value:'NG' },
  // { label: 'Ghana', value:'GH' },
]

const defaultImage = DefMainImg;

const ProductDetail = ({ code, country }) => {
    const state = useSelector((state) => state.conflux);
    let history = useHistory();
    const [services, setServices] = useState([]);
    const [labelName, setLabelName] = useState('customer');
    const dispatch = useDispatch();
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setSubmitting,
      setFieldValue,
      resetForm
    } = useFormik({
      initialValues: {
        product: '',
        country: country ? country : 'NG',
        customer: '',
        amount: '',
        note:'Tx from fluxGift'
      },
      validationSchema: productSchema,
      onSubmit(values) {
        return createTx(values);
      }
    });

    const fetchServices = (country, code=null) => {
      getTxServ(country).then((r)=>{
        setServices(r.data);
        if(code){
          const pr = r.data.filter(p=>p.value==code)[0];
          if(pr){
            setFieldValue('product', code);
            setLabelName(pr.label_name);
          } 
        }
      }).catch((e)=>{
        console.log(e);
      })
    }

    useEffect(()=>{
      fetchServices(values.country, code);
    },[country]);
    
    const setNewlabelName = (v) => {
      let nw = services.filter((val)=>val.value==v)[0];
      if(nw){ 
        setFieldValue('product', v);
        setLabelName(nw.label_name);
      }
      console.log(services, nw, v);
    }

    const makePayment = (data) => {
      const sendTx = (data, setSubmitting, resetForm) => {
        const conflux = window.conflux;
        const accounts = conflux.selectedAddress
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
                // console.log(error);
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
      sendTx(data, setSubmitting, resetForm);
        // dispatch(
          // confluxAction.sendTx(data, setSubmitting, resetForm);
          // );
    }

    const ConnectConflux = () => {
      dispatch(confluxAction.connectPortal());
    }

    const createTx = async (values) => {
      try{
        await ConnectConflux();
        if(state.connected){
          let r = await newTx(values);
          if(r.status=='success'){
            // return makePayment(r.data); 
            return history.push({
              pathname: '/summary',
              state: { data:r.data }
            })
          }
        }
      }catch(err){
        console.log(err);  
      }
    };

    // const 

    return (
        <div className="maxwidth-sl wrapper-y will-grow-more min-height-100-vh mx-auto clearfix">
          <div className="left-50 wrapper-y will-grow show-mediumup">
            <img src={defaultImage} alt="" className="desired-height h-100 z-depth-2"/>
          </div>
          <div className="pos-r z-depth-3 wrapper will-grow right-50 ">
            <form onSubmit={handleSubmit}>
              <h2>Bill Payments</h2>
              <p>No account required. Start living on crypto.</p>
  
              <div className="wrapper-y form-area">
                <div className="input-group">
                  <label htmlFor="country">Country</label>
                  <select id="country" type="text" value={values.country} onBlur={handleBlur} onChange={ (v) => {
                    console.log(v.target.value);
                    fetchServices(v.target.value);
                    setFieldValue('country', v.target.value);
                  }
                  }>
                    {countries.map((r, i) => <option key={i} value={r.value}>{r.label}</option>)}
                  </select>
                  {errors.country && touched.country ? (
                      <p style={{color:'red', opacity:0.7}}>*{errors.country}</p>
                  ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="product">Service</label>
                  <select id="product" type="text" value={values.product} onBlur={handleBlur} onChange={(v) => setNewlabelName(v.target.value)}>
                    <option selected value='' disabled>Please Select a Service</option>
                    {services.map((r, i) => <option key={i} value={r.value}>{r.label}</option>)}
                  </select>
                  {errors.product && touched.product ? (
                      <p style={{color:'red', opacity:0.7}}>*{errors.product}</p>
                  ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="customer">{labelName}</label>
                  <input id="customer" type="text" 
                    value={values.customer}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                    {errors.customer && touched.customer ? (
                        <p style={{color:'red', opacity:0.7}}>*{errors.customer}</p>
                    ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="amount">Amount</label>
                  <input id="amount" type="text" 
                    value={values.amount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    max={999999}
                    />
                    {errors.amount && touched.amount ? (
                        <p style={{color:'red', opacity:0.7}}>*{errors.amount}</p>
                    ) : null}
                </div>
                {/* <div className="input-group">
                  <label htmlFor="note">Note</label>
                  <input id="note" type="text" 
                    value={values.note}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div> */}
                <div className="py-2">
                 {state.connected ? 
                 <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting || !state.confluxInstalled } >
                      {!isSubmitting ? 'Start Buying' : 'Please Wait...'}</button>
                       :
                  <button className="btn btn-primary w-100" onClick={ConnectConflux} disabled={isSubmitting || !state.confluxInstalled } >
                                {!state.confluxInstalled ? 'Please Install Conflux Portal to Purchase': !state.connecting ? 'Please Connect to Conflux Portal' : 'Please Wait....'}</button>}
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}

export default ProductDetail;