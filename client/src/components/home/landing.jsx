import React from 'react';
import { HeroBanner } from '../../assets/image';
import { Link } from 'react-router-dom';

const pretext = 'LIVE ON CRYPTO',
herotext = 'Make your daily payments with crypto',
caption1 = 'Buy gift cards for anything under the sun.',
caption2 = 'No account necessary.',
buyText = 'Start Buying'

const Landing = () =>{
  return(
    <div className="main-wrap wrapper-y will-grow-more min-height-100-vh  mx-auto d-flx flex-dir-col j-c-c al-i-fs">
        <div className="pos-r z-depth-3 wrapper-y will-grow maxwidth-tb">
          <p>{pretext}</p>
          <h1 className="maxwidth-tb fw-bold">{herotext}</h1>
          <p className="maxwidth-sm smalltext wrapper-y">
            {caption1}
            <br/>
            {caption2}
          </p>
  
          <div className="">
            <Link to="/browse"><button className="btn btn-primary prefix">{buyText}</button></Link>
          </div>
          <img src={HeroBanner} alt="" className="main-hero-image z-depth-2" />
        </div>
      </div>
  )
}

export default Landing;
