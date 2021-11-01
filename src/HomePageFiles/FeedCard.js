import React from 'react';
import { ImLocation2 } from "react-icons/im";

function FeedCard({ userAccount, fetchUsers, user }) {

    const swipeRight = (likedUser) => {
        const like = async (e)=>{
            e.preventDefault()
            const results = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDALikeUser.php?"+
            `likerUsername=${user[0].username}&likeeUsername=${likedUser.E_mail}`
            )
            fetchUsers();
        }
        const temp = like;
        return temp;
    }
    
    const swipeLeft = (likedUser) => {
        const reject = async (e)=>{
            e.preventDefault()
            const results = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDARejectUser.php?"+
            `rejectorUsername=${user[0].username}&rejecteeUsername=${likedUser.E_mail}`
            )
            fetchUsers();
        } 
        const temp = reject;
        return temp;
    }


    return (
        <div className="card-container" id="card">
        <img className="card-image" src={userAccount.Profile_Picture} ></img>
          <div className="card-id">
            <h2 className="usernameAge2">{userAccount.Full_Name }</h2>
          </div>
          <p title="location" className="location"><ImLocation2 style={{ color:"#808080", marginRight:"10px" }} />{userAccount.Location}</p>
          <div className="interest2">
                    <div className="interest-element2" title="intOne" style={{borderColor: "#12c2e9", color:"#12c2e9" }} >{userAccount.Interest_1}</div>
                    <div className="interest-element2" title="intTwo" style={{borderColor: "#c471ed", color:"#c471ed" }} >{userAccount.Interest_2}</div>
                    <div className="interest-element2" title="intThree" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{userAccount.Interest_3}</div>
                    <br />
                    <div className="interest-element2" title="intFour" style={{borderColor: "#fc32e8", color:"#fc32e8" }}>{userAccount.Interest_4}</div>
                    <div className="interest-element2" title="intFive" >{userAccount.Interest_5}</div>
                </div>
        <div className="card-bio">
          <div>
            {userAccount.Bio }
          </div>
        </div>
        <div className="button-container">
          <div onClick={swipeRight(userAccount)} id="yes-button"><i className="uil uil-check"></i></div>
          <div onClick={swipeLeft(userAccount)} id="no-button" ><i className="uil uil-times"></i></div>
        </div>
      </div>
    )
}

export default FeedCard
