import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";

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
    <div className="registration">
      <h1>Register</h1>
      <form className="form" onSubmit={registerUser}>
        <div className="form-element">
          <label htmlFor="username"> Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label htmlFor="password"> Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label htmlFor="confirmPassword"> Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label htmlFor="name"> Name</label>
          <input id="name" onChange={(e) => setName(e.target.value)}></input>
        </div>

        <div className="form-element">
          <label htmlFor="gender"> Gender</label>
          <select id="gender" onChange={(e) => setGender(e.target.value)}>
            <option>Select an Option</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-element">
          <label htmlFor="birthday"> Birthday</label>
          <input
            id="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          ></input>
        </div>

        <div className="form-element">
          <label htmlFor="sexuality"> Sexuality</label>
          <select id="sexuality" onChange={(e) => setSexuality(e.target.value)}>
            <option>Select an Option</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-element">
          <label htmlFor="location"> Location</label>
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>

        <input id="register-button" type="submit" value="Register" />
      </form>
    </div>
  );
}
// link =https://lamp.ms.wits.ac.za/home/s1851427/webb.php?username=br4&password=brbr&name=vhugala&gender=male&birthday=2000-02-20&sexuality=female&location=braam
export default Registration;