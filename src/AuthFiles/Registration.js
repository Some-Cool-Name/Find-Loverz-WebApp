import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { globalStyles } from "../globalStyles";
import "./Registration.css";
import "../index.css";
import DatePicker from "./DatePicker";
import { saveToStorage } from '../HelperClasses/StorageHandler';
import isLoggedIn from '../HelperClasses/LoginChecker';

function Registration() {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [sexuality, setSexuality] = useState();
  const [birthday,setBirthday] = useState();
  const [location,setLocation] = useState();
  
  const [date, setDate] = useState();
  const [ageError,setAgeError] = useState("");
  var listen = true;
  var interestsArray = [];
  var interestsStrings = [];
  function getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
    //age
    
}

  function interestsDisplay() {
    document.getElementById("interests-background").style.display = "block";
    var clickedId;

    if (listen){
      document.querySelectorAll('.interest-element').forEach(item => {
        item.addEventListener('click', event => {
          clickedId = event.target.id;
 
          // If element is already highlighted, remove element
          if (interestsArray.includes(clickedId)){
            document.getElementById(clickedId).style.color = "#000";
            document.getElementById(clickedId).style.background = "#ddd";

            var removeIndex = interestsArray.indexOf(clickedId);
            interestsArray.splice(removeIndex, 1);
            interestsStrings.splice(removeIndex, 1);
          }

          // Add element to list if list < 5
          else if (interestsArray.length < 5){
            interestsArray.push(clickedId);
            interestsStrings.push(document.getElementById(clickedId).textContent);
            document.getElementById(clickedId).style.color = "#fff";
            document.getElementById(clickedId).style.background = "#000";
          }
          
          console.log(interestsArray);
          console.log(interestsStrings);
        })
      });

      listen = false;
    }
  }

  function interestsClose() {
    document.getElementById("interests-background").style.display = "none";
  }
  function getDateString(Date){
    
    let dated=Date.getDate() + "-"+ parseInt(Date.getMonth()+1) +"-"+Date.getFullYear();
    return dated;
    
  }

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const userAge = getAge(date);
      
      console.log(userAge);
      const userBirthday = getDateString(date);
      console.log(userBirthday);
      if( userAge>=18){
        setAgeError(" ")
        
        if (password && confirm && username && password === confirm && name) {
          console.log("equal");
          const result = await fetch(
            "https://lamp.ms.wits.ac.za/home/s1851427/webb.php?" +
              `username=${username}&password=${password}&name=${name}&gender=${gender}&birthday=${userBirthday}&sexuality=${sexuality}&location=${"braam"}`
          ).then((res) => res.json());
          console.log(result);
          if (result === "success") {

            //const details = [username, password,name]
             // extract user info from result
             const objArray = [];
             Object.keys(result).forEach(key => objArray.push({
                 name: key,
                 rating: result[key]
             }));
             const loggedInUser = [objArray[0].rating[0]];
             // login logistics
             saveToStorage('details', loggedInUser);
            // setUser(loggedInUser);

            history.push("/feed");
          } else {
            //this user already exists
          }
        } 
  
        else {
          // display to the user what needs to be filled
        }


      }
      else {
        //display less than  18
        setAgeError("You have to be 18 years or older")
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
          
        
          <DatePicker id="birthday" date={date} setDate={setDate}></DatePicker>
        </div>
        <div className= "form-element">{ageError}</div>

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
          
          <label className= 'intrestDescription' htmlFor="interests"> Interests</label>
          <button className='intrestbutton' onClick={interestsDisplay} id="interests-button">
            Choose Interests
          </button>
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
        <div className = "form-element">
        <input className = "button" id="register-button" type="submit" value="Register" />
        </div>
      
      </form>
    </div>

      <div id="interests-background">
        <div id="interests-interface">
          <h1>Choose Five Interests</h1>

          <div className="interests-container">
            <div className="interest-element" id="i1">
              Art
            </div>
            <div className="interest-element" id="i2">
              Baking
            </div>
            <div className="interest-element" id="i3">
              Board Games
            </div>
            <div className="interest-element" id="i4">
              Comedy
            </div>
            <div className="interest-element" id="i5">
              Cooking
            </div>
            <div className="interest-element" id="i6">
              Cycling
            </div>
            <div className="interest-element" id="i7">
              Dancing
            </div>
            <div className="interest-element" id="i8">
              Fashion
            </div>
            <div className="interest-element" id="i9">
              Fishing
            </div>
            <div className="interest-element" id="i10">
              Foodie
            </div>
            <div className="interest-element" id="i11">
              Football
            </div>
            <div className="interest-element" id="i12">
              Gamer
            </div>
            <div className="interest-element" id="i13">
              Gardening
            </div>
            <div className="interest-element" id="i14">
              Golf
            </div>
            <div className="interest-element" id="i15">
              Gym
            </div>
            <div className="interest-element" id="i16">
              Hiking
            </div>
            <div className="interest-element" id="i17">
              Karaoke
            </div>
            <div className="interest-element" id="i18">
              Movies
            </div>
            <div className="interest-element" id="i19">
              Music
            </div>
            <div className="interest-element" id="i20">
              Netflix
            </div>
            <div className="interest-element" id="i21">
              Pet Lover
            </div>
            <div className="interest-element" id="i22">
              Photography
            </div>
            <div className="interest-element" id="i23">
              Picnicking
            </div>
            <div className="interest-element" id="i24">
              Politics
            </div>
            <div className="interest-element" id="i25">
              Reading
            </div>
            <div className="interest-element" id="i26">
              Shopping
            </div>
            <div className="interest-element" id="i27">
              Spirituality
            </div>
            <div className="interest-element" id="i28">
              Social Media
            </div>
            <div className="interest-element" id="i29">
              Sport
            </div>
            <div className="interest-element" id="i30">
              Surfing
            </div>
            <div className="interest-element" id="i31">
              Swimming
            </div>
            <div className="interest-element" id="i32">
              Travel
            </div>
            <div className="interest-element" id="i33">
              Vlogging
            </div>
            <div className="interest-element" id="i34">
              Wine
            </div>
            <div className="interest-element" id="i35">
              Writing
            </div>
            <div className="interest-element" id="i36">
              Yoga
            </div>
          </div>

          <button onClick={interestsClose} id="interests-close">
            Close
          </button>

        </div>
      </div>
    </div>
    
  );

}

export default Registration;
