import React from 'react';

function FeedCard({ userAccount, fetchUsers, user }) {

  const like = async (likedUser) => {
    await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDALikeUser.php?"+
    `likerUsername=${user[0].username}&likeeUsername=${likedUser.E_mail}`
    )
    fetchUsers();
  } 
  
  const reject = async (likedUser) => {
    await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDARejectUser.php?"+
    `rejectorUsername=${user[0].username}&rejecteeUsername=${likedUser.E_mail}`
    )
    fetchUsers();
  }

  const swipeRight = async (likedUser) => {
    await like(likedUser);
  }
    
  const swipeLeft = async (likedUser) => {
     await reject(likedUser);
  }


    return (
        <div className="card-container">
        <img className="card-image" src={userAccount.Profile_Picture} ></img>
          <div className="card-id">
            <p id="feed-name">{userAccount.Full_Name }</p>
        
          </div>
        <div className="card-interests">
        {userAccount.Interest_1 +", "+ userAccount.Interest_2 +", "+ userAccount.Interest_3 +", "+ userAccount.Interest_4 +", "+ userAccount.Interest_5}
        </div>
     
        <div className="card-bio">
          <div>
            {userAccount.Bio }
          </div>
        </div>
        <div className="button-container">
          <div onClick={() => swipeRight(userAccount)} id="yes-button"><i className="uil uil-check"></i></div>
          <div onClick={() => swipeLeft(userAccount)} id="no-button" ><i className="uil uil-times"></i></div>
        </div>
      </div>
    )
}

export default FeedCard
