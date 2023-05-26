import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import logo from "../../public/Images/logo.png";

const signup = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    dateOfBirth:undefined
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if(result.status==="OK")
      {
        const URL=result.redirectUrl;
        console.log(URL)
        localStorage.setItem("email",credentials.email);
        
        navigate(URL)
      }

      if (!res.ok) alert(result.message);

     
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <div>
        <form className="form form-signup" id="form-signup" onSubmit={handleClick}>
            <img className="mb-4" src={logo} alt="" width="250" height="100"/>
            <h1 className="h3 mb-3">Register to DigiTalk!</h1>
            <input type="text"  name="username" id="inputUsername" onChange={handleChange} value={credentials.username} className="form-control top" placeholder="username" required autofocus/>
            <input type="text" name="email" id="inputEmail" onChange={handleChange} value={credentials.email} className="form-control middle" placeholder="email" required/>
            <input type="password" name="password" id="inputPassword" onChange={handleChange} value={credentials.password} className="form-control bottom" placeholder="password" required/>
            <label for="inputDob">Date of Birth?</label>
            <input type="date" name="dateOfBirth"  id="inputDob" onChange={handleChange} value={credentials.dateOfBirth} className="form-control bottom" placeholder="Date of Birth" required/>
            <button className="btn btn-lg btn-primary btn-block" >Register!</button>
            <Link to="/login">Already have an Account? Login Here!</Link>
        </form>
    </div>
  );
}

export default signup