import React from 'react';
import EditProfile from './EditProfile';
import ProfilePreview from './ProfilePreview';
import './Profile.css';
import NavBar from './NavBar';


const Profile = ({ setUser, user }) => {



    return ( 
        <div>
            <NavBar user={user} setUser={setUser} />
            <div className="profile">
                <EditProfile user={user} setUser={setUser}></EditProfile>
                
                <div style={{width: "51vw", height: 0}}></div>
                <ProfilePreview user={user} setUser={setUser}></ProfilePreview>
            </div>
        </div>
    );
}
 
export default Profile;