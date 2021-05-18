import React from 'react';
import { salty13 } from '../../assets/image';
// import '../../assets/css/components/home/_landing.scss';

const pretext = 'LIVE ON CRYPTO',
herotext = 'Make your daily payments with crypto',
caption = 'Buy gift cards for anything under the sun. No account necessary.'
    
const Landing = () => {
    return(
      <section className="landing">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="landing__copy">
                <p className="landing__copy-pretext">
                  {pretext}
                </p>
                <p className="landing__copy-herotext">
                  { herotext }
                </p>
                <p className="landing__copy-caption">
                  { caption }
                </p>
                <div className="landing__copy-action">
                  <button className="landing__copy-action__buy">
                    Start buying
                  </button>
                  <button className="landing__copy-action__play ml-5">
                    
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="landing__saly13">
                <img src={salty13} alt="home" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Landing;
