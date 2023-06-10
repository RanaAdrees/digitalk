import React, { useContext,useState,useEffect } from 'react'
import { DigiTalkContext } from '../context/DigitalkContext';
import { useNavigate } from "react-router-dom";
import HomeFeed from './HomeFeed';
import { BASE_URL } from "../utils/config";
import ConnectPage from './ConnectPage';

import Cookie from "js-cookie"
const Home = () => {
  const { connectedAccounts,connectWallet } = useContext(DigiTalkContext);
  const navigate = useNavigate();

  // const getSingleUser=async()=>{
  //   const id=JSON.parse
  //   const email=localStorage.getItem("email")
  //   try {
  //     const res = await fetch(`${BASE_URL}/users/${email}`, {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       }
  //     });

  //     const result = await res.json();
  //     if(result)
  //     {
  //       console.log(result)
  //     }
  //     const user={
  //       UserId:result._id,
  //       email:result.email,
  //     }
  //     Cookie.set("User",user)
  //   } catch (err) {
  //     console.log(err)
  //   }

  // }
  useEffect(() => {

    if(!localStorage.getItem("user"))
    {
      navigate("/login")
    }
    else
    {
      Cookie.set("user",JSON.parse(localStorage.getItem("user")))
     
    }
  }, [])
  return (
    
    <div>
      {connectedAccounts ?
        <>
          <HomeFeed status="home"/>
          {/* <HomeFeed/> */}
        </> :
        <>
          <ConnectPage/>
        </>

      }


    </div>
  );
}

export default Home