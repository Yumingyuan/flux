import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import confluxAction from '../../actions/conflux.action';
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
    <div className="navbar">
    <div className="container d-flex justify-content-between align-items-center">
      <Link to="/">
        <div className="navbar__logo">
          fluxgift.
        </div>
      </Link>
      {/* <div v-if="sidebarShow" className="mask" @click="sidebarShow = false" /> */}
      <div className="navbar__links">
        <div className="navbar__links-search">
          {/* <ph-magnifying-glass /> */}
          <div className="input-field">
            <div className="input-con">
              <input
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <ul>
          <li>
            <Link to="/browse">
              Browse Products
            </Link>
          </li>
          <li>
            {state && state.connected ? <Link to="/account">
              Connected
            </Link> :
            <a onClick={ConnectConflux}>
              <button>Connect</button>
            </a>}
          </li>         
        </ul>
      </div>
      <div className="navbar__rs">
        <div className="navbar__rs-menu">
            {/* <hamburger /> */}
        </div>
      </div>
    </div></div>
    )
}

export default Navbar;