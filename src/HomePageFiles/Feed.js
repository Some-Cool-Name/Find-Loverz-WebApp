import React from 'react';
import { Link } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';

function Feed({ user }) {
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
            <Link className="button" to="/" style={globalStyles.button} > <b>Logout</b> </Link>
        </div>
    )
}

export default Feed
