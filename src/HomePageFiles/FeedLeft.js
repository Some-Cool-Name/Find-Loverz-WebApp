import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';

export default function FeedLeft({ setUser }) {
    let history = useHistory();

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    return (        
        <div>
            <div className="panel-container-1">
                <div className="panel-container-2">
                    <div className="profile-container">
                        <div className="profile-image" id="feed-image"></div>
                        <div className="profile-name">
                            <p id="feed-username">Username</p>                          
                        </div>
                    </div>

                    <div id="logout"><i class="uil uil-sign-out-alt"></i></div>
                </div>
                
                <div className="navbar-items">
                    <p>Messages</p>
                </div>
            </div>
        </div>
    )
}
