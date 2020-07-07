import React, { useState } from "react";
import { navigate } from 'hookrouter';
import { search } from '../services/userService'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') || false
}

function onClickSearch(term, onUserFound, setButtonDisabled) {
  setButtonDisabled(true)
  search(term).then((res) => {
    let user = res.data.users[0]
    let newUser = {
      fullname: "",
      email: "",
      gender: "",
      birthdate: "",
      ext: "",
      phone: ""
    }
    if (user) {
      newUser.email = user.email.address
      newUser.fullname = user.profile.name
      newUser.gender = user.profile.gender
      newUser.birthdate = user.profile.birthdate
      newUser.ext = user.profile.phone.extension
      newUser.phone = user.profile.phone.number
    }
    onUserFound(newUser)
  })
  .catch((e) => {
    alert(e.data)
  })
  .finally(() => {
    setButtonDisabled(false)
  })
}

function Search(props) {
  const [search, setSearch] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false)
  return <div id="search">
    SEARCH EXISTING USER
    <br />
    <div id="search-form">
      <input placeholder="Email or Phone or Full Name" onChange={(e) => setSearch(e.target.value)} value={search} />
      <button disabled={buttonDisabled} onClick={() => onClickSearch(search, props.onUserFound, setButtonDisabled)}>Search</button>
    </div>
    <br />
  </div>
}

function UserForm(props) {

  return <div id="user-form">
    USER
    <br />
    <input placeholder="Full Name" onChange={(e) => props.setUser({ ...props.user, fullname: e.target.value })} value={props.user.fullname} />
    <br />
    <input placeholder="Email Address" onChange={(e) => props.setUser({ ...props.user, email: e.target.value })} value={props.user.email} />
    <br />
    <div id="birthdate-gender">
      <div id="birthdate" ><DatePicker placeholder="Birthdate" onChange={(birthdate) => props.setUser({ ...props.user, birthdate })} selected={props.user.birthdate ? new Date(props.user.birthdate) : null} /></div>
      <br />
      <select id="gender" placeholder="Gender" onChange={(e) => props.setUser({ ...props.user, gender: e.target.value })} value={props.user.gender} >
        <option value="" disabled selected>Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
    </div>
    <div id="ext-phone">
      <input id="ext" placeholder="+65" onChange={(e) => props.setUser({ ...props.user, ext: e.target.value })} value={props.user.ext} />
      <br />
      <input id="phone" placeholder="Phone number" onChange={(e) => props.setUser({ ...props.user, phone: e.target.value })} value={props.user.phone} />
    </div>
  </div>
}

export default function Home() {
  const [user, setUser] = useState({})
  if (!isLoggedIn()) {
    navigate("/login");
    return null
  } else {
    return <div id="home">
      <Search onUserFound={(newUser) => setUser(newUser)} />
      <UserForm user={user} setUser={setUser} />
    </div>
  }

}
