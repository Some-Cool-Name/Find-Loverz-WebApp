import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import isLoggedIn from '../HelperClasses/LoginChecker';
import Login from '../AuthFiles/Login';

function Feed({ setUser, user }) {
    let history = useHistory();

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    // checks if user is logged and allows or gives him access to the page.
    if(!isLoggedIn()){
        history.push('/');
        return <Login setUser={setUser} user={user} />;
    }

    else if(user==null) return <h1>loading...</h1>;


    else {

        return (
            <div>
                <div className='User-Info'> 
                    <h1>User-Info</h1>
                    <p>username  : {user[0].username} </p>
                    <p>name  : {user[0].name}</p>
                    <p>DOB   : {user[0].Birthday} </p>
                    <p>gender    :  {user[0].gender} </p>
                    <p>attracted to  :{user[0].Sexuality}</p>
                </div>  
                <Link className="button" to="/" onClick={handleLogout} style={globalStyles.button} > <b>Logout</b> </Link>
            </div>
        )
    }

}

export default Feed
