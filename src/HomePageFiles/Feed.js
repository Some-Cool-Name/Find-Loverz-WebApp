import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { globalStyles } from '../globalStyles';

function Feed() {
    const location = useLocation();
    console.log("hello ", location.state);

    if(location.state === undefined){
        return null;
    }
    else{
        return(
            <div>
                <h1> Hello {location.state}</h1>
                <Link to="/" style={globalStyles.button}>Logout</Link>
            </div>
        )
    }
    return (
        <div>
            <h1>Feed</h1>
            <Link to="/" style={globalStyles.button} >Logout</Link>
        </div>
    )
}

export default Feed
