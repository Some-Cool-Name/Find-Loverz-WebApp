import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';

function Feed({ setUser }) {
    const location = useLocation();
    let history = useHistory();

    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    if(location.state === undefined){
        return null;
    }
    else{
        return(
            <div>
                <h1> Hello {location.state}</h1>
                <Link to="/" style={globalStyles.button} onClick={handleLogout} >Logout</Link>
            </div>
        )
    }
}

export default Feed
