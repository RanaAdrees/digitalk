import React,{useContext} from 'react'
import Identicon from 'identicon.js';
import logo from '../../public/Images/DigiTalk.png';
import {DigiTalkContext} from '../context/DigitalkContext';
import { AccountSlice } from '../utils/AccountSlice';
const Navbar = () => {

    const { connectedAccounts, connectWallet } = useContext(DigiTalkContext);

    let options = {
        foreground: [255, 255, 255, 255],               // rgba black
        background: [0, 0, 0, 255],         // rgba white
        margin: 0.2                              // 20% margin
      };

    
    return (
        <div>
            <nav  className="navbar navbar-expand-lg navbar-dark  bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} widt="70" height="40" className="d-inline-block align-top" alt=""/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">

                        <ul className="navbar-nav mb-lg-0 mr-auto">
                            <li className="nav-item ">
                                {connectedAccounts?
                                <div className='d-flex justify-content-center'>
                                        <img
                                        className='ml-2'
                                        width='50'
                                        height='50'
                                        src={`data:image/png;base64,${new Identicon(connectedAccounts, options).toString()}`}
                                        />
                                        <p id='account_nav' className='text-secondary text-center mt-2 white'>{AccountSlice(connectedAccounts)}</p>
                                </div>
                                :<button type='button' className='btn btn-primary ' onClick={connectWallet}>
                                    Connect to Wallet
                                </button>

                                }
                            </li>
                        </ul>
                      
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar