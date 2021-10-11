import Modal from "./Modal";
import { React, useState,useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
const ProfilePreview = ({ setUser, user }) => {
    let curr = null;
    const [interest,setInterest]= useState({length:0});
    const fetchInterest = async (e) =>{
        
        const result = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAGetInterest.php?username=begin"
        )
        const data = await result.json();
        setInterest(data.Interest[0]);
        
        
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
        <div>
            
            <div className="right-container-1">
            <div className="right-container-2">
            <h2 style={{ color:"#808080", marginRight:"10px" }}>PREVIEW</h2>
                <div className="card-container" id="card">
                <img className="card-image" src={curr === null? "no user": curr[0].profile_picture} alt=""  ></img>
                <h2 className="usernameAge2">{curr === null? "no user": curr[0].name+" ,22"}</h2>
                
                <p className="location"><ImLocation2 style={{ color:"#808080", marginRight:"10px" }} />{curr === null? "no user": curr[0].location}</p>
                <div className="interest2">
                    <div className="interest-element2"  style={{borderColor: "#12c2e9", color:"#12c2e9" }} >{interest.length ===0 ? 'no user': interest.interest_1}</div>
                    <div className="interest-element2" style={{borderColor: "#c471ed", color:"#c471ed" }} >{interest.length ===0 ? 'no user': interest.interest_2}</div>
                    <div className="interest-element2"  style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_3}</div>
                    <br />
                    <div className="interest-element2" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_4}</div>
                    <div className="interest-element2" >{interest.length ===0 ? 'no user': interest.interest_5}</div>
                </div>
                
                
                <div className="card-bio">
                    <div>
                    <p>Hook ups only, example of bio '\n'
                        I'm looking for a cute girl '\n'              
                        I love good & kind people </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
      </div>
    );
}
 
export default ProfilePreview;