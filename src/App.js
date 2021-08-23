import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Login from './AuthFiles/Login';
import Registration from './AuthFiles/Registration';
import Feed from './HomePageFiles/Feed';

// Component to hold and control all the apps pages
function App() {
  

  return (
    <Router>
      <div className="App">

        {/* Login page */}
        <Route exact path="/" render={props => (
            <Login  />
        )} />

        {/* Registration page */}
        <Route path="/signup" component={Registration} />

        {/* Feed page */}
        <Route path="/feed" component={Feed} />

      </div>
    </Router>
  );
}

export default App;
