import React,{useEffect,useContext} from 'react';
//import { DigiTalkContext } from './context/DigitalkContext';
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  //const { checkIfEthereumExists } = useContext(DigiTalkContext); 
  

  return (
    <div>
      <Navbar />
      <Home/>
      <Footer />
    </div>
  );
}

export default App
