import React, { useEffect, useState,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
// import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import profilePhoto from "/public/Images/profile-img3.png";
import { DigiTalkContext } from "../../context/DigitalkContext";

export default function Profile() {
  const {person,friendList,fetchFriends,fetchData,fetchFriendsCount,followersCount} =useContext(DigiTalkContext)
  const [copied, setCopied] = useState(false);
  // const [person, setPerson] = useState({});
  const [loggedInUser, setloggedInUser] = useState("")
  const [selectedPerson, setSelectedPerson] = useState(loggedInUser);
 // Added friend count state

  const count = 6;

  useEffect(() => {
    console.log("Selected__________profile>"+selectedPerson)
    console.log()
    // const id=JSON.parse(localStorage.getItem("user")).id;
    
    setloggedInUser(JSON.parse(localStorage.getItem("user")).id)
    console.log("Loggedin use profile"+loggedInUser)
    setSelectedPerson(JSON.parse(localStorage.getItem("user")).id)
    console.log("selected use profile"+selectedPerson)


    if(loggedInUser&& selectedPerson)
    {
      
      fetchData(selectedPerson); 
     fetchFriendsCount(selectedPerson);
     console.log("Profile person:"+person.token)
     
    }

  }, [selectedPerson])
  

  // useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch(`${BASE_URL}/users/${props.selectedPerson}`,{
    //     method:"GET",
    //     headers:{
    //       "content-type":"applicaion/json"
    //     }
    //   });
    //   setPerson(response.data)
    // }
    

   
    
  // }, [selectedPerson]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(`${BASE_URL}/users/friendCount/${props.selectedPerson}`,{
  //       method:"GET",
  //       headers:{
  //         "content-type":"applicaion/json"
  //       }
  //     }); 
  //     setFollowersCount(res.data.count);
  //   }
  //   fetchData();
  // }, [props.selectedPerson]);

  // useEffect(async () => {
  // const response = await axios.get(`${BASE_URL}/users/friendCount/${props.selectedPerson}`);
  // setFollowersCount(response.data.count);
  // }, [person]);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(person.publicKey);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else { // fallback for older browsers or mobiles
      const textarea = document.createElement('textarea');
      textarea.value = person.publicKey;
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="card p-3 profile-container">
      <img
        src={profilePhoto}
        // src={person.image}
        style={{ borderRadius: '50%' }}
        className="card-img-top profile-image img-fluid small-profile mx-auto"
        alt="..."
      />
      <div className="card-body">
        <h3 className="card-title my-2">{person.username}</h3>
        <div className="d-flex align-items-center">
          <h5 className="text-secondary mb-0">
            {/* {person.publicKey.length} */}
            {typeof person.publicKey === 'string' ? person.publicKey.length <= count ? person.publicKey : 
            person.publicKey.slice(0, count) +  "..." : ""}
          </h5>
          <button
            className="btn btn-link text-dark p-0 ms-2"
            data-toggle="tooltip"
            title='Copy'
            onClick={copyToClipboard}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {copied && (
            <span className="text-success ms-2">Copied to clipboard</span>
          )}
        </div>
        <hr className="divider" />
        <h5 className="card-subtitle">{person.username}</h5>
        <hr className="divider" />
        <div />
        <div />
        <div className='profile-stats'>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Posts:</strong> {person.postCount ? person.Count : "0"}
            </li>
            <li className="list-group-item">
              <strong>Earned:</strong> {person.money ? person.Money : "0"}
            </li>
            <li className="list-group-item">
              <strong>Followers:</strong> {followersCount ? followersCount : "0"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
