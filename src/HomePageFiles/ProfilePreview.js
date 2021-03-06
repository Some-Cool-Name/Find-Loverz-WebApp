import React, { useState,useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import 'regenerator-runtime/runtime';

const ProfilePreview = ({ setUser, user }) => {
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
    
    
    
    return ( 
        <div style={{position: "absolute",
            right: "0px",
            top: "0px",
            zIndex: -1}}>
            
            <div className="right-container-1">
            <div className="right-container-2">
            <h2 style={{ color:"#808080", marginRight:"10px" }}>PREVIEW</h2>
                <div className="card-container" id="card">
                <img className="card-image" src={curr === null? "no user": curr[0].profile_picture} alt=""  ></img>
                <h2 className="usernameAge2" title="name">{curr === null? "pigs": curr[0].name}</h2>
                
                <p title="location" className="location"><ImLocation2 style={{ color:"#808080", marginRight:"10px" }} />{curr === null? "braam": curr[0].location}</p>
                <div className="interest2">
                    <div className="interest-element2" title="intOne" style={{borderColor: "#12c2e9", color:"#12c2e9" }} >{interest.length ===0 ? 'Golf': interest.interest_1}</div>
                    <div className="interest-element2" title="intTwo" style={{borderColor: "#c471ed", color:"#c471ed" }} >{interest.length ===0 ? 'Gym': interest.interest_2}</div>
                    <div className="interest-element2" title="intThree" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'Pet Lover': interest.interest_3}</div>
                    <br />
                    <div className="interest-element2" title="intFour" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'Spirituality': interest.interest_4}</div>
                    <div className="interest-element2" title="intFive" >{interest.length ===0 ? 'Vlogging': interest.interest_5}</div>
                </div>
                
                
                <div className="card-bio">
                    <div>
                    <p title="previewBio"> {curr === null? "lllll": curr[0].bio} </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
      </div>
    );
}
export default ProfilePreview;