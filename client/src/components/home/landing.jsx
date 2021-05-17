import React from 'react';
import { salty13 } from '../../assets/image';
// import '../../assets/css/components/home/_landing.scss';

const pretext = 'LIVE ON CRYPTO',
herotext = 'Make your daily payments with crypto',
caption = 'Buy gift cards for anything under the sun. No account necessary.'
    
const Landing = () => {
    return(
      <section class="landing">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="landing__copy">
                <p class="landing__copy-pretext">
                  {pretext}
                </p>
                <p class="landing__copy-herotext">
                  { herotext }
                </p>
                <p class="landing__copy-caption">
                  { caption }
                </p>
                <div class="landing__copy-action">
                  <button class="landing__copy-action__buy">
                    Start buying
                  </button>
                  <button class="landing__copy-action__play ml-5">
                    
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="landing__saly13">
                <img src={salty13} alt="home" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Landing;
