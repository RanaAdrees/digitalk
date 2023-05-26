import React,{useEffect,useContext} from 'react';
//import { DigiTalkContext } from './context/DigitalkContext';
import './App.css'
import Routers from './routes/Routers'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DigiTalkContext } from './context/DigitalkContext';
function App() {
  //const { checkIfEthereumExists } = useContext(DigiTalkContext); 
  
  const { connectedAccounts,connectWallet } = useContext(DigiTalkContext);
  const email=localStorage.getItem("email")
  return (
    <div>
      {
        connectedAccounts&&email?<Navbar /> : <></>
      }
     
      <Routers/>
      {/* <Footer /> */}
    </div>
  );
}

export default App
