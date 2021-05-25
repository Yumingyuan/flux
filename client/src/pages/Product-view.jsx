import React, { useEffect, useState} from 'react';
import ProductDetail from '../components/products/product-detail';
import { useParams, useHistory } from 'react-router-dom';
import { products } from '../helpers/helpers';

const ProductView = () => {
    const RParams = useParams();
    let history = useHistory();
    const [ loading, setLoading] = useState(true);
    const [ product, setProduct] = useState(null);
    useEffect(() => {
      let id = RParams.id;
        const pr = products.filter(p=>p.id==id)[0];
        if(pr){
          console.log(id, pr);  
          setProduct(pr)
          setLoading(false);
        }else{
            history.push('/404');
            console.log('product not existing...')
        }        
    },[]);

    return (
        <main className="w-100 wrapper pos-r hide-flow-x">
            {!loading && product && <ProductDetail product={product}/> }
        </main>
    )
}
export default ProductView;