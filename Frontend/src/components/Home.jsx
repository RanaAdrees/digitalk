import React, { useContext } from 'react'
import { DigiTalkContext } from '../context/DigitalkContext';
import Posts from './Posts';
import ComposePost from './Compose';
const Home = () => {
  const { connectedAccounts,connectWallet } = useContext(DigiTalkContext);

  return (
    <div>
      {connectedAccounts ?
        <>
          <ComposePost />
          <Posts />
        </> :
        <div className='container text-center d-flex flex-column justify-content-center'>
          <h1>
            Connect to the wallet in order to continue
          </h1>
          <button type='button' className='btn btn-primary ' onClick={connectWallet}>
              Connect to Wallet
            </button>

        </div>

      }


    </div>
  );
}

export default Home