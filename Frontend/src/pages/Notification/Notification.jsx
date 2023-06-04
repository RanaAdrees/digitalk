import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { BASE_URL } from "../../utils/config";

const Notification = ({ userId }) => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests for the current user from the backend API
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/friendRequests/${userId}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
            }
        });
        const data = await response.json();
        setFriendRequests(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

//   const res = await fetch(`${BASE_URL}/users/getSingleUser`, {
//     method: "post",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(email),
//   });

  const handleAcceptRequest = async (friend) => {
    try {
      const response = await fetch(`${BASE_URL}/users/acceptFriendRequest/`, {
        method:"post",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({userId,
            friendId: friend._id})
        
      });

      if (response.data.status === 200) {
        window.alert('Friend request accepted successfully');
        setFriendRequests((prevRequests) => prevRequests.filter((item) => item._id !== friend._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDenyRequest = async (friend) => {
    try {
      const response = await fetch(`${BASE_URL}/users/cancelFriendRequest/`, {

        method:"post",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({_id: userId,
            personId: friend._id})
        
      });

      if (response.data.status === 200) {
        window.alert('Friend request declined successfully');
        setFriendRequests((prevRequests) => prevRequests.filter((item) => item._id !== friend._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3 className="mt-3">Friend Requests</h3>
      {friendRequests.length === 0 ? (
        <p>No pending friend requests</p>
      ) : (
        <ul className="list-group mt-3">
          {friendRequests.map((item, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              <div>
                Friend Request from: <span className='mx-4' style={{ fontWeight: "bold" }}> {item.name} </span><span>{item.publicKey}</span>
              </div>
              <div>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDenyRequest(item)}
                >
                  Decline
                </button>
                <button
                  className="btn btn-primary mx-3"
                  onClick={() => handleAcceptRequest(item)}
                >
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
