import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Login from './AuthFiles/Login';
import Registration from './AuthFiles/Registration';
import Feed from './HomePageFiles/Feed';
import { getFromStorage } from './HelperClasses/StorageHandler';

// Component to hold and control all the apps pages
function App() {
  const [user, setUser] = useState(null);

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
        <Route path="/signup" component={Registration} />

        {/* Feed page */}
        <Route path="/feed" render={props => (
            <Feed setUser={setUser} user={user} />
        )} />

      </div>
    </Router>
  );
}

export default App;
