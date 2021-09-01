import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";
import DatePicker from "./DatePicker";

function Registration() {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [sexuality, setSexuality] = useState();
  
  const [date, setDate] = useState();
  const [ageError,setAgeError] = useState("");

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
  }

  function interestsClose() {
    document.getElementById("interests-background").style.display = "none";
  }

  function interestsConfirm() {
    document.getElementById("interests-background").style.display = "none";
  }

  function interestClick() {
    //var element = document.getElementById("myDIV");
    //element.classList.toggle("mystyle");
    console.log('"hello');
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
            history.push("/feed");
          } else {
            //this user already exists
          }
        } 
  
        else {
          // display appropriate error
        }


      }
      else {
        //display less than  18
        setAgeError("You have to be 18 years or older")
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
          <DatePicker id="birthday" date={date} setDate={setDate}></DatePicker>
        </div>
        <div className= "form-element">{ageError}</div>

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
          <label htmlFor="interests"> Interests</label>
          <button onClick={interestsDisplay} id="interests-button">
            Choose Interests
          </button>
        </div>

        <div className="form-element">
          <label htmlFor="location"> Location</label>
          <input
            id="location"
          ></input>
        </div>

        <input id="register-button" type="submit" value="Register" />
        
      </form>

      <div id="interests-background">
        <div id="interests-interface">
          <h1>Choose Five Interests</h1>

          <div className="interests-container">
            <div onClick={interestClick} className="interest-element" id="i1">
              Art
            </div>
            <div onClick={interestClick} className="interest-element" id="i2">
              Baking
            </div>
            <div onClick={interestClick} className="interest-element" id="i3">
              Board Games
            </div>
            <div onClick={interestClick} className="interest-element" id="i4">
              Comedy
            </div>
            <div onClick={interestClick} className="interest-element" id="i5">
              Cooking
            </div>
            <div onClick={interestClick} className="interest-element" id="i6">
              Cycling
            </div>
            <div onClick={interestClick} className="interest-element" id="i7">
              Dancing
            </div>
            <div onClick={interestClick} className="interest-element" id="i8">
              Fashion
            </div>
            <div onClick={interestClick} className="interest-element" id="i9">
              Fishing
            </div>
            <div onClick={interestClick} className="interest-element" id="i10">
              Foodie
            </div>
            <div onClick={interestClick} className="interest-element" id="i11">
              Football
            </div>
            <div onClick={interestClick} className="interest-element" id="i12">
              Gamer
            </div>
            <div onClick={interestClick} className="interest-element" id="i13">
              Gardening
            </div>
            <div onClick={interestClick} className="interest-element" id="i14">
              Golf
            </div>
            <div onClick={interestClick} className="interest-element" id="i15">
              Gym
            </div>
            <div onClick={interestClick} className="interest-element" id="i16">
              Hiking
            </div>
            <div onClick={interestClick} className="interest-element" id="i17">
              Karaoke
            </div>
            <div onClick={interestClick} className="interest-element" id="i18">
              Movies
            </div>
            <div onClick={interestClick} className="interest-element" id="i19">
              Music
            </div>
            <div onClick={interestClick} className="interest-element" id="i20">
              Netflix
            </div>
            <div onClick={interestClick} className="interest-element" id="i21">
              Pet Lover
            </div>
            <div onClick={interestClick} className="interest-element" id="i22">
              Photography
            </div>
            <div onClick={interestClick} className="interest-element" id="i23">
              Picnicking
            </div>
            <div onClick={interestClick} className="interest-element" id="i24">
              Politics
            </div>
            <div onClick={interestClick} className="interest-element" id="i25">
              Reading
            </div>
            <div onClick={interestClick} className="interest-element" id="i26">
              Shopping
            </div>
            <div onClick={interestClick} className="interest-element" id="i27">
              Spirituality
            </div>
            <div onClick={interestClick} className="interest-element" id="i28">
              Social Media
            </div>
            <div onClick={interestClick} className="interest-element" id="i29">
              Sport
            </div>
            <div onClick={interestClick} className="interest-element" id="i30">
              Surfing
            </div>
            <div onClick={interestClick} className="interest-element" id="i31">
              Swimming
            </div>
            <div onClick={interestClick} className="interest-element" id="i32">
              Travel
            </div>
            <div onClick={interestClick} className="interest-element" id="i33">
              Vlogging
            </div>
            <div onClick={interestClick} className="interest-element" id="i34">
              Wine
            </div>
            <div onClick={interestClick} className="interest-element" id="i35">
              Writing
            </div>
            <div onClick={interestClick} className="interest-element" id="i36">
              Yoga
            </div>
          </div>

          <div id="interests-button-container">
            <button onClick={interestsClose} id="interests-cancel">
              Cancel
            </button>
            <button onClick={interestsConfirm} id="interests-confirm">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// link =https://lamp.ms.wits.ac.za/home/s1851427/webb.php?username=br4&password=brbr&name=vhugala&gender=male&birthday=2000-02-20&sexuality=female&location=braam

export default Registration;
