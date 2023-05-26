import React,{useState,useEffect} from 'react';

import {contractAbi,deployedContractAddress} from '../utils/constants';

import { ethers } from "ethers";

export const DigiTalkContext=React.createContext();

const {ethereum}=window;

// const contrAbi = [

//     "function name() view returns(string)",
    
//     // Create Post
//     "function createPost(string memory _description)",

//     // Get all posts
//     "function getAllPosts() view returns(PostStruct[] memory)",
  
//     // get post count
//     "function getPostsCount() view returns(uint)",
   
//     // An event triggered wheneverpost created
//     "event Post(uint id,string description, address payable auther)"
//   ];

const createContract=async()=>{

   const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const digitalkContract = new ethers.Contract(deployedContractAddress, contractAbi, provider);


    console.log(
        provider,
        signer,
        digitalkContract)

    return {
        signer:signer,
        digitalkContract:digitalkContract
    };
};

export const DigiTalkProvider=({children})=>{

    const [formData, setformData] = useState({
        description: "",
        buffer:""
    });

    const [postsArr, setpostsArr] = useState([]);

    const [connectedAccounts, setconnectedAccounts] = useState("");

    const [isConnected, setisConnected] = useState(false)
    const [isLoading, setisLoading] = useState(false);

    const [postCount, setpostCount] = useState(localStorage.getItem("postCount"))


    const checkIfEthereumExists=async()=>{
        try{

            if(!ethereum){
                return alert("Please install metamask first!! No etherum object");
            }
            console.log("Inside checkIfEthereumExists");

            const accounts = await ethereum.request({ method: "eth_accounts" });
    
            if(accounts.length){
                //console.log("Setting accounts")
               
                setconnectedAccounts(accounts[0]);
                setisConnected(true);

                fetchAllPosts();

               // console.log("After setting :" + connectedAccounts)
            }
            else{

                console.log("No accounts found");
            }
        }
        catch(err){
            console.log(err);
            alert("Please install metamask first!! No etherum object checkIfEthereumExists");
        }

    }


    const getPostsCount=async()=>{
        try{

            if(!ethereum){
                return alert("Please install metamask first!! No etherum object");
            }
            console.log()
            if(ethereum )
            {
                console.log("Inside getPostsCount ")
                
                    //const  digitalkContractWithSigner = await CreatAndConnectSigner();
                    let  digitalkContract = await createContract();

                    digitalkContract=digitalkContract["digitalkContract"];

                    const PostsCount=await digitalkContract.getPostsCount();

                    console.log("Post count:",PostsCount.toNumber());
                    
                    window.localStorage.setItem("postCount",PostsCount);

                    
        
                    setpostCount(PostsCount)

                    console.log("first call:"+PostsCount)
            }
            
        }
        catch(err){
            console.log(err);
            alert("Please install metamask first!! No etherum object getPostsCount");
        }

    }

    // connect to metamask account or multiple accounts

    const connectWallet=async()=>{

        try{
            console.log("Clicked connectWallet")
            if(!ethereum){

                return alert("Please install metamask first!! No etherum object");
            }
    
            // will help to connect to metamask
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            console.log("Connected::::")
            setconnectedAccounts(accounts[0]);
            setisConnected(true)

            window.location.reload();

        }
        catch(err){
            console.log(err);
            alert("Connect to metamask in order to continue");
        }
 
    }

    const CreatAndConnectSigner=async()=>{

        const digiTalkContractObj= await createContract();

        console.log("objj:")
        console.log(digiTalkContractObj)

        const digiTalkContract=digiTalkContractObj["digitalkContract"];
        console.log("Without signer:")
        console.log(digiTalkContract)

        const digitalkContractWithSigner=digiTalkContract.connect(digiTalkContractObj.signer)
        console.log("With signer:")
        console.log(digitalkContractWithSigner)

        return digitalkContractWithSigner;
    }

    // creating new post

    const createNewPost=async(hash,file_name)=>{

        try{
            if(ethereum)
            {

                const {description} = formData;
                
                const  digitalkContractWithSigner = await CreatAndConnectSigner();
    
                console.log(`Description: ${description}`)
                
                //call createPost method of contract and get transaction hash
    
                const transHash= await digitalkContractWithSigner.createPost(description,hash,file_name);
        
                console.log(transHash);
        
                setisLoading(true)
        
                console.log(`Loading - ${transHash.hash}`);
        
                await transHash.wait();
        
                setisLoading(false)
        
                console.log(`Success - ${transHash.hash}`);
    
                // call getPostsCount method of contract and get posts count
        
                const PostsCount=await digitalkContractWithSigner.getPostsCount();
    
                console.log(`Posts length: ${PostsCount}`)
        
                setpostCount(PostsCount.toNumber());

                window.location.reload();
            }
            else{
                console.log("No object found")
            }
        }
        catch(err){
            console.log(err);
           
        }

    }

    // Getting all posts

    const fetchAllPosts=async()=>{

        try{
            console.log("Inside fetch outside:"+ connectedAccounts)
            if(ethereum)
            {
                console.log("Inside FetchAll")
                
                // create contract instance
                const  digitalkContractWithSigner = await CreatAndConnectSigner();

                //    let  digitalkContract = createContract();
                    
                //    digitalkContract =digitalkContract['digitalkContract'] ;
        
                // get posts array by calling getAllPosts method of contract
              
    
               const getPostsArr=await digitalkContractWithSigner.getAllPosts();
               
                console.log("Get post Arr",getPostsArr)
               if(getPostsArr.length>=1)
               {

                   const structureArr=getPostsArr.map((post)=>({
                       id:post.id,
                       description:post.description,
                       hash:post.hash,
                       fileName:post.fileName,
                       auther:post.auther
        
                   }))
        
                   setpostsArr(structureArr);
        
                   console.log(structureArr);
                   setisLoading(false)
               }
    
            
            }
            else{
                console.log("No etherum object found!!")
            }


        }
        catch(err){

            console.log(err);

            alert("Please install metamask first!! No etherum object fetchAllPosts");

        }

    }

    const tipOwner=async(id)=>{
        try{
            if(ethereum)
            {
               const  digitalkContractWithSigner = await CreatAndConnectSigner();
    
                console.log(`Description: ${description}`)
                
                //call createPost method of contract and get transaction hash
    
                const transHash= await digitalkContractWithSigner.tipOwner(id);
        
                console.log(transHash);
        
                setisLoading(true)
        
                console.log(`Loading - ${transHash.hash}`);
        
                await transHash.wait();
        
                setisLoading(false)
        
                console.log(`Success - ${transHash.hash}`);
    
                // call getPostsCount method of contract and get posts count

                window.location.reload();
            }
            else{
                console.log("No object found")
            }
        }
        catch(err){
            console.log(err);
           
        }

    }

    useEffect(() => {
        checkIfEthereumExists();
        getPostsCount();

        
      }, [])

    return(
        <DigiTalkContext.Provider value={{formData
        ,setformData,
        postsArr,
        connectedAccounts,
        isLoading,
        postCount,
        checkIfEthereumExists,
        connectWallet,
        createNewPost,
        tipOwner,
        fetchAllPosts}}>
            {children}
        </DigiTalkContext.Provider>
    );

}

