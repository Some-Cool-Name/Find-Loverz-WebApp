import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Login from './AuthFiles/Login';
import Registration from './AuthFiles/Registration';
import Feed from './HomePageFiles/Feed';
import Matches from './HomePageFiles/Matches';
import Chat from './HomePageFiles/Chat';
import Search from './HomePageFiles/Search';
import Profile from './HomePageFiles/Profile';
import { getFromStorage } from './HelperClasses/StorageHandler';

// firebase
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';


// Component to hold and control all the apps pages
function App() {
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Your web app's Firebase configuration
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
      setDb(firebase.database());
    } catch (error) {
      // do nothing
    }
  }, [])

  const resetStateAfterReload = () => {
    try {
      const toBeUser = getFromStorage('user');
      if(toBeUser){
        setUser(toBeUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    resetStateAfterReload();
  }, [])


  return (
    <Router>
      <div className="App">

        {/* Login page */}
        <Route exact path="/" render={props => (
            <Login setUser={setUser} user={user} />
        )} />

        {/* Registration page */}
        <Route path="/signup" render={props => (
            <Registration setUser={setUser} user={user} />
        )} />

           {/* Search Results */}
           <Route path="/search" render={props => (
            <Search setUser={setUser} user={user} />
        )} />

        {/* Feed page */}
        <Route path="/feed" render={props => (
            <Feed setUser={setUser} user={user} setOtherUser={setOtherUser} />
        )} />

        {/* Matches page */}
        <Route path="/matches" render={props => (
            <Matches setUser={setUser} />
        )} />

        {/* Chat page */}
        <Route path="/chat" render={props => (
            <Chat user={user} db={db} setUser={setUser} otherUser={otherUser} setOtherUser={setOtherUser} />
        )} />

         {/* profile page */}
        <Route path="/profile" render={props => (
            <Profile setUser={setUser} user={user}/>
        )} /> 

      </div>
    </Router>
  );
}

export default App;
