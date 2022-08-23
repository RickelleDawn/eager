import './LoginForm.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import eleoxLogo from './eleox-logo.png'
import autoFill from './autofill-icon.svg'
import axios from 'axios';




function LoginForm() {

  const apiUrl = "https://umbrage-interview-api.herokuapp.com"
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()


  const user = "interview@umbrage.com"
  const pw = "umbrageinterview"
  // for dev use only, used to autofill eleox login credentials 





//-------------------------------------------- LOGIN FUNCTIONALITY ------------------------------------------------


  const handleSubmit = (evt) => {
    evt.preventDefault(); // josh wrote --- evt.preventDefault();
    // prevents form from refreshing page on submit
    axios.post(`${apiUrl}/login`, {
      username: username,
      password: password,
      // axios sends a POST request to validate username and password 
    }).then((res) => {
      if ((res.data.access_token)) {
        localStorage.setItem("token", res.data.access_token)
        setLoggedIn(true)
        // if user and login are valid, stores token recieved in local storage and updates login status
      } else {
        console.log("Something went wrong")
      }
    })
  }

  useEffect(() => {
    if (loggedIn) {
      return navigate("/dashboard")
    }
  }, [loggedIn])
  // checks login success and keeps page from requesting data repeatedly, if login is successful reroute to dashboard





//-------------------------------------------- LOGIN DISPLAY ------------------------------------------------



  return (
    <div className='login-page'>

      <div className='login-box'>

        <img src={eleoxLogo} alt="Eleox Logo" />
        <img id='login-auto-fill'
          src={autoFill}
          alt="Auto"
          onClick={() => {
            setUsername(user)
            setPassword(pw)
          }}
        />
        {/* auto-fill image for dev use only, click to automatically fill out eleox login credentials */}

        <br></br>

        <form onSubmit={handleSubmit}>
          <input
            required
            id='login-user-input'
            type="textbox"
            placeholder="username"
            autoComplete='off'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}>
            {/* username input textbox, will update state as changed */}
          </input>


          <br></br>

          <input
            required
            id='login-pw-input'
            type="password"
            placeholder="password"
            autoComplete='off'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}>
            {/* password input textbox, will update state as changed */}
          </input>

          <br></br>

          <input id='submit-button'
            type="submit"
            value="login">
          </input>

          <br></br>

          <span className='acct-help'>
            <a href="" > Register an account</a>
            <a href="" > Forgot password?</a>
          </span>

          {/* Non-funtional, left for styling */}

        </form>

      </div>

    </div>
  )
}

export default LoginForm;