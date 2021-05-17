import React from 'react';
import { Link } from 'react-router-dom';
const connected =false;

const Navbar = () => {
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
            {connected ? <Link to="/account">
              Connected
            </Link> :
            <Link to="/login">
              <button>Connect</button>
            </Link>}
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