import React,{useState, useEffect} from "react";
import HorizontalScroll from 'react-scroll-horizontal';
import { Link, useHistory } from 'react-router-dom';
import { search } from '../HelperClasses/search';
import { VscSearch } from "react-icons/vsc";
import FeedCard from './FeedCard';

export default function FeedRight({user, setUser}) {


  // fetching the feed
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchUsers = async (e) =>{
    const result = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAgetFeed.php?"+
    `username=${user[0].username}`
    );
    const data = await result.json();
    setUsers(data.feedProfiles);
  }

  const fetchAndSearch = async () =>{
    const result = await fetch("https://lamp.ms.wits.ac.za/home/s1851427/WDAgetFeed.php?"+
    `username=${user[0].username}`
    );
    const data = await result.json();
    setUsers( search(data.feedProfiles, searchText.toLowerCase()) );
  }
  
  useEffect(()=>{
      fetchUsers();
  },[]);

  const handleSearch = async () => {
    // console.log("searching");
    setSearchText("");
    if(searchText===""){
      fetchUsers();
      return;
    }
    fetchAndSearch();
  }

  // console.log("page loading");
   
  if(users.length === 0){
    return (
      <div>
      <div className = 'nav'></div>
      <div className = 'feedcontainer'>
      {/* <NavBar user={user} setUser={setUser}/> */}
      <div style={{marginTop: 10}} className = 'searchArea'>
        <div />
        <input style={{marginRight: 5}} 
          className = 'searchBar' 
          type="text" 
          placeholder="Search..." 
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          id="searchbyLocation"
        />
        {/* <VscSearch onClick={handleSearch}/> */}
        <button onClick={handleSearch}><VscSearch/></button>
      </div>
        <h2 style={{color:'gray', marginTop:50}} >
          No results, please try again later.
        </h2>
      </div>
      
    </div>
    )
  }

  return (
   <body>
      
      <div className = 'nav'></div>
      <div className = 'feedcontainer'>
          {/* <NavBar user={user} setUser={setUser}/> */}
          <div style={{marginTop: 10}} className = 'searchArea'>
            <div />
            <input style={{marginRight: 5}} 
              className = 'searchBar' 
              type="text" 
              placeholder="Search..." 
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              id="searchbyLocation"
            />
            
            <button className="btnSearch" onClick={handleSearch}><VscSearch/></button>
          </div>
         
          <div className="scroll-view">
            {users.map((otherUser) => {
              return <FeedCard userAccount={otherUser} fetchUsers={fetchUsers} user={user} />
            })}
          </div>
        
          
            
      </div>
    
   </body>
  );
}

