import React from 'react';
import { PngOne, PngThree, PngTwo } from '../../assets/image';

const HowItWorks = () => {
    return(
        <div id="features">
          <h2 className="tx-c">How It Works</h2>
          <div className="main-wrap wrapper-y mx-auto">
            <div className="grid is-multi-col mostly-3 wrapper-y will-grow">
              <div>
                <span className="icon">
                  <img src={PngOne} alt=""/>
                </span>
                <div className="d-flx py-2">
                  <p>01.</p>
                  <div>
                    <h3>
                      Enter the amount
                    </h3>
                    <p className="smalltext">
                      Enter the amount you want the voucher to have
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="icon">
                  <img src={PngTwo} alt=""/>
                </span>
                <div className="d-flx py-2">
                  <p>02.</p>
                  <div>
                    <h3>
                      Pay with Crypto
                    </h3>
                    <p className="smalltext">
                      Your payment is confirmed the same minute in most cases
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="icon">
                  <img src={PngThree} alt=""/>
                </span>
                <div className="d-flx py-2">
                  <p>03.</p>
                  <div>
                    <h3>
                      
                      That’s it! Redeem your code.
                    </h3>
                    <p className="smalltext">
                      Once your payment is confirmed you will get your gift card code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default HowItWorks;