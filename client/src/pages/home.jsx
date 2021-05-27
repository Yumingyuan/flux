import React, { useEffect, useState } from 'react';
import { Airtel, BGImg, GLOLogo, MTN } from '../assets/image';
import HowItWorks from '../components/home/howItWorks';
import Landing from '../components/home/landing';
import Product from '../components/products/product';
import { DefMainImg } from '../assets/image';
import { getMainTxServ } from '../service/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        getMainTxServ().then((r)=>{
            console.log(r);
            setProducts(r.data);
        })
    }
    useEffect(()=>{
        getProducts();
    },[]);

    return(
        <>
            <div className="pos-a pattern z-depth-1 height-100-vh">
                <img src={BGImg} alt="" className="h-100" />
            </div>
            <Landing />
            <HowItWorks />
            <div className="main-wrap wrapper-y will-grow mx-auto">
                <div className="wrapper-y will-grow">
                    <h2 className="tx-c">Top Products</h2>
                </div>

                <div className="grid is-multi-col mostly-3">
                    {products && products.map((p, i) => 
                        <div key={i} className="pos-r desired-height-3qtr d-flx flex-dir-col j-c-fe rad-s">
                            <Product name={p.label} image={DefMainImg} code={p.value} country={p.country} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;