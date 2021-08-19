import React from 'react';
import './Feed.css';
import { useHistory } from "react-router-dom";

function Feed() {
    let history = useHistory();
   function handleClick() {
    history.push("/");
  }
    return (
        <div>
           
            
            <button className="logout" onClick={()=> {handleClick()}} type="button">Logout</button>

            {/* <Link className="button" to="/" style={globalStyles.button} >Logout</Link> */}
        </div>
    )
}

export default Feed
