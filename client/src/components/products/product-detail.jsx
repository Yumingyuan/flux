import React from 'react';
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import { productSchema } from '../../helpers/schemas/formSchema';
import { newTx } from '../../service/api';
import confluxAction from '../../actions/conflux.action';

const ProductDetail = ({ product }) => {
    const state = useSelector((state) => state.conflux);
    const dispatch = useDispatch();
    const { name, image, id, code, amount } = product;
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
    console.log(state);
    
    const makePayment = (data) => {
        // console.log('going...', data);
        dispatch(confluxAction.sendTx(data, setSubmitting));
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
        <section className="row product-section">
            <div className="col-md-6" style={{background:'white', padding: '0 20px'}}>
                <div className="product__img" style={{ backgroundImage: `url(${image})`, backgroundRepeat:'no-repeat', backgroundSize:'contain', backgroundPosition:'center' }}>
                {/* <img src={image} /> */}
                </div>
            </div>
            <div className="col-md-6">
                <div className="product__details">
                    <div className="product__details-title">
                        <h4>{name}</h4>
                        <button><ph-heart /></button>
                    </div>
                    <div className="product__details-content">
                        Use CFX to pay buy {name} Instant delivery.
                        No account required. Start living on crypto!
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* <ul className="product__details-prices mt-10">
                            {[1,2,3,4,5].map((price, i) => 
                            <li key={i}>
                                <input type="radio" className="mr-2"/>
                                <div className="product__details-prices__price">
                                    <span>5000-V-Bucks</span>
                                    <span className="value">0.00071487 USD</span>
                                </div>
                            </li>)}
                        </ul> */}
                        <div className="product__details-prices mt-10">
                            <div className="input-field">
                                <p>Customer</p>
                                <div className="input-con">
                                    <input type="text" placeholder="customer"
                                        name="customer"
                                        value={values.customer}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                </div>
                                {errors.customer && touched.customer ? (
                                <>
                                    <p style={{color:'red', opacity:0.7}}>*{errors.customer}</p>
                                </>
                                ) : null}
                            </div>
                            <div className="input-field">
                                <p>Amount</p>
                                <div className="input-con">
                                    <input name="amount" type="number" placeholder="500" 
                                        value={values.amount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                </div>
                                {errors.amount && touched.amount ? (
                                <>
                                    <p style={{color:'red', opacity:0.7}}>*{errors.amount}</p>
                                </>
                                ) : null}
                            </div>
                            <div className="input-field">
                                <p>Note</p>
                                <div className="input-con">
                                    <input name="note" type="text" placeholder="Buying airtime for john doe" 
                                        value={values.note}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                </div>
                                {errors.note && touched.note ? (
                                <>
                                    <p style={{color:'red', opacity:0.7}}>*{errors.note}</p>
                                </>
                                ) : null}
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="add-cart mt-10 btn--big" type="submit" disabled={isSubmitting || !state.confluxInstalled } >
                                {!state.confluxInstalled ? 'Please Install Conflux Portal to Purchase': !state.connected ? 'Please Connect to Conflux Portal' : !isSubmitting ? 'Purchase' : 'Please Wait...'}
                                {/* <ph-shopping-cart-simple className="ml-5" size="16" /> */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail;