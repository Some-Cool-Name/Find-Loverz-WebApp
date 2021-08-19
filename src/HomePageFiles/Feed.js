import React from 'react';
import { Link } from 'react-router-dom';
import { globalStyles } from '../globalStyles';
import './Feed.css';
import { useHistory } from "react-router-dom";

function Feed() {
    let history = useHistory();
   function handleClick() {
    history.push("/");
  }
    return (
        <div>
            <div className='User-Info'>
                <h1>User-Info</h1>
                <p>username  : </p>
                <p>name  : </p>
                <p>DOB   :  </p>
                <p>gender    :   </p>
                <p>attracted to  :</p>
            </div>
            
            <button className="logout" onClick={()=> {handleClick()}} type="button">Logout</button>

            {/* <Link className="button" to="/" style={globalStyles.button} >Logout</Link> */}
        </div>
    )
}

export default Feed
