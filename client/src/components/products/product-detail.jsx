import React from 'react';
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import { productSchema } from '../../helpers/schemas/formSchema';
import { newTx } from '../../service/api';
import confluxAction from '../../actions/conflux.action';

const ProductDetail = ({ product }) => {
    const state = useSelector((state) => state.conflux);
    const dispatch = useDispatch();
    const { name, image, id, code, amount, description } = product;
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setSubmitting,
      // resetForm,
    } = useFormik({
      initialValues: {
        product: name,
        customer: '',
        amount: '',
        note:''
      },
      validationSchema: productSchema,
      onSubmit(values) {
        //   console.log('valll===>',values);
          return createTx(values);
        }
    });
    // console.log(state);
    
    const makePayment = (data) => {
        // console.log('going...', data);
        dispatch(confluxAction.sendTx(data, setSubmitting));
    }

    const ConnectConflux = () => {
      // console.log("loading...");
      dispatch(confluxAction.connectPortal());
    }
  

    const createTx = async (values) => {
        try{
          let r = await newTx(values);
            // console.log(r);
            if(r.status=='success'){
                return makePayment(r.data);  
            }
        }catch(err){
            console.log(err);  
        }
    };

    return (
        <div className="maxwidth-sl wrapper-y will-grow-more min-height-100-vh mx-auto clearfix">
          <div className="left-50 wrapper-y will-grow show-mediumup">
            <img src={image} alt="" className="desired-height h-100 z-depth-2"/>
          </div>
          <div className="pos-r z-depth-3 wrapper will-grow right-50 ">
            <form onSubmit={handleSubmit}>
              <h2>{name}</h2>
              <p>{description} No account required. Start living on crypto.</p>
  
              <div className="wrapper-y form-area">
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