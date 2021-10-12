import React from 'react';
import NavBar from './NavBar';
import { matchRequest } from '../BackendRequests/Matches';
import { Link,useHistory } from 'react-router-dom';
import isLoggedIn from '../HelperClasses/LoginChecker';
import "./Matches.css"
import Login from '../AuthFiles/Login';

function Matches({ setUser }) {

    let history = useHistory();
    // check if user is logged in
    if(!isLoggedIn()){
        history.push('/');
        return <Login setUser = {setUser} />
    }
    else{
        return (
            <div>
                <div className = "matches-header">
                    <h1>Matches page</h1>
                </div>
                <div className = "matches-container">
                    <div className = "userList">
                        <div className = "title">
                            <h3>Matches</h3>
                        </div>
                        <div>Matched users here</div>
    
                    </div>
                </div>
                <NavBar setUser={setUser} />
            </div>
        )
    }

    
}

export default Matches