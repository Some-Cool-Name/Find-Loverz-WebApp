import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import './Navbar.css';

export default function NavBar({ setUser, user}) {
    let history = useHistory();

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        deleteFromStorage('otherPersonUsername');
        setUser(null);
        history.push('/');
    }

    return (    
        <div className="navBarNew">
            <p id="findLovers"><b>FindLoverz   </b></p> 
            <p id="divider">|</p>
            <Link to="/profile" ><img src ={user[0].profile_picture} id="NavBarImage"  /></Link>
            <Link to="/feed" id="navFeed" > <b>Feed</b> </Link>
            <Link to="/chat"  id="navChat"> <b>Chat</b> </Link>
            <Link to="/" onClick={handleLogout} id="navLogout"> <b>Logout</b> </Link>
        </div>

        // <navbar>
        //     <div className="left-nav">
        //         <h1 id="nav-app-name">Find Loverz</h1>
        //         <div className="profile-container">
        //             <div className = "match-profile-picture"><img src = {user[0].profile_picture} alt="" /> </div>
        //                 <div className="profile-name">
        //                     <p id="feed-username">{user[0].username}</p>                          
        //                 </div>
        //         </div>
        //     </div>

        //     <div className="right-nav">
        //         <Link to="/feed" style={{marginRight: 5}} ><p>Home</p></Link>
        //         <Link to="/matches" style={{marginRight: 5}} ><p>Chats</p></Link>
        //         <input type="text" className="nav-search-bar" id="nav-search-bar" placeholder="Search"></input>
        //         <div className="search-button"><i class="uil uil-search"></i></div>
        //         <Link to="/" onClick={handleLogout} ><p>Logout</p></Link>
        //     </div>
        // </navbar>
    )
}
