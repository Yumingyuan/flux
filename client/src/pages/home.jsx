import React from 'react';
import { Airtel, BGImg, GLOLogo, MTN } from '../assets/image';
import HowItWorks from '../components/home/howItWorks';
import Landing from '../components/home/landing';
import Product from '../components/products/product';
import { products }from '../helpers/helpers';

const Home = () => {
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
                            <Product id={p.id} name={p.name} image={p.image} code={p.code} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;