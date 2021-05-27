import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import confluxAction from '../../actions/conflux.action';
import { LogoImg } from '../../assets/image';
// const connected =false;

const Navbar = () => {
  const state = useSelector((state) => state.conflux);
  const dispatch = useDispatch();
  // const [connected, setConnected] = useState(false);

  useEffect(()=>{
    // check
  },[state]);
  // console.log(state);

  const ConnectConflux = () => {
    // console.log("loading...");
    dispatch(confluxAction.connectPortal());
  }

  return (
    <>
      <a className="skip-link sr" href="#main"></a>
      <h1 className="sr">Fluxgift</h1>
      <header className="w-100 pos-f z-depth-4">
        <nav className="main-wrap pos-r mx-auto wrapper d-flx al-i-c j-c-sb">
          <div>
            <div className="logo">
              <Link to='/'>
                <img src={LogoImg} alt="Fluxgift Logo"/>
              </Link>
            </div>
          </div>
          
          <div className="">
            <ul className="none d-flx al-i-c">
              <li className="prefix suffix is-even-wider show-mediumup"><Link to="browse" className="nav-link">Browse Product</Link></li>
              { state.confluxInstalled ?
               state.connected ? <li className="suffix is-even-wider"><button className="btn btn-transparent suffix">Connected</button></li> :
              <li className="suffix is-even-wider"><button className="btn btn-transparent suffix" onClick={ConnectConflux}>Connect</button></li> : 
              <li className="suffix is-even-wider"><button className="btn btn-transparent suffix" onClick={console.log("install")}>Install Conflux Portal</button></li> }
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar;