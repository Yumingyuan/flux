import React from 'react';
import { Link } from 'react-router-dom';
// img ="https://d1ralsognjng37.cloudfront.net/8255c295-44b5-4242-90c5-999645166eb3.jpeg";

const Product = ({id, name, image, reward, isFeatured}) => {
    return(
        <Link to={`/product/${id}`}>
            <span className="dark-overlay"></span>
            <img src={image} alt="" className="product-image" />
            <div className="pos-r z-depth-2 p-2">
                <button className="w-100 btn btn-blur">{name}</button>
            </div>
        </Link>
    );
}

export default Product;