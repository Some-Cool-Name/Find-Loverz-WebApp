import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';

export default function NavBar({ setUser }) {
    let history = useHistory();

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    return (        
        <div>
            <Link to="/feed" style={{marginRight: 5}} > <b>Feed</b> </Link>
            <Link to="/matches" style={{marginRight: 5}} > <b>Chat</b> </Link>
            <Link to="/" onClick={handleLogout} > <b>Logout</b> </Link>
        </div>
    )
}
