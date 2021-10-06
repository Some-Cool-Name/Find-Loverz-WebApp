import {Link, useHistory } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { Formik } from 'formik';
import { React, useState } from "react";

const EditProfile = ({ setUser, user }) => {
    //current user's name
    const [name,setName]=useState("Tumi");
    const [bio,setBio]=useState("Hook ups only, example of bio \nI'm looking for a cute girl \nI love good & kind people");
    let history = useHistory();
    
    
    const handleFeed = () => {
        history.push('/feed');
    }


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
                    <div className="profile-image" id="feed-image"></div>
                    <p className="editProfile">edit profile</p>
                </div>
                
                <div >
                    <h2 className="usernameAge">Username, Age</h2>
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
                                value={name}
                                align="start"
                                onChange={e => setName(e.target.value)}
                                                                                                               
                            />
                            <p className="lblDiscriber">LOCTION</p>
                            <input
                                className='inputfield'
                                type="text" 
                                value="braamfontein" 
                                align="start"
                                style={{ color: "#00bafa" }}
                                readOnly 
                            />
                            <p className="lblDiscriber">BIO</p>
                                <textarea value={bio} onChange={e => setBio(e.target.value)} type="text" className="bio" rows="6" cols="52"></textarea>
                                <p className="lblDiscriber">Interest</p>
                                <div className="interest">
                                    <div className="interest-element"  style={{borderColor: "#12c2e9", color:"#12c2e9" }} >interest-1</div>
                                    <div className="interest-element" style={{borderColor: "#c471ed", color:"#c471ed" }} >interest-1</div>
                                    <div className="interest-element"  style={{borderColor: "#fc32e8", color:"#fc32e8" }}>interest-1</div>
                                    <br />
                                    <div className="interest-element" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>interest-1</div>
                                    <div className="interest-element" >interest-1</div>
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