import React, { useState } from 'react';
import { navigate } from 'hookrouter';
import {login} from '../services/authenticationService'


function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') || false
}

function onClickLogin(username, password, rememberMe, secretKey, setButtonDisabled) {
  setButtonDisabled(true)
  localStorage.setItem("key", secretKey)
  login({
    username, password, rememberMe
  }).then((res) => {
    localStorage.setItem("isLoggedIn", true)
    localStorage.setItem("jwt", res.data.jwt)
    navigate("/")
  }).catch((e) => {
    alert(e.data)
  }).finally(() => {
    setButtonDisabled(false)
  })
   
}

function validate(email, password, secretKey){
  if(!email){
    alert("Email is required")
  } else if(!password){
    alert("Password is required")
  } else if(!secretKey){
    alert("Secret key is required")
  } else if(!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
    alert("Invalid email format")
  }else {
    return true
  }
}

function LoginForm() {
  const [email, setEmail] = useState("dummy@speedoc.com");
  const [secretKey, setSecretKey] = useState("Mitrfd3Ev45e3tvzmOYeT7HdMe4jGEpN5rawgNGM");
  const [password, setPassword] = useState("1team@speedoc");
  const [rememberMe, setRememberMe] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  return <div id="login">
    <img class="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Speedoc Logo" />
    <br />
    Enter your email address
    <br />
    <input placeholder="Your email address" onChange={(e) => setEmail(e.target.value)} value={email} />
    <br />
    Enter your secret Speedoc key
    <br />
    <input placeholder="Your secret key" onChange={(e) => setSecretKey(e.target.value)} value={secretKey} />
    <br />
    Enter your password
    <br />
    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
    <br />
    <label class="container">Remember me
      <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} />
      <span class="checkmark"></span>
    </label>
    <button disabled={buttonDisabled} onClick={() => validate(email, password, secretKey) && onClickLogin(email, password, rememberMe, secretKey, setButtonDisabled)}>Login</button>
  </div>
}

export default function Login() {

  if (isLoggedIn()) {
    navigate("/");
    return null
  } else {
    return <LoginForm />
  }

}
