import React from  'react';
import Product from '../components/products/product';
import { Airtel, GLOLogo, MTN } from '../assets/image';

const products = [
    {id: 1, name: 'MTN VTU top Up', image: MTN},
    {id: 2, name: 'Airtel Nigeria', image: Airtel},
    {id:3, name: 'Glo Nigeria', image: GLOLogo },
];
const pretext = 'LIVE ON CRYPTO',
herotext = 'Browse Products',
filter = [
  'All Items',
  'Entertainment',
  'Gaming',
  'Travel',
  'Prepaid Phones'
];

const Products = () => {
    return (
        <section className="browse">
          <div className="container">
            <div className="browse__copy">
              <p className="browse__copy-pretext">
                { pretext }
              </p>
              <p className="browse__copy-herotext">
                { herotext }
              </p>
            </div>
            <div className="filter">
              <div className="filter__ls">
                <select>
                  <option>Recent</option>
                </select>
                <select>
                  <option>Nigeria</option>
                </select>
                <div className="clear">
                  Clear Filter
                </div>
              </div>
              <div className="browse__filter">
                {filter.map((by, i) => <div key={i} className={`browse__filter-by mr-4 ${i === 0 ? `active` : ``}`}
                >
                  { by }
                </div>)}
              </div>
            </div>
            <div className="row mt-10">
              {products && products.map((p, i) => 
              <div key={i} className="col-md-4 col-lg-3 mb-3">
                <Product id={p.id} name={p.name} image={p.image} />
              </div>)}
            </div>
          </div>
        </section>
    )
}

export default Products;