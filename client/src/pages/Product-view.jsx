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
    const [ product, setProduct] = useState(null);
    const [ services, setServices] = useState([]);
    
    const getService = () => {
      getTxServ().then((r)=>{
        console.log('respo===>', r);
        setServices(r.data);
      }).catch((e)=>{
        console.log(e);
      })
    }

    useEffect(() => {
        getService();
    },[]);

    useEffect(()=>{
        let id = RParams.code;
        const pr = services.filter(p=>p.value==id)[0];
        console.log(id, '===>iddd', services, pr)
        if(pr){
          console.log(id, pr);
          setProduct(pr)
        } 
        setLoading(false);
    }, [services]);

    return (
        <main className="w-100 wrapper pos-r hide-flow-x">
            {!loading && services && <ProductDetail item={product} services={services} /> }
        </main>
    )
}
export default ProductView;