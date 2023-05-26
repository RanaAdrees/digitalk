import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import logo from "../../public/Images/logo.png";
const login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    console.log("details are----------")
    console.log(credentials.email)
    console.log(credentials.password)
    console.log("details are----------")
    console.log(credentials)
    console.log(JSON.stringify(credentials))


    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if(result)
      {
        console.log(result)
      }
      if (!res.ok) alert(result.message);
      console.log(result.data);

      if(res.ok)
      {

        navigate("/");
      }
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div>
        <form className="form form-login" id="form-login"  onSubmit={handleClick}>
            <img className="mb-4" src={logo} alt="" width="250" height="100"/>
            <h1 className="h3 mb-3 font-weight-normal">Login to DigiTalk!</h1>

            <input type="text" name="email" id="inputEmail" className="form-control middle" 
            onChange={handleChange} placeholder="email" value={credentials.email} required/>

            <input type="password" name="password" id="inputPassword" 
            onChange={handleChange} className="form-control bottom" value={credentials.password} placeholder="password" required/>
            <button className="btn btn-lg btn-primary btn-block my-4" id="inputDob">Login!</button>
            <a href="/register">Don't have an Account?</a>
        </form>
    </div>
  )
}

export default login