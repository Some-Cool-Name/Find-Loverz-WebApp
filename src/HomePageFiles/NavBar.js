import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';

export default function NavBar({ setUser, user}) {
    let history = useHistory();

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    return (        
        <navbar>
            <div className="left-nav">
                <h1 id="nav-app-name">Find Loverz</h1>
                <div className="profile-container">
                    <div className = "match-profile-picture"><img src = {user[0]?.profile_picture} alt="" /> </div>
                        <div className="profile-name">
                            <p id="feed-username">{user[0]?.username}</p>                          
                        </div>
                </div>
            </div>

            <div className="right-nav">
                <Link to="/feed" style={{marginRight: 5}} ><p>Home</p></Link>
                <Link to="/matches" style={{marginRight: 5}} ><p>Chats</p></Link>
                <Link to="/profile" style={{marginRight: 5}} ><p>Profile</p></Link>
                <input type="text" className="nav-search-bar" id="nav-search-bar" placeholder="Search"></input>
                <div className="search-button"><i class="uil uil-search"></i></div>
                <Link to="/" onClick={handleLogout} ><p>Logout</p></Link>
            </div>
        </navbar>
    )
}
