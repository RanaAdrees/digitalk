import React,{useContext, useEffect} from 'react'
import Posts from '../components/Posts';
import ComposePost from '../components/Compose';
import { DigiTalkContext } from '../context/DigitalkContext';

const HomeFeed = ({status}) => {
// const HomeFeed = () => {

  const {selfpostsArr,postsArr,fetchPostyAddess,connectedAccounts}=useContext(DigiTalkContext);
// const [count, setcount] = useState(0)
  //   useEffect(()=>{

  //     if(status==="profile")
  //     {

  //     }
  // else
  // {
  //   setcount(postArr.length);
  //       const publicKey=localStorage.getItem("key")
  //       const arr=postsArr
  //       for (let index = 0; index < arr.length; index++) {
  //         if(arr[index].status=="private")
  //         {

  //         }
          
  //       }
  // }
  
        
  //   },[])

  
  useEffect(() => {
    fetchPostyAddess()

  }, [])
  return (
    <>
        <ComposePost />
        {
          status==="profile"?<Posts Arr={selfpostsArr} count={selfpostsArr.length}/>:<Posts Arr={postsArr}  count={postsArr.length}/>
        }
    </>
  )
}

export default HomeFeed