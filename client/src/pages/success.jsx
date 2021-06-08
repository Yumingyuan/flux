import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from "react-router-dom";

import { DefMainImg } from '../assets/image';

const defaultImage = DefMainImg;


const Success = () => {
    const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(()=>{
        console.log('location--->', location);
        if(!location.state){
            return history.replace('/browse');
        }else{
            setData(location.state);
        }
    },[]);
    return (
        <div className="maxwidth-sl wrapper-y will-grow-more min-height-100-vh mx-auto clearfix">
            <div className="left-50 wrapper-y will-grow show-mediumup">
                <img src={defaultImage} alt="" className="desired-height h-100 z-depth-2"/>
            </div>
            <div className="pos-r z-depth-3 wrapper will-grow right-50 ">
           {data && <div>
                <h2>{data.success ? 'Transation Successful' : 'Transaction Occurred'}</h2>
                <p>{data.msg}</p>
                <div className="py-2">
                    <button to="/browse" className="btn btn-primary w-100" onClick={ () => 
                        history.replace('/browse')
                    }>Browse Products</button>
                </div>
            </div>}
            </div>
        </div>
    )
}

export default Success;