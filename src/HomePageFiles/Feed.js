import React from 'react';
import { Link } from 'react-router-dom';
import { globalStyles } from '../globalStyles';

function Feed() {
    return (
        <div>
            <h1>Feed</h1>
            <Link to="/" style={globalStyles.button} >Logout</Link>
        </div>
    )
}

export default Feed
