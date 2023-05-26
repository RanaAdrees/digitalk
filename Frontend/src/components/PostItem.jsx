import {React,useEffect,useState,useContext} from 'react'
import Identicon from 'identicon.js';
import { AccountSlice } from '../utils/AccountSlice';
import { DigiTalkContext } from '../context/DigitalkContext';
import { ethers } from "ethers";
const PostItem = ({ post }) => {

  // const [documentUrl, setDocumentUrl] = useState(null);
  // const [fileData, setfileData] = useState(null);

  const [extension, setExtension] = useState("");
  const [isImage, setisImage] = useState(false);

  const imageExtensions=["jpg", "jpeg", "png"]
  const docExtension=["pdf", "doc"]

  const { tipOwner } = useContext(DigiTalkContext);

  const handleExension=()=>{

    const [, extension] = post.fileName.split(".");

    console.log("File extension:",extension)
    setExtension(extension);

    if (imageExtensions.includes(extension)) {
      setisImage(true);
    } else if (docExtension.includes(extension)) {
      setisImage(false);
    } 

  }
  useEffect(() => {
   handleExension();
  }, []);
  


  // useEffect(() => {
  //   // Retrieve the file data from IPFS using the file hash
  //   const fetchData = async () => {
  //     const response = await fetch(`https://ipfs.io/ipfs/${post.hash}`);
  //     const data = await response.text();
  //     setfileData(data);
  //   };

  //   if (post.hash) {
  //     fetchData();
  //   }
  // }, [post.hash]);
  
 

  const getRndInteger=(min, max) =>{
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  

  const value1=getRndInteger(0,255);
  const value2=getRndInteger(0,255);
  const value3=getRndInteger(0,255);

  // const handleDownload = () => {
  //   const link = document.createElement('a');
  //   link.href = documentUrl;
  //   link.download = 'document.pdf';
  //   link.click();
  // };


  let options = {
    foreground: [value1, value2, value3, 255],               // rgba black
    background: [255, 255, 255, 255],         // rgba white
    margin: 0.2                              // 20% margin
  };
  return (
    <div>
      <div className="card mt-3" style={{maxWidth: "700px"}}>
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
          {isImage?
            <img src={`https://ipfs.io/ipfs/${post.hash}`} style={{ maxWidth: '420px'}}/>
            
            :
            <>

            <button download={post.hash}>Download Document</button>
            
            </>
            
          }
        <div className='row'>

            <small className="float-left mt-1 text-muted">
            TIPS:
              {
                post.tipAmount?
                ethers.utils.formatEther(post.tipAmount.toString()): ""
              }
              ETH      
            </small>
            <button
              className="btn btn-sm float-right pt-0 btn-primary"
              name={post.id}
              onClick={ (event) => {
                tipOwner(post.id);
              }}
              
            >
              TIP 0.1 ETH
            </button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default PostItem