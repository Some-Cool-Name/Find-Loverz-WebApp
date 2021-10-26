import {Link, useHistory } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { Formik } from 'formik';
import React, { useState,useEffect } from "react";
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import { getFromStorage, saveToStorage } from '../HelperClasses/StorageHandler';


import axios from 'axios';

const EditProfile = ({ setUser, user }) => {
    //current user's name
    // This whole view functionality is using the prop user, if details are changed , update the variable by using setUser
    
    //you can use the states below inorder to send requests to update the profile
    const [name,setName]=useState('');
    const [bio,setBio]=useState('');
    const [location,setLocation]=useState('');
    const [file, setFile] = useState(null);
    const cloudinary = 'https://api.cloudinary.com/v1_1/dkctv74ue/image/upload';


    const [interest1,setInterest1] = useState('');
    const [interest2,setInterest2] = useState('');
    const [interest3,setInterest3] = useState('');
    const [interest4,setInterest4] = useState('');
    const [interest5,setInterest5] = useState('');
    var listen = true;
    var interestsArray = [];
    var interestsStrings = [];

    let history = useHistory();
    let curr = null;
   
    const [interest,setInterest]= useState({length:0});
    const fetchInterest = async (e) =>{
      console.log(user)
      console.log("user")
      try{
        const result = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAGetInterest.php?"+`username=${curr[0].username}`

        )
        

        const data = await result.json();
        setInterest(data.Interest[0]);
      
      }
      catch(e){
          console.log(e)
          

      }
      
      
      }
    
    useEffect(()=>{
        //get Interest  function
        fetchInterest();
        },[])
  
    
    if(user){
        try{
            curr = user;
            console.log(curr)
        }
        catch(e){
            console.log(e)
        }
    }
    

    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

      //  Generate colour between range
  const randomBetween = (a, b) => {
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const randomColor = (firstColor, secondColor) => {
    var first = firstColor.toUpperCase().substring(1, secondColor.length);
    var second = secondColor.toUpperCase().substring(1, firstColor.length);
    const scale = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < first.length && i < second.length; i++ ){
       const random = randomBetween(scale.indexOf(first[i]),
       scale.indexOf(second[i]));
       color += scale[random];
    };
    return color;
  };

    function interestsDisplay() {
        document.getElementById("interests-background").style.display = "block";
        var clickedId;
    
        if (listen){
          document.querySelectorAll('.interest-element').forEach(item => {
            item.addEventListener('click', event => {
              clickedId = event.target.id;
              var colour = randomColor('#c471ed' , '#12c2e9');
     
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
                document.getElementById(clickedId).style.background = colour;
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

      const handleImage = async (images,e) => {
        for (let image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "gbu8evn2");
    
            const resp = await fetch(cloudinary, {
                body: formData,
                method: 'POST'
            })
            await resp.json().then((respJSON) => {
                saveToStorage('image_url', respJSON.secure_url);
            });
        }
      }
      

    const handleUpdate = async (images) => {

      if(images){
        await handleImage(images)
        const te = getFromStorage('image_url')
        console.log(getFromStorage('image_url'))
        
        if(te != null && curr[0].username){

          axios({
            method : 'put',
            url : 'https://lamp.ms.wits.ac.za/home/s1851427/WDAUpPicture.php',
            params : {
              username : curr[0].username,
              profile_picture : te
            }
            })
            .then( function (response){
              console.log(response);
              alert('successful')
            } )
            .catch(function (error) {
            console.log(error);
            updateStatus = 'update successful'
            });
  
            curr[0].profile_picture = te;

          
        }

        
      }

         

        let updateStatus = 'nothing to update';

        if( curr[0].username && name.trim() !=''){
             await axios({
                method : 'post',
                url : 'https://lamp.ms.wits.ac.za/home/s1851427/WDAUpName.php',
                params : {
                  username : curr[0].username,
                  name : name
                }
                })
                .then( function (response){
                  console.log(response);
                  //alert('successful')
                } )
                .catch(function (error) {
                console.log(error);
                updateStatus = 'update successful'
                });
                curr[0].name = name;
                
        }
        if( curr[0].username && bio.trim() !='' ) 
        {
                //bio
                axios({
                    method : 'post',
                    url : 'https://lamp.ms.wits.ac.za/home/s1851427/WDAUpBio.php',
                    params : {
                      username : curr[0].username,
                      biography : bio
                    }
                    })
                    .then( function (response){
                      console.log(response);
                      //user[0].bio = bio
                      alert('successful')
                    } )
                    .catch(function (error) {
                    console.log(error);
                    updateStatus = 'update successful'
                    });
                    curr[0].bio = bio;

        }
        if( curr[0].username && location.trim() !='' ) 
        {
                //location
                axios({
                    method : 'post',
                    url : 'https://lamp.ms.wits.ac.za/home/s1851427/WDAUpdateLocation.php',
                    params : {
                      username : curr[0].username,
                      location : location
                    }
                    })
                    .then( function (response){
                      console.log(response);
                      //alert('successful')
                    } )
                    .catch(function (error) {
                    console.log(error);
                    updateStatus = 'update successful'
                    });
                    curr[0].location = location;

        }

        if(interest1 && interest2 && interest3 && interest4 && interest5){
            
             // interests
             axios({
                 method : 'put',
                 url : 'https://lamp.ms.wits.ac.za/home/s1851427/WDAInterest.php',
                 params : {
                   username : curr[0].username,
                   interest_1 : interest1,
                   interest_2 : interest2,
                   interest_3 : interest3,
                   interest_4 : interest4,
                   interest_5 : interest5
                 }
                 })
                 .then( function (response){
                   console.log(response);
                   alert('successful')
                   
                 } )
                 .catch(function (error) {
                 console.log(error);
                 updateStatus = 'update successful'
                 });
        }
        if(name.trim() === '' || bio.trim() === '' || location.trim() === '' ){ // bug here
          return
        }
        else{
          saveToStorage('user', curr);
        }
        //alert(updateStatus);

    } 

   
    console.log("current")
    
    return (  
        <div>
           <div className="panel-container-1">
                <div className="panel-container-2">
                    <div className="profile-container">
                            <div className="profile-name">
                                <p id="feed-username">PROFILE</p>                          
                            </div>
                        </div>
                        <div id="logout"><i className="uil uil-sign-out-alt" onClick={handleLogout}></i></div>
                </div>
                <br />
                <div>
                  <br /><br /><br /><br />
                <img id="register-pic"  src={curr === null? "no user": curr[0].profile_picture}></img>
                <br />        
                <input
                  type="file"
                  id="fileupload"
                  accept="image/*"
                  ref={fileInputEl => setFile(fileInputEl)}
                  onChange={(e) => document.getElementById('register-pic').src = URL.createObjectURL(e.target.files[0]) }
                />
                </div>
                
                <div >
                    <h2 className="usernameAge">{curr === null? "no user": curr[0].username+ " ,22"}</h2>
                    <hr className="divider" size="6" />
                    <br />
                </div>

                <dir>
                    <Formik>
                        <div className="wrapper">

                           <p className="lblDiscriber">NAME</p>
                            
                            <input
                                value = {name}
                                placeholder = "name"
                                alt = "Placeholder"
                                className='inputfield'
                                type="text" 
                                align="start"
                                onChange={e => setName(e.target.value)}
                                                                                                               
                            />
                            <p className="lblDiscriber">LOCATION</p>
                            
                            <input
                                value = {location}
                                placeholder = "location"
                                alt = "Placeholder"
                                onChange={e => setLocation(e.target.value)}
                                className="inputfield"
                                type="text" 
                                align="start"
                                style={{ color: "#00bafa" }}
                                 
                            />
                            <p className="lblDiscriber">BIO</p>
                                <textarea 
                                    value = {bio}
                                    placeholder = "bio"
                                    alt = "Placeholder"
                                    onChange={e => setBio(e.target.value)}
                                    type="text"
                                    className="bio"
                                    rows="1"cols="52"></textarea>
                                
                                <p className="lblDiscriber">Interest</p>
                                <div className="interest">
                                    <div title="interestOne" className="interest-element"  style={{borderColor: "#12c2e9", color:"#12c2e9" }} >{interest.length ===0 ? 'no user': interest.interest_1}</div>
                                    <div className="interest-element" style={{borderColor: "#c471ed", color:"#c471ed" }} >{interest.length ===0 ? 'no user': interest.interest_2}</div>
                                    <div className="interest-element"  style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_3}</div>
                                    <br />
                                    <div className="interest-element" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_4}</div>
                                    <div className="interest-element" >{interest.length ===0 ? 'no user': interest.interest_5}</div>
                             </div>
<button className='intrestbutton' 
                                    onClick={interestsDisplay}
                                    id="interests-button">
                                        Choose Interests
                                </button> 
                                <br />
                                <hr className="line2" size="2" style={{Color: "#6e6e6e"}}/>
                             <div className="btnUpdate">
                                <Link className='button' to="/profile" style={globalStyles.button}  onClick={ () => handleUpdate(file.files)} ><b>Update</b> </Link>
                             </div>
                             
                        </div>
                        
                                        
                    </Formik>

                   

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
                </dir>
                

            </div>
                
        </div>
    );
}
 
export default EditProfile;