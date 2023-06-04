import React,{useContext,useState} from 'react'
import Identicon from 'identicon.js';
import logo from '/Images/DigiTalk.png';
import {DigiTalkContext} from '../../context/DigitalkContext';
import { AccountSlice } from '../../utils/AccountSlice';
import { Link, useLocation } from "react-router-dom";
// import Logo from '/public/Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBell, faComments, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
const Navbar = () => {

    const { connectedAccounts, connectWallet } = useContext(DigiTalkContext);

    let options = {
        foreground: [255, 255, 255, 255],               // rgba black
        background: [0, 0, 0, 255],         // rgba white
        margin: 0.2                              // 20% margin
      };
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation(); // Hook from react-router-dom to get the current location

  const handleBellIconClick = () => {
    setShowNotifications(!showNotifications);
  };
    
    return (
        <div>
            {/* <nav  className="navbar navbar-expand-lg navbar-dark  bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid"> */}
                    {/* <a className="navbar-brand" href="#">
                        <img src={logo} widt="70" height="40" className="d-inline-block align-top" alt=""/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">

                        <ul className="navbar-nav mb-lg-0 mr-auto"> */}
                            {/* <li className="nav-item "> */}
                                {connectedAccounts?
                                    <nav className="navbar p-2 shadow">
                                        <span className="logo"><img src={logo} widt="70" height="40" alt="logo" /></span>
                                        <nav className="middle-nav">
                                        <ul className=''>
                                            <li className={location.pathname === "/" ? "active" : ""}>
                                            <Link to="/">
                                                <FontAwesomeIcon icon={faHome} />
                                            </Link>
                                            </li>
                                            <li className={location.pathname === "/notifications" ? "active" : ""}>
                                            <Link to="/notifications" onClick={handleBellIconClick}>
                                                <FontAwesomeIcon icon={faBell} />
                                            </Link>
                                            </li>
                                            <li className={location.pathname === "/profile" ? "active" : ""}>
                                            <Link to="/profile">
                                                <FontAwesomeIcon icon={faUser} />
                                            </Link>
                                            </li>
                                        </ul>
                                        </nav>
                                        <div className="parent">
                                        <span className="vertical-bar">_________</span>
                                  <input className="search-bar" type="text" placeholder="Search for anything..." />
                                  <a className="search-icon" href="https://www.google.com">
                                    <FontAwesomeIcon className="search-icon-logo" icon={faSearch} />
                                  </a>
                                </div>
                              </nav>
                                :<button type='button' className='btn btn-primary ' onClick={connectWallet}>
                                    Connect to Wallet
                                </button>

                                }
                            {/* </li>
                        </ul>
                      
                    </div> */}

        </div>
    )
}

export default Navbar



{/* <div className='d-flex justify-content-center'>
<img
className='ml-2'
width='50'
height='50'
src={`data:image/png;base64,${new Identicon(connectedAccounts, options).toString()}`}
/>
<p id='account_nav' className='text-secondary text-center mt-2 white'>{AccountSlice(connectedAccounts)}</p>
</div> */}