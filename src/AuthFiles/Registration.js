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

  var listen = true;
  var interestsArray = [];
  var interestsStrings = [];

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
// link =https://lamp.ms.wits.ac.za/home/s1851427/webb.php?username=br4&password=brbr&name=vhugala&gender=male&birthday=2000-02-20&sexuality=female&location=braam

export default Registration;
