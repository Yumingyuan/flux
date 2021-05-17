import React from 'react';
import { Airtel, GLOLogo, MTN } from '../assets/image';
import Landing from '../components/home/landing';
import Product from '../components/products/product';
const products = [
    {id: 1, name: 'MTN VTU top Up', image: MTN},
    {id: 2, name: 'Airtel Nigeria', image: Airtel},
    {id:3, name: 'Glo Nigeria', image: GLOLogo },
]
const Home = () => {
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
export default Home;