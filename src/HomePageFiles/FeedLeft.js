import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteFromStorage, getFromStorage, saveToStorage } from '../HelperClasses/StorageHandler';
import { matchRequest } from '../BackendRequests/Matches';
import { useEffect, useState } from 'react';

export default function FeedLeft({ setUser, user, setOtherUser }) {
    let history = useHistory();
    const [fetchedMatches, setFechedMatches] = useState([]);
    const [error, setError] = useState(false);

    const goToChat = (name, image) => {
        saveToStorage('otherPersonUsername', `${name}`);
        setOtherUser(name);
        // saveToStorage('otherImageUrl', image);
        history.push('/chat');
    }

    useEffect(()=>{
        const userMatches = async() =>{
            try{
                var data =  await matchRequest(user[0].username);
                if( data.matchedWith === "no matches found"){
                    console.log("in if")
                    setFechedMatches([]);

                }
                else{
                    console.log("in else")
                    console.log(data)
                    setFechedMatches(data);
                
                }
            }
            catch(e){
                setFechedMatches([])
            }
            
        };
        userMatches();
    }, [user]);

    var matches;
    var numberofMatches;
    console.log(fetchedMatches.length);
    if(fetchedMatches.length === 0){
        matches = 0;
        numberofMatches = 0;
    }
    else{
        
        matches = fetchedMatches.matchedWith;
        console.log(matches);
        numberofMatches = matches.length;
        console.log(numberofMatches);
    }
    
    

    function showMatches(){
        
        let list = [];

        for(let i = 0; i<numberofMatches ;i++){
            let picture;
            let name;
            try{
                picture = matches[i].Profile_Picture;
                if(picture === undefined){
                    picture = "";
                }
                name = matches[i].E_mail;
                if(name === undefined){
                    name = "Error undefined name";
                }
            }catch(error){
                setError(true);
            }
            try {
               list.push(
                   <div onClick={() => goToChat(matches[i].E_mail, matches[i].Profile_Picture)} className = "match-container-2">

                        <div className = "match-profile-picture"><img src = {picture} alt="" /> </div>
                        <div className = "match-userName">{name}</div>
                        <div className = "match-date"> 15 sept </div>
                   </div> 
               );
            }
            catch(e){
                console.log(e)
            }
        }
        return list;
        
    }
    

    return (        
        <div>
            <div className="panel-container-1">      
                <div className="navbar-items">
                    <p>Matches</p>
                </div>

                <div className="match-container-1">
                    {showMatches()}
                </div>
            </div>
        </div>
    )
}
