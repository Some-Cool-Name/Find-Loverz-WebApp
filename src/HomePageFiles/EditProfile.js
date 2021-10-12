import {Link, useHistory } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { Formik } from 'formik';
import { React, useState,useEffect } from "react";
import { ImLocation2 } from "react-icons/im";

const EditProfile = ({ setUser, user }) => {
    //current user's name
    // This whole view functionality is using the prop user, if details are changed , update the variable by using setUser
    
    //you can use the states below inorder to send requests to update the profile
    const [name,setName]=useState();
    const [bio,setBio]=useState();
    const [interest,setInterest]= useState({length:0});
    let history = useHistory();
    let curr = null;

    const fetchInterest = async (e) =>{
        console.log(user)
        
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
    
    
    
    const handleFeed = () => {
        history.push('/feed');
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
                        <div id="logout"><i class="uil uil-sign-out-alt" onClick={handleFeed}></i></div>
                </div>
                <br />
                <div>
                    <img className="profile-image" id="feed-image" src={curr === null? "no user": curr[0].profile_picture}></img>
                    <p className="editProfile">edit profile</p>
                </div>
                
                <div >
                    <h2 className="usernameAge">{curr === null? "no user": curr[0].username+ " ,22"}</h2>
                    <hr className="divider" size="6" />
                    <br /><br />
                </div>

                <dir>
                    <Formik>
                        <div className="wrapper">
                            <p className="lblDiscriber">NAME</p>
                            
                            <input
                                className='inputfield'
                                type="text" 
                                value={curr === null? "no user": curr[0].name}
                                align="start"
                                onChange={e => setName(e.target.value)}
                                                                                                               
                            />
                            <p className="lblDiscriber">LOCATION</p>
                            
                            <input
                                className='inputfield'
                                type="text" 
                                value={curr === null? "no user": curr[0].location}
                                align="start"
                                style={{ color: "#00bafa" }}
                                readOnly 
                            />
                            <p className="lblDiscriber">BIO</p>
                                <textarea value={curr === null? "no user": curr[0].bio+" Im just here for beautiful ladies, I love cute,beautiful and kind XD"} onChange={e => setBio(e.target.value)} type="text" className="bio" rows="6" cols="52"></textarea>
                                <p className="lblDiscriber">Interest</p>
                                <div className="interest">
                                    <div className="interest-element"  style={{borderColor: "#12c2e9", color:"#12c2e9" }} >{interest.length ===0 ? 'no user': interest.interest_1}</div>
                                    <div className="interest-element" style={{borderColor: "#c471ed", color:"#c471ed" }} >{interest.length ===0 ? 'no user': interest.interest_2}</div>
                                    <div className="interest-element"  style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_3}</div>
                                    <br />
                                    <div className="interest-element" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{interest.length ===0 ? 'no user': interest.interest_4}</div>
                                    <div className="interest-element" >{interest.length ===0 ? 'no user': interest.interest_5}</div>
                             </div>
                             <p className="editInterest">edit interest</p>
                             <hr className="line2" size="2" style={{Color: "#6e6e6e"}}/>
                             <div className="btnUpdate">
                                <Link className='button' /* to="/profile" */ style={globalStyles.button} /* onClick={props.handleSubmit} */><b>Update</b> </Link>
                             </div>
                             
                        </div>
                       
                         
                             
                            
                        
                    
                    </Formik>
                </dir>
                

            </div>
                
        </div>
    );
}
 
export default EditProfile;