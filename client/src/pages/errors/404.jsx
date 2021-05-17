import React from 'react';

const Page404 = () => {
    return (  
        <section className="landing">    
            <div className="container" style={{ height: '50vh', textAlign:'center'}}>
                <div className="row m-auto justify-content-center align-item-center">
                    <div className="col-6 text-center">
                        <h1 className="title" style={{fontSize: '100px', marginBottom: 0}}>404</h1>
                        <p className="description" style={{fontSize: '30px', marginTop: 0}}>Page Not Found!!</p>   
                    </div>                    
                </div>                
            </div>
        </section>  
    )
}
export default Page404;