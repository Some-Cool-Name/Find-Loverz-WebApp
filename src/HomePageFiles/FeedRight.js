import React,{useState, useEffect} from "react";

export default function FeedRight({user}) {


  // fetching the feed
  const [users,setUsers] = useState(
    {length:0}
  );
  const fetchUsers = async (e) =>{
    const result = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAgetFeed.php?"+
    `username=${user[0].username}`
    )
    console.log(user[0].username)
    const data = await result.json();
    setUsers(data.feedProfiles);
    
    console.log(data.feedProfiles)
    }
    useEffect(()=>{
      fetchUsers();
      
      },[])



  //Accepting and declining users 

   const swipeRight = async (e)=>{
     e.preventDefault()
     const results = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDALikeUser.php?"+
     `likerUsername=${user[0].username} & likeeUsername=${users[0].E_mail}`
     ,{method:"POST"})
    fetchUsers();
   } 
   
   
   const swipeLeft = async (e)=>{
    e.preventDefault()
    const results = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDARejectUser.php?"+
    `rejectorUsername=${user[0].username}& rejecteeUsername=${users[0].E_mail}`
    )
   fetchUsers();
  } 

  var dragging = false;
  var xStart = 0;
  var xEnd = 0;

  //  left: swipe < 0
  //  right: swipe > 0
  var swipe = 0;

  function mouseDown (event) {
    dragging = true;
    xStart = event.clientX; 
}

function mouseMove (event) {
    if (!dragging){
      return;
    } 
}

function mouseUp (event) {
   dragging = false;
   xEnd = event.clientX;
   swipe = xEnd - xStart;

   // Ignore small swipes
   if (Math.abs(swipe) <= 50){
     swipe = 0;
   }

   if (swipe < 0){
     console.log("left");
   }

   else if (swipe > 0){
    console.log("right");
  }

  else{
    console.log("nothing");
  }
}

/*modal helper*/
function button(){
  const open = document.getElementById('open');
  console.log(open);
  const modal_container = document.getElementById('modal_container');
  const close = document.getElementById('close');
  
  open.addEventListener('click',()=>{
      modal_container.classList.add("show");
  });
  
  
  close.addEventListener('click',()=>{
      modal_container.classList.remove('show');
  });
  
  }
/*end modal helper*/

// console.log(users[0]);


  return (
    <div>
      <div className="right-container-1" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        <div className="right-container-2">
          <div className="card-container" id="card">
            <img className="card-image" src={users.length ===0 ? 'no user': users[0].Profile_Picture} ></img>
            <div className="card-id">
              <p id="feed-name">{users.length ===0 ? 'no user': users[0].Full_Name }</p>
              
              <button id="open" onClick={button} >More Info</button>
                <div className="modal-container" id="modal_container">
                  <div className="modal">
                      <h1>More information</h1>
                      <br/>
                      <br/>
                     {/* <p id="feed-age">21</p>*/}
                      {/* <p style={{color: 'purple'}} > Name:</p> <p> {users[0].Full_Name}</p> */}
                      <p style={{color: 'purple'}} >Age:</p><p>21</p>
                      <p style={{color: 'purple', marginTop: 5}} >Location:</p><p> Braamfontein</p>
                      <p style={{color: 'purple', marginTop: 5}} >Birthday:</p> <p>{users.length ===0 ? 'no user': users[0].Birthday} <i><b></b></i></p>
                      <button className = "button" id="close">
                          Close
                      </button>
                  </div>

                </div>
            </div>
            <div className="card-interests">
             {users.length ===0 ? 'no user': users[0].Interest_1 +'  '+ users[0].Interest_2 +'  '+ users[0].Interest_3+'  '+ users[0].Interest_4+'  '+ users[0].Interest_5   }
              
            </div>
           
            <div className="card-bio">
              <div>
              {users.length ===0 ? 'no user': users[0].Bio + " just to occupy some space for short bios like this one :)" }
              </div>
            </div>
          </div>
          <div className="button-container">
            <div onClick={ users.length===0 ? '':swipeRight} id="yes-button"><i class="uil uil-check"></i></div>
            <div onClick={ users.length===0 ? '':swipeLeft} id="no-button" ><i class="uil uil-times"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}
