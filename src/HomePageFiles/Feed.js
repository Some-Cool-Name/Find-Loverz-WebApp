import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import isLoggedIn from '../HelperClasses/LoginChecker';
import Login from '../AuthFiles/Login';
import Users from './Users';
import NavBar from './NavBar';
import './Feed.css';

function Feed({ setUser, user }) {
    let history = useHistory();

    // checks if user is logged and allows or gives him access to the page.
    if(!isLoggedIn()){
        history.push('/');
        return <Login setUser={setUser} user={user} />;
    }

    else if(user==null) return <h1>loading...</h1>;


    else {

        return (
            <div>
                <Users />
                <NavBar setUser={setUser} />
            </div>
        )
    }

}

export default Feed
