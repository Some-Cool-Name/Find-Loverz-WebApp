import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { globalStyles } from "../globalStyles";
import "./Registration.css";

function Registration() {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();
  const [sexuality, setSexuality] = useState();
  const [location, setLocation] = useState();
 
  const registerUser = async (e) => {
    try {
      e.preventDefault();
      if (password && confirm && username && password === confirm && name) {
        console.log("equal");
        const result = await fetch(
          "https://lamp.ms.wits.ac.za/home/s1851427/webb.php?" +
            `username=${username}&password=${password}&name=${name}&gender=${gender}&birthday=${"2000-02-20"}&sexuality=${sexuality}&location=${"braam"}`
        ).then((res) => res.json());
        console.log(result);
        if (result === "success") {
          history.push("/feed");
        } else {
          //this user already exists
        }
      } else {
        // display appropriate error
      }
    } catch (error) {}
  };

  return (
    <div className = "container">
       <div className='header'>
                <h3 className='appName'>find loverz</h3>
             </div>
      <div className="registration">
      <form className="form" onSubmit={registerUser}>
      <h1>Register</h1>
      <hr width="100px;"  size="8"></hr>
        <div className="form-element">
          <label className = "fieldDescription" htmlFor="username"> Username</label>
          <input
          className = 'inputBox'
            id="username"
            required
            type ="text"
            placeholder = "Username..."
            style = {globalStyles.inputStyle}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="password"> Password</label>
          <input
          className = 'inputBox'
            id="password"
            required
            type="password"
            placeholder = "Password..."
            style = {globalStyles.inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="confirmPassword"> Confirm password</label>
          <input
          className = 'inputBox'
            id="confirmPassword"
            required
            placeholder = "Confirm Password"
            style = {globalStyles.inputStyle}
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="name"> Name</label>
          <input className = 'inputBox' 
          id="name" 
          required
          type = "text"
          placeholder ="Name"
          style = {globalStyles.inputStyle}
          onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="gender"> Gender</label>
          <select id="gender" onChange={(e) => setGender(e.target.value)}>
            <option>Select an Option</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="birthday"> Birthday</label>
          <input
          className = 'inputBox'
            id="birthday"
            required
            type = "text"
            placeholder = "Birthday"
            style = {globalStyles.inputStyle}
            onChange={(e) => setBirthday(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="sexuality"> Sexuality</label>
          <select id="sexuality" onChange={(e) => setSexuality(e.target.value)}>
            <option>Select an Option</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-element">
          <label className = "fieldDescription" htmlFor="location"> Location</label>
          <input
          className = 'inputBox'
            id="location"
            required
            type = "text"
            placeholder = "Location"
            style = {globalStyles.inputStyle}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>

        <input className = "button" id="register-button" style = {globalStyles.button} type="submit" value="Register" />
      </form>
    </div> 
    </div>
    
  );
}
// link =https://lamp.ms.wits.ac.za/home/s1851427/webb.php?username=br4&password=brbr&name=vhugala&gender=male&birthday=2000-02-20&sexuality=female&location=braam
export default Registration;