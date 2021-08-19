import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Login from './AuthFiles/Login';
import Registration from './AuthFiles/Registration';
import Feed from './HomePageFiles/Feed';

// Component to hold and control all the apps pages
function App() {
   
  
  const [users, setUsers] = useState(null);
   


  return (
    <Router>
      <div className="App">

        {/* Login page */}
        <Route exact path="/" render={props => (
            <Login users={users} setUsers={setUsers}/>
        )} />

        {/* Registration page */}
        <Route path="/signup" component={Registration} />

        {/* Feed page */}
        <Route path="/feed" render={props => (
            <Feed users={users} />
        )} />


      </div>
    </Router>
  );
}

export default App;
