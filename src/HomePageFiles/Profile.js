import React from 'react';
import EditProfile from './EditProfile';
import ProfilePreview from './ProfilePreview';
import './Profile.css';
import NavBar from './NavBar';


const Profile = ({ setUser, user }) => {



    return ( 
        <div>
            <div className="profile">
                <div className="left"><EditProfile user={user} setUser={setUser}></EditProfile></div>
                <div className="right"><ProfilePreview user={user} setUser={setUser}></ProfilePreview></div>
               {/*  <div className="navTopBar1">
                    <NavBar user={user} setUser={setUser} />
                </div>
                
                <div style={{width: "51vw", height: 0}}></div>
                <div className="ProfileComp1">
                    <div className="left"><EditProfile user={user} setUser={setUser}></EditProfile></div>
                    <div className="right"><ProfilePreview user={user} setUser={setUser}></ProfilePreview></div>   
                </div> */}
               
            </div>
        </div>
    );
}
 
export default Profile;