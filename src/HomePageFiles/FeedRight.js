import React from "react";
//import {button} from '../HelperClasses/modal.js';

export default function FeedRight() {
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

  return (
    <div>
      <div className="right-container-1" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
        <div className="right-container-2">
          <div className="card-container" id="card">
            <div className="card-image"></div>
            <div className="card-id">
              <p id="feed-name">Name</p>
              <p id="feed-age">Age</p>
              <button id="open" onClick={button} >More Info</button>
                {/* new stuff*/}
                <div className="modal-container" id="modal_container">
                  <div className="modal">
                      <h1>Modals are here</h1>
                      <p>Birthday: June 20 <i><b>gemini</b></i></p>
                      <p>Location: Braamfontein</p>                   
                      <p><b>Name</b> enjoys walks on the beach and hanging out with friends</p>
                      <button id="close">
                          Close
                      </button>
                  </div>

                </div>
                {/* end new stuff*/}
            </div>
            <div className="card-interests">
              Interest 1, Interest 2, Interest 3, Interest 4, Interest 5
            </div>
            <div className="card-bio">
              <h1>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </h1>
            </div>
          </div>
          <div className="button-container">
            <div id="yes-button"><i class="uil uil-check"></i></div>
            <div id="no-button"><i class="uil uil-times"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}
