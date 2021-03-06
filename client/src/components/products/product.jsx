import React from 'react';
import { Link } from 'react-router-dom';
// img ="https://d1ralsognjng37.cloudfront.net/8255c295-44b5-4242-90c5-999645166eb3.jpeg";

const Product = ({name, image, code, country}) => {
    // console.log(id, code, image, name);
    return(
        <Link to={`/browse?code=${code}&country=${country}`}>
            <span className="dark-overlay"></span>
            <img src={image} alt="" className="product-image" />
            <div className="pos-r z-depth-2 p-2">
                <button className="w-100 btn btn-blur">{name}</button>
            </div>
        </Link>
    );
}

export default Product;