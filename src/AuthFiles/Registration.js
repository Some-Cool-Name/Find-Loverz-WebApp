import {React,useState,useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'



function Registration() {
    let history = useHistory();
    const [username,setUsername] = useState();
    const  [password,setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [name,setName] = useState();
    
    
    const registerUser = async (e)=>{
        try{
                e.preventDefault();
                if( password  && confirm && username && password===confirm && name){
                    console.log("equal")
                    const result = await fetch('https://lamp.ms.wits.ac.za/home/s1851427/webb.php?' + 
                    `username=${username}&password=${password}&name=${name}&gender=${"Male"}&birthday=${"2000-02-20"}&sexuality=${"female"}&location=${"braam"}`)
                    .then(res=>res.json())
                    console.log(result)
                    if(result === "success"){
                        history.push("/feed")
                    }
                    else {
                        //this user already exists
                    }
                } 
                else {
                    // display appropriate error
                    
                }
                


                
        }
        catch(error){

        }

    }

    
    return (
        <div className="registration">
            <h1>Register</h1>
            <form className="form" onSubmit={registerUser} >
                <label htmlFor="username"> Username</label>
                <input 
                id="username"
                onChange={e => setUsername(e.target.value)}

                 ></input>

                <label htmlFor="password"> Password</label>
                <input 
                id="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                ></input>

                <label htmlFor="confirmPassword"> Confirm password</label>
                <input 
                id="confirmPassword"
                type="password"
                onChange={e => setConfirm(e.target.value)}
                ></input>
            

                

                <label htmlFor="name"> name</label>
                <input 
                id="name"
                onChange={e => setName(e.target.value)}
                 ></input>

            

                <input type="submit" value="Register" />
            </form>

            
        </div>
    )
}
// link =https://lamp.ms.wits.ac.za/home/s1851427/webb.php?username=br4&password=brbr&name=vhugala&gender=male&birthday=2000-02-20&sexuality=female&location=braam
export default Registration
