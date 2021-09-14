import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { globalStyles } from "../globalStyles";
import "./Registration.css";
import "../index.css";
import DatePicker from "./DatePicker";
import { getFromStorage, saveToStorage } from '../HelperClasses/StorageHandler';
import { loginRequest } from "../BackendRequests/Authentication";
import ReactJsAlert from "reactjs-alert";
import ImagePicker from "../HelperClasses/ImagePicker";

function Registration({ setUser }) {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [sexuality, setSexuality] = useState();
  const [location,setLocation] = useState();
  const [interest1,setInterest1] = useState();
  const [interest2,setInterest2] = useState();
  const [interest3,setInterest3] = useState();
  const [interest4,setInterest4] = useState();
  const [interest5,setInterest5] = useState();
  
  const [alerts, setAlerts] = useState({
    type: "error",
    status: false,
    title: "",
  })
  
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
          setInterest1(interestsStrings[0])
          setInterest2(interestsStrings[1])
          setInterest3(interestsStrings[2])
          setInterest4(interestsStrings[3])
          setInterest5(interestsStrings[4])
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
      console.log(interest1);
      if( userAge>=18){
        setAgeError(" ")
       
        if(password === confirm ){
        if (password && confirm && username &&  name) {
          
          
          const result = await fetch(
            "https://lamp.ms.wits.ac.za/home/s1851427/webb.php?" +
              `username=${username}&password=${password}&name=${name}&gender=${gender}&birthday=${userBirthday}&sexuality=${sexuality}&location=${"braam"}&profile_picture=${getFromStorage('image_url')}`
          ).then(async (res) =>{
            const temp = await res.json()
            console.log(temp)
            if(temp === "error"){
              setAlerts({
                type: "error",
                status: true,
                title: "This user already exists",
              })
              return
            }
            // send interests to database
           
            const resp = await loginRequest({email: username, password: password});
            const inr = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAInterest.php?"+ `username=${username}&interest_1=${interest1}&interest_2=${interest2}&interest_3=${interest3}&interest_4=${interest4}&interest_5=${interest5}`)
            if (resp.message === "success") {
              console.log("line 105 register");
              const objArray = [];
              Object.keys(resp).forEach(key => objArray.push({
                  name: key,
                  rating: resp[key]
              }));
              const loggedInUser = [objArray[0].rating[0]];
              // login logistics
              saveToStorage('user', loggedInUser);
              setUser(loggedInUser);
              history.push("/feed");
            }
          });

        } }
  
        else {
          setAlerts({
            type: "error",
            status: true,
            title: "Please make sure your passwords match",
          })
        }


      }
      else {
        //display less than  18
        setAlerts({
          type: "error",
          status: true,
          title: "You should be 18 or above",
        })
      }
       
    } catch (error) {}
  };

  return (
    <div className = "container">
        <ReactJsAlert
      status={alerts.status}   // true or false
    type={alerts.type}   // success, warning, error, info
    title={alerts.title}   // title you want to display
    color ="blue"
    Close={() => setAlerts({
      type: "error",
      status: false,
      
      title: "",
      
    }
  
    )}   // callback method for hide
/>
       <div className='header'>
                <h3 className='appName'>find loverz</h3>
             </div>
      <div className="registration">
      <form className="form" onSubmit={registerUser}>
      <h1>Register</h1>
      <br />
      <hr width="100px;"  size="8"></hr>
        <div className="form-element">
          <ImagePicker />
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
        <br />
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
