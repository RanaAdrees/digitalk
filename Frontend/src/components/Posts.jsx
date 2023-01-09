import React, { useContext, useState } from 'react'
import { DigiTalkContext } from '../context/DigitalkContext';
import Loader from './Loader';
import PostItem from './PostItem';

const Posts = () => {
  const { postsArr, postCount,isLoading } = useContext(DigiTalkContext);
  return (
    <>
      {postCount > 0 ?
        <div className="container-fluid mt-5">
          <div className="row">
            {isLoading ?
              <Loader />
              :
              <div className='content mr-auto ml-auto posts_container'>

                {postsArr.map((post, i) => {
                  return (
                    <PostItem post={post} key={i} />
                  )
                })
                }

              </div>
            }
          </div>
        </div> :
        <p className='text-center'>
          Write a post
        </p>

      }

    </>



  )
}

export default Posts