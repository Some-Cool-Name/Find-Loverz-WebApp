import React from 'react';

export default function Modal() {
    //  Generate colour between range
    const randomBetween = (a, b) => {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const randomColor = (firstColor, secondColor) => {
        var first = firstColor.toUpperCase().substring(1, secondColor.length);
        var second = secondColor.toUpperCase().substring(1, firstColor.length);
        const scale = '0123456789ABCDEF';
        let color = '#';
        
        for(let i = 0; i < first.length && i < second.length; i++ ){
            const random = randomBetween(scale.indexOf(first[i]),
            scale.indexOf(second[i]));
            color += scale[random];
        };
        return color;
    };
    
    /*modal helper*/
    function button(){
        const open = document.getElementById('modal-open');
        console.log(open);
        const modal_container = document.getElementById('modal_container');
        const close = document.getElementById('modal-close');
    
        open.addEventListener('click',()=>{
        modal_container.classList.add("show");

        document.getElementById('user-interest-1').style.background = randomColor('#20b5eb' , '#c46fee');
        document.getElementById('user-interest-2').style.background = randomColor('#20b5eb' , '#c46fee');
        document.getElementById('user-interest-3').style.background = randomColor('#20b5eb' , '#c46fee');
        document.getElementById('user-interest-4').style.background = randomColor('#20b5eb' , '#c46fee');
        document.getElementById('user-interest-5').style.background = randomColor('#20b5eb' , '#c46fee');
    });
    
    
    close.addEventListener('click',()=>{
        modal_container.classList.remove('show');
    });
    
    }
    /*end modal helper*/

    return (
        <div>
            <div id="modal-open"><i class="uil uil-info-circle" onClick={button}></i></div>
            <div className="modal-container" id="modal_container">
                <div className="modal">
                    <div className = "modal-picture"><img></img></div> 
                    
                    <div className="user-details">
                        <p id="modal-name">Name</p>
                        <p id="modal-age">Age</p>
                    </div>

                    <div className="user-details">
                        <p id="user-location">Location</p> 
                    </div>
                    
                    <div className="modal-field">
                        <h1>Bio</h1> 
                        <p id="user-bio">bio aaaa a aa aaa aaa</p>
                    </div>

                    <div className="modal-field">
                        <h1>Interests</h1> 

                        <div className="modal-interests">
                            <p id="user-interest-1">Interest</p>
                            <p id="user-interest-2">Interest</p>
                            <p id="user-interest-3">Interest</p>
                            <p id="user-interest-4">Interest</p>
                            <p id="user-interest-5">Interest</p>
                        </div>
                    </div>

                    <button id="modal-close">Close</button>
                </div>

            </div>
        </div>
    )
}
