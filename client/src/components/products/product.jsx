import React from 'react';
import { Link } from 'react-router-dom';
// img ="https://d1ralsognjng37.cloudfront.net/8255c295-44b5-4242-90c5-999645166eb3.jpeg";
const Product = ({id, name, image, reward, isFeatured}) => {
    return(
        <Link to={`/product/${id}`}>
            <section className="product" style={{background:'white', padding: '0 20px'}}>
            <div className="product__img" style={{ backgroundImage: `url(${image})`, backgroundRepeat:'no-repeat', backgroundSize:'contain', backgroundPosition:'center' }}>
                <div className="product__img-tags">
                {isFeatured && <div className="product__img-tags__feat"> Featured</div>}
                {reward && <div className="product__img-tags__rewards"><ph-star size="16" className="mr-2" />{reward}% Rewards</div>}
                </div>
                <div className="product__img-name">
                {name}
                </div>
                {/* <img src={image} alt="product" /> */}
            </div>
            </section>
        </Link>
    );
}

export default Product;