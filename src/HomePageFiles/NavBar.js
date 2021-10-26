import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import {IoHomeSharp } from "react-icons/io5";
import { BsFillChatFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";
import './Navbar.css';

export default function NavBar({ setUser, user}) {

    let history = useHistory();
    const [search, setSearch] = useState('');

    const stateSetter = () =>{
        sessionStorage.setItem("Interest", document.getElementById("search").value);
    }

    const handleKey=(e)=>{
        console.log(e.target.value);
        console.log("Enter button clicked");
        stateSetter();
    }

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
            {
                user &&
                <Link to="/profile" ><img src ={user[0].profile_picture} id="NavBarImage"  /></Link>
            }
            <div className="NavIcons">
                <Link to="/feed" id="navFeed" ><IoHomeSharp /> <b>Feed</b> </Link>
                <Link to="/chat"  id="navChat"> <BsFillChatFill/><b>Chat</b> </Link>
                <Link to="/" onClick={handleLogout} id="navLogout"><RiLogoutBoxRFill/> <b>Logout</b> </Link>
                <div onKeyDown={handleKey}/>
            <div>
                <input type="text" placeholder="Search" value={search.SearchInterest} id="search"/>
                <Link to="/Search">
                    <button onClick={handleKey}><img src="./search_icon.png" alt="Search"/></button>
                </Link>
            </div>
            </div>
            
        </div>

    )
}
