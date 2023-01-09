import React, { useContext, useState } from 'react'
import { DigiTalkContext } from '../context/DigitalkContext';
import Identicon from 'identicon.js';
import { AccountSlice } from '../utils/AccountSlice';
import Loader from './Loader'
const Compose = () => {

  const { connectedAccounts, formData, setformData,isLoading,createNewPost } = useContext(DigiTalkContext);

  let options = {
    foreground: [162, 25, 255, 255],               // rgba black
    background: [255, 255, 255, 255],         // rgba white
    margin: 0.2                              // 20% margin

  };

  const handleSubmit = async(e) => {
    e.preventDefault();

     createNewPost();
    

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
      <form onSubmit={(e)=>handleSubmit(e)} className="mt-2" >
        <input type='file' accept=".jpg, .jpeg, .png, .pdf, .doc" />
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
        {isLoading?
          <Loader/>
          :
          <></>

        }
      </form>
    </div>
  );
}

export default Compose