import React,{useEffect} from 'react'
import Posts from '../components/Posts';
import ComposePost from '../components/Compose';

const HomeFeed = () => {

    useEffect(()=>{
        
    },[])
  return (
    <>
        <ComposePost />
        <Posts />
    </>
  )
}

export default HomeFeed