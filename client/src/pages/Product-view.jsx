import React, { useEffect, useState} from 'react';
import ProductDetail from '../components/products/product-detail';
import { useParams, useHistory } from 'react-router-dom';
import { products } from '../helpers/helpers';
import { getTxServ } from '../service/api';
import queryString from 'query-string';

const ProductView = () => {
    const RParams = queryString.parse(window.location.search);
    let history = useHistory();
    const [ loading, setLoading] = useState(true);

    useEffect(()=>{
    //     let id = RParams.code;
    //     // const pr = services.filter(p=>p.value==id)[0];
    //     // console.log(id, '===>iddd', services, pr)
    //     // if(pr){
    //     //   console.log(id, pr);
    //     //   setProduct(pr)
    //     // } 
        setLoading(false);
    }, []);

    return (
        <main className="w-100 wrapper pos-r hide-flow-x">
            {!loading && <ProductDetail code={RParams.code} country={RParams.country} /> }
        </main>
    )
}
export default ProductView;