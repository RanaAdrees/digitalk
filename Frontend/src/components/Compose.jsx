import React, { useContext, useState,useEffect } from 'react'
import { DigiTalkContext } from '../context/DigitalkContext';
import Identicon from 'identicon.js';
import { AccountSlice } from '../utils/AccountSlice';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { BASE_URL } from "../utils/config";

import Loader from './Loader'

const Compose = () => {

  const [values, setvalues] = useState({
    PROJECTID:"",
    PROJECTSECRET:""

  })

  // useEffect(async() => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/auth/config`, {
  //       method: "get",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });

  //     const result = await res.json();

  //     if(res.ok)
  //     {
  //       setvalues({
  //         PROJECTID:result.PROJECTID,
  //         PROJECTSECRET:result.PROJECTSECRET
  //       })
  //     }
  //   } catch (err) {
  //     alert(err.message);
  //   }
  
  // }, [])
  

  const [fileName, setfileName] = useState("")

  const { connectedAccounts, formData, setformData, isLoading, createNewPost } = useContext(DigiTalkContext);

  // const projectId = "2LRiHmzyN5npk3eismPkUzXQjB6";
  // const projectSecret = "7f1cba54c2a43dbfea5b1ddebccaa31b";
  const authorization = "Basic " + btoa("2LRiHmzyN5npk3eismPkUzXQjB6"+ ":" + "7f1cba54c2a43dbfea5b1ddebccaa31b");


  


  // const ipfsNode = ipfs({
  //   host: 'ipfs.infura.io',
  //   port: 5001,
  //   protocol: 'https'
  // });

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers:{
      authorization
    }
  })

  let options = {
    foreground: [162, 25, 255, 255],               // rgba black
    background: [255, 255, 255, 255],         // rgba white
    margin: 0.2                              // 20% margin

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await ipfs.add(formData["buffer"]);

    console.log("result is:",result);
    console.log("result is:",result.path);

    // createNewPost();
    createNewPost(result.path,fileName);


  }

  const captureFile = async (e) => {
    e.preventDefault();
    const nameAtt = e.target.name;

    const file = e.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file);
    
    setfileName(file.name);

    reader.onloadend = () => {

      setformData((prevState) => ({ ...prevState, [nameAtt]: reader.result }));
      console.log("Reader result:", reader.result)
      console.log("formData:", formData)
      // save in state
    }
  }

  const handleChange = (e) => {
    const nameAtt = e.target.name;
    console.log(e.target.name)
    console.log(e.target.value)
    setformData((prevState) => ({ ...prevState, [nameAtt]: e.target.value }));

    console.log(formData)


  }
  return (
    <div className='container-fluid mt-5' style={{ maxWidth: '500px' }}>

      <div className='d-flex justify-content-center'>
        <img
          className='ml-2'
          width='50'
          height='50'
          src={`data:image/png;base64,${new Identicon(connectedAccounts, options).toString()}`}
        />
        <p className='text-black text-center mt-2 '>{AccountSlice(connectedAccounts)}</p>

      </div>
      <h2>Write a post</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="mt-2" >
        <input type='file' accept=".jpg, .jpeg, .png, .pdf, .doc" name='buffer' onChange={(e) => captureFile(e)} required />
        <div className="form-group mr-sm-2">
          <br></br>
          <input
            id="description"
            type="text"
            name='description'
            className="form-control"
            placeholder="What is in your mind"
            onChange={(e) => { handleChange(e) }}
            required />
        </div>
        <button type="submit" className="btn btn-primary btn-sm mt-3">Upload!</button>
        {isLoading ?
          <Loader />
          :
          <></>

        }
      </form>
    </div>
  );
}

export default Compose