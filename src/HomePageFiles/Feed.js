import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { globalStyles } from '../globalStyles';


function Feed(props) {
    const location = useLocation();
    //const username  = location.state;
    const username = props.location.aboutProps;
    return (
        <div>
            <h1>Hello {username}</h1>
            <Link to="/" style={globalStyles.button} >Logout</Link>
        </div>
    )
}

export default Feed
