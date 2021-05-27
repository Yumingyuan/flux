import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import { productSchema } from '../../helpers/schemas/formSchema';
import { newTx, getTxServ } from '../../service/api';
import confluxAction from '../../actions/conflux.action';
import { DefMainImg } from '../../assets/image';

const countries = [
  { label: 'Nigeria', value:'NG' },
  { label: 'Ghana', value:'GH' },
]

const defaultImage = DefMainImg;

const ProductDetail = ({ code, country }) => {
    const state = useSelector((state) => state.conflux);
    const [services, setServices] = useState([]);
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
        note:''
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
          } 
        }
      }).catch((e)=>{
        console.log(e);
      })
    }

    useEffect(()=>{
      fetchServices(values.country, code);
    },[country]);
    
    const makePayment = (data) => {
        dispatch(confluxAction.sendTx(data, setSubmitting, resetForm));
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
            return makePayment(r.data); 
          }
        }
      }catch(err){
        console.log(err);  
      }
    };

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
                  <select id="product" type="text" value={values.product} onBlur={handleBlur} onChange={handleChange}>
                    <option selected value='' disabled>Please Select a Service</option>
                    {services.map((r, i) => <option key={i} value={r.value}>{r.label}</option>)}
                  </select>
                  {errors.product && touched.product ? (
                      <p style={{color:'red', opacity:0.7}}>*{errors.product}</p>
                  ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="customer">Customer</label>
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
                    />
                    {errors.amount && touched.amount ? (
                        <p style={{color:'red', opacity:0.7}}>*{errors.amount}</p>
                    ) : null}
                </div>
                <div className="input-group">
                  <label htmlFor="note">Note</label>
                  <input id="note" type="text" 
                    value={values.note}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                <div className="py-2">
                 {state.connected ? <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting || !state.confluxInstalled } >
                      {!isSubmitting ? 'Start Buying' : 'Please Wait...'}</button> :
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