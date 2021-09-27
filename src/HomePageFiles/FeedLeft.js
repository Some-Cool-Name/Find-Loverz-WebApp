import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage } from '../HelperClasses/StorageHandler';
import { matchRequest } from '../BackendRequests/Matches';
import { useEffect, useState } from 'react';

export default function FeedLeft({ setUser, user }) {
    let history = useHistory();
    const [fetchedMatches, setFechedMatches] = useState([]);

    // handles user logout
    const handleLogout = () => {
        deleteFromStorage('user');
        setUser(null);
        history.push('/');
    }

    useEffect(()=>{
        const userMatches = async() =>{
            const data =  await matchRequest(user[0].username);
            setFechedMatches(data);
        };
        userMatches();
    }, [user]);

    
    const matches = fetchedMatches.matchedWith;
    const numberofMatches = fetchedMatches.count;
    console.log(); 

    function showMatches(){
        var list = []
        for(var i = 0; i<numberofMatches;i++){

            if(matches[i] != undefined){
                var picture = matches[i].Profile_Picture;
               list.push(
                   <div className = "userTab">
                        <div className = "profilepicture"><img src = {picture} alt="" /> </div>
                        <div className = "userName">{matches[i].Full_Name}</div>
                        <div className = "date"> 15 sept </div>
                   </div> 
               );
            }
            
        }
        return list;
        
    }
    

    return (        
        <div>
            <div className="panel-container-1">
                <div className="panel-container-2">
                    <div className="profile-container">
                        <div className="profile-image" id="feed-image"></div>
                        <div className="profile-name">
                            <p id="feed-username">Username</p>                          
                        </div>
                    </div>

                    <div id="logout"><i class="uil uil-sign-out-alt" onClick={handleLogout}></i></div>
                </div>
                
                <div className="navbar-items">
                    <p>Matches</p>
                </div>
                <div>
                    {showMatches()}
                </div>
            </div>
        </div>
    )
}
