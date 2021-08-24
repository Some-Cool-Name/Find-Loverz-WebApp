import React from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { globalStyles } from '../globalStyles';

function Feed(props) {
    return (
        <div>
            <div className='User-Info'> 
                <h1>User-Info</h1>
                <p>username  : {props.users[0].username} </p>
                <p>name  : {props.users[0].name}</p>
                <p>DOB   : {props.users[0].Birthday} </p>
                <p>gender    :  {props.users[0].gender} </p>
                <p>attracted to  :{props.users[0].Sexuality}</p>
            </div>  
            <Link className="button" to="/" style={globalStyles.button} > <b>Logout</b> </Link>
        </div>
    )
}

export default Feed
