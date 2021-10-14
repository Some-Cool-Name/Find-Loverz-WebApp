import React from 'react';
import 'regenerator-runtime/runtime';
import { BrowserRouter } from "react-router-dom"
import Chat from '../Chat';
import { render, screen } from '@testing-library/react';

// firebase
import firebase from "firebase/app";
import 'firebase/database';

const setUpDB = () => {
    try {
        const firebaseConfig = {
          apiKey: "AIzaSyCXGM_HwxTPMBSRE8AuEUIlUnN3h0_Ny9A",
          authDomain: "dating-b5a28.firebaseapp.com",
          databaseURL: "https://dating-b5a28-default-rtdb.firebaseio.com",
          projectId: "dating-b5a28",
          storageBucket: "dating-b5a28.appspot.com",
          messagingSenderId: "116688027145",
          appId: "1:116688027145:web:8483dc7960328dc29902d8"
        };
    
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        return firebase.database();
      } catch (error) {
        console.log(error);
      }
      return null;
}

const user = [
    {
        "username":"begin",
        "name":"Sam",
        "Birthday":"1-9-2000",
        "gender":"Male",
        "Sexuality":"Male",
        "bio":"This is the bio",
        "profile_picture":"https://res.cloudinary.com/dkctv74ue/image/upload/v1633950788/index_g5glv5.jpg",
        "location":"braam"
    }
]

// returns snapshot of database at a certain point
const matchesRequestMockUp = () =>{
    return {
        "success":"1",
        "count":1,
        "matchedWith":[
            {
                "Full_Name":"mudau",
                "Gender":"Male",
                "Sexuality":"Male",
                "Birthday":"22-9-2000",
                "E_mail":"mudau",
                "Location":"braam",
                "Profile_Picture":"https://res.cloudinary.com/dkctv74ue/image/upload/v1632771111/vme_zrsmto.jpg",
                "bio":"yo",
                "Interest_1":"Wine",
                "Interest_2":"Social Media",
                "Interest_3":"Pet Lover",
                "Interest_4":"Gardening",
                "Interest_5":"Cooking"
            }
        ]
    }
}


it('renders correctly', () => {
    const db = setUpDB();
    render(
        <BrowserRouter>
            <Chat user={null} db={db} setUser={null} setOtherUser={null} />
        </BrowserRouter>
    );
    const h1Element = screen.getByText(/Select a user to chat to on/i);
    expect(h1Element).toBeTruthy();
});

it('User B is on the matches list, when user A clicks on them, user A should be able to text user B', () => {
    const db = setUpDB();

    // get matches list
    const resultOfRequest = matchesRequestMockUp();
    const matchesList = resultOfRequest.matchedWith;

    // get first person matched with and simulate click from matches page
    const matchedWithUser = matchesList[0].E_mail;

    render(
        <BrowserRouter>
            <Chat user={user} db={db} setUser={null} otherUser={matchedWithUser} setOtherUser={null} isTest={true} />
        </BrowserRouter>
    );
    
    // matchedWithUser should be on the page header, indicates that I'm texting the correct person
    const otherPersonHeader = screen.getByText(`${matchedWithUser}`);
    expect(otherPersonHeader).toBeTruthy();
});