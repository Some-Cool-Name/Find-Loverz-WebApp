import React from 'react';
import EditProfile from './EditProfile';
import ProfilePreview from './ProfilePreview';
import './Profile.css'


const Profile = ({ setUser, user }) => {



    return ( 
        <div>
            <div className="profile">
                <EditProfile user={user} setUser={setUser}></EditProfile>
                <ProfilePreview user={user} setUser={setUser}></ProfilePreview>
            </div>
        </div>
    );
}
 
export default Profile;