import React,{useState,useEffect} from 'react';

import {contractAbi,deployedContractAddress} from '../utils/constants';
import Cookie from "js-cookie"
import { BASE_URL } from '../utils/config';
import { ethers } from "ethers";
import { AccountSlice } from '../utils/AccountSlice';
import axios from 'axios';

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
        buffer:"",
        status:""
    });

    const [postsArr, setpostsArr] = useState([]);
    const [selfpostsArr, setselfpostsArr] = useState([]);
    const [connectedAccounts, setconnectedAccounts] = useState("");
    const [followersCount, setFollowersCount] = useState(0);
    const [isConnected, setisConnected] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [postCount, setpostCount] = useState(localStorage.getItem("postCount"))
    const [person, setPerson] = useState({});
    const [friendList, setFriendList] = useState([]);


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
                // console.log("Inside getPostsCount ")
                
                    //const  digitalkContractWithSigner = await CreatAndConnectSigner();
                    let  digitalkContract = await createContract();

                    digitalkContract=digitalkContract["digitalkContract"];

                    const PostsCount=await digitalkContract.getPostsCount();

                    // console.log("Post count:",PostsCount.toNumber());
                    
                    window.localStorage.setItem("postCount",PostsCount);

                    
        
                    setpostCount(PostsCount)

                    // console.log("first call:"+PostsCount)
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
            // console.log("Clicked connectWallet")
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

    const disconnectWallet=async()=>{

        // try{
        //     console.log("Clicked connectWallet")
        //     if(!ethereum){

        //         return alert("Please install metamask first!! No etherum object");
        //     }
    
        //     // will help to connect to metamask
        //     const accounts = await ethereum.request({ method: "wallet_disconnect", });
        //     console.log("Connected::::")
            
        //     setconnectedAccounts(accounts[0]);
        //     setisConnected(true)

        //     window.location.reload();

        // }
        // catch(err){
        //     console.log(err);
        //     alert("You haven't connected yet");
        // }

    }
    const updateuser=async(publicKey,id)=>{
        // setId(Cookie.get("user").userId);

        console.log("Inside context update------------")
        console.log(publicKey)
     
          try{
            const result=await fetch((`${BASE_URL}/users/${id}`),{
              method:"PATCH",
              headers:{
                "content-type":"application/json"
              },
              body:JSON.stringify({publicKey})
             })
             const res= await result.json();
             if(result.status==200)
             {
              console.log("Success");
              localStorage.setItem("key",publicKey)
             }
    
          }
          catch(err)
          {
            console.log(err)
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

    const createUserDB=async(hash,)=>{

    }
    const updateLikes=async()=>{
        
    }

    // creating new post

    const createNewPost=async(hash,file_name,_userId)=>{

        try{
            if(ethereum)
            {

                const {description,status} = formData;
                console.log("Description:"+description)
                console.log("status:"+status)
                
                const  digitalkContractWithSigner = await CreatAndConnectSigner();
    
                // console.log(`Description: ${description}`)
                
                //call createPost method of contract and get transaction hash
    
                const transHash= await digitalkContractWithSigner.createPost(description,status,hash,file_name,_userId);
        
                // console.log(transHash);
        
                setisLoading(true)
        
                console.log(`Loading - ${transHash.hash}`);
        
                await transHash.wait();
        
                setisLoading(false)
        
                console.log(`Success - ${transHash.hash}`);
    
                // call getPostsCount method of contract and get posts count
        
                const PostsCount=await digitalkContractWithSigner.getPostsCount();
    
                // console.log(`Posts length: ${PostsCount}`)
        
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
            // console.log("Inside fetch outside:"+ connectedAccounts)
            if(ethereum)
            {
                // console.log("Inside FetchAll")
                
                // create contract instance
                const  digitalkContractWithSigner = await CreatAndConnectSigner();

                //    let  digitalkContract = createContract();
                    
                //    digitalkContract =digitalkContract['digitalkContract'] ;
        
                // get posts array by calling getAllPosts method of contract
              
    
               const getPostsArr=await digitalkContractWithSigner.getAllPosts();
               
                // console.log("Get post Arr",getPostsArr)
               if(getPostsArr.length>=1)
               {

                   const structureArr=getPostsArr.map((post)=>({
                       id:post.id,
                       userId:post.userId,
                       tipAmount:post.tipAmount,
                       description:post.description,
                       hash:post.hash,
                       fileName:post.fileName,
                       status:post.status,
                       auther:post.auther
        
                   }))
        
                   setpostsArr(structureArr);
                console.log("Fetch all posts:")
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
    // ,auther,amount
    const tipOwner=async(id,auther)=>{
        try{
            if(ethereum)
            {
               const  digitalkContractWithSigner = await CreatAndConnectSigner();

               const parsedAmount=ethers.utils.parseEther("0.0001")
    
                // console.log(`Description: ${description}`)
                
                //call createPost method of contract and get transaction hash

                await ethereum.request({
                    method:"eth_sendTransaction",
                    params:[{
                        from:connectedAccounts,
                        to:auther,
                        gas:"0x5208",
                        value:parsedAmount._hex
                    }]
                })

                // console.log("Amount transfer----------------->"+parsedAmount)
                // console.log("Amount transfer----------------->"+parsedAmount._hex)
    
                const transHash= await digitalkContractWithSigner.tipOwner(id-1,parsedAmount);
        
                // console.log(transHash);
        
                setisLoading(true)
        
                console.log(`Loading Tip - ${transHash.hash}`);
        
                await transHash.wait();
        
                setisLoading(false)
        
                console.log(`Success Tip - ${transHash.hash}`);
    
                // call getPostsCount method of contract and get posts count
                const getPostsArr=await digitalkContractWithSigner.getAllPosts();
               
                // console.log("Get post Arr again-------------",getPostsArr)
               if(getPostsArr.length>=1)
               {

                   const structureArr=getPostsArr.map((post)=>({
                    id:post.id,
                    userId:post.userId,
                    tipAmount:post.tipAmount,
                    description:post.description,
                    hash:post.hash,
                    fileName:post.fileName,
                    status:post.status,
                    auther:post.auther
        
                   }))
        
                   setpostsArr(structureArr);
        
                //    console.log(structureArr);
                   setisLoading(false)
               }
                // window.location.reload();
            }
            else{
                console.log("No object found")
            }
        }
        catch(err){
            console.log(err);
           
        }

    }


    // fetch posts based on specific addesss 

    const fetchPostyAddess=async()=>{
        try{
            // console.log("Inside fetch by address:"+ connectedAccounts)
            if(ethereum)
            {
                // console.log("Inside FetchAll")
                
                // create contract instance
                const  digitalkContractWithSigner = await CreatAndConnectSigner();

                //    let  digitalkContract = createContract();
                    
                //    digitalkContract =digitalkContract['digitalkContract'] ;
        
                // get posts array by calling getAllPosts method of contract
              
    
               const getPostsArr=await digitalkContractWithSigner.getPostsByAddress(connectedAccounts);
               
                // console.log("Get post Array by address",getPostsArr)
               if(getPostsArr.length>=1)
               {

                   const structureArr=getPostsArr.map((post)=>({
                    id:post.id,
                       userId:post.userId,
                       tipAmount:post.tipAmount,
                       description:post.description,
                       hash:post.hash,
                       fileName:post.fileName,
                       status:post.status,
                       auther:post.auther
        
                   }))


                //    Add a filter method

                const filteredArr=structureArr.filter((post)=>{
                    return post.hash!="" && post.description!="";
                })
                console.log("Fetch all posts:")
                   setselfpostsArr(filteredArr);
        
                   console.log(filteredArr);
                   setisLoading(false)
               }
    
            
            }
            else{
                console.log("No etherum object found!!")
            }


        }
        catch(err){

            console.log(err);

            alert("Please install metamask first!! No etherum object fetchbyaddress");

        }

    }




    const fetchData=async(id)=>{
        // console.log("Id:"+id)
        // id=JSON.stringify(id);
        // console.log("id is___>"+id)
        try{

            const response = await fetch(`${BASE_URL}/users/${id}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                }
              });
              const result = await response.json();
            //   console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            //   console.log(result)
            //   console.log(result)
              setPerson(result)
        }
        catch(err)
        {
            console.log(err)
        }
    
    }


    const fetchFriends=async(id)=>{
        // id=JSON.stringify(id);
        // console.log("Inside Fetch friends--------------------->")
      try {
        const response = await fetch(`${BASE_URL}/users/friends/${id}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
            }
        });
        const result = await response.json();
   
        setFriendList(result);
      } catch (error) {
        console.error(error);
      }
    }


    const fetchFriendsCount=async(id)=>{
        // console.log("Inside Fetch friends--------------------->")
        // id=JSON.stringify(id);
      try {
        const res = await fetch(`${BASE_URL}/users/friendCount/${id}`,{
            method:"GET",
            headers:{
              "content-type":"applicaion/json"
            }
          }); 
          const result = await res.json();
          if(res.status!=404)
          {
            setFollowersCount(result.count);
          }
         
      } catch (error) {
       console.log(err)
      }
    }




    useEffect(() => {
        checkIfEthereumExists();
        getPostsCount();
        
        
      }, [])

      useEffect(() => {
        if(localStorage.getItem("user"))
        {
            const id =JSON.parse(localStorage.getItem("user")).id
            updateuser(connectedAccounts,id)
            fetchData(id)
        }
      
      }, [connectedAccounts])
      

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
        fetchAllPosts,
        updateuser,
        fetchData,
        fetchPostyAddess,
        selfpostsArr,
        fetchFriends,
        person,
        friendList,
        // createUserDB
        fetchFriendsCount,
        followersCount}}>
            {children}
        </DigiTalkContext.Provider>
    );

}

