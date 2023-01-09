import React from 'react'
import Identicon from 'identicon.js';
import { AccountSlice } from '../utils/AccountSlice';
const PostItem = ({ post }) => {


  const getRndInteger=(min, max) =>{
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  const value1=getRndInteger(0,255);
  const value2=getRndInteger(0,255);
  const value3=getRndInteger(0,255);

  let options = {
    foreground: [value1, value2, value3, 255],               // rgba black
    background: [255, 255, 255, 255],         // rgba white
    margin: 0.2                              // 20% margin
  };
  return (
    <div>
      <div className="card mt-3" style={{width: "18rem"}}>
        <div className='card-header d-flex justify-content-center'>
          <img
            className='ml-2'
            width='50'
            height='50'
            src={`data:image/png;base64,${new Identicon(post.auther, options).toString()}`}
          />
          <p className='text-black text-center mt-2 '>{AccountSlice(post.auther)}</p>

        </div>
        <br />
        <div className="card-body">
          <p className="card-text">{post.description}</p>
        </div>
      </div>
    </div>
  )
}

export default PostItem