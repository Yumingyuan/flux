import React from 'react';
import { Airtel, BGImg, GLOLogo, MTN } from '../assets/image';
import HowItWorks from '../components/home/howItWorks';
import Landing from '../components/home/landing';
import Product from '../components/products/product';
const products = [
    {id: 1, name: 'MTN VTU top Up', image: MTN},
    {id: 2, name: 'Airtel Nigeria', image: Airtel},
    {id:3, name: 'Glo Nigeria', image: GLOLogo },
];

const HomeOld = () => {
    return (
        <section>
            <Landing/>
            <div className="container">
                <section className="explore">
                    <div className="title">
                        <div className="title-ls" />
                        <h4>Top Products</h4>
                        <div className="title-rs" />
                    </div>
                </section>
                <div className="row mt-10">
                    {products && products.map((p, i) => 
                        <div key={i} className="col-md-4 mb-3">
                            <Product id={p.id} name={p.name} image={p.image} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
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
                            <Product id={p.id} name={p.name} image={p.image} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;