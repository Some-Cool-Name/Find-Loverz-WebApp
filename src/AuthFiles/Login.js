import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
//import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { globalStyles } from '../globalStyles';
import { loginValidate } from './UserValidation';
import { loginRequest } from '../BackendRequests/Authentication';
import { saveToStorage } from '../HelperClasses/StorageHandler';
import isLoggedIn from '../HelperClasses/LoginChecker';

function Login({ setUser, user }) {
    let history = useHistory();
    const [incorrectDetails, setIncorrectDetails] = useState(false);
    const [error, setError] = useState(false);
    const incorrectDetailsString = "Incorrect username or password";
    const unknownError = "Oops, something went wrong. Please try again later";


    const loginUser = async (values) => {
        // validate user input
        try {
            const result = await loginRequest(values); 
            if(result.message === "success"){
                // extract user info from result
                const objArray = [];
                Object.keys(result).forEach(key => objArray.push({
                    name: key,
                    rating: result[key]
                }));
                const loggedInUser = [objArray[0].rating[0]];
                // login logistics
                saveToStorage('user', loggedInUser);
                setUser(loggedInUser);
                history.push("/feed"); 
            }
            else if(result.message === "Wrong Password" || result.message === "error"){
                // incorrect details
                setIncorrectDetails(true);
                setUser(false)
                 
            } 
        } catch (error) {
            // something went wrong
            setError(true);
        }   
    }


    // checks if user is logged and moves user to feed if logged in.
    if(isLoggedIn()) history.push('/feed');
    
    return (
        
        <div className='container'>
            <div className='header'>
                <h3 className='appName'>find loverz</h3>
             </div>
            <div  className='formLogin'>
                
                <Formik    
                    initialValues={{
                    email: '', 
                    password: '',
                    }}
                    validationSchema={loginValidate}
                    onSubmit={(values, actions) => {
                    actions.resetForm();
                    loginUser(values);
                    }}
                >
                    {
                        props => (
                            <div style={inputDivStyle}  >
                                <h1>Log in</h1>
                                <br />
                                <hr width="60px;"  size="8"></hr>
                                <br />
                                <label className='fieldDescription'><b>Email</b></label>
                                    
                                    <input
                                        className='inputBox'
                                        type="text" 
                                        placeholder="Email..." 
                                        style={globalStyles.inputStyle}
                                        onChange={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        value={props.values.email}                                                                  
                                    />
                                <p
                                    style={globalStyles.errorText}>
                                    {props.touched.email && props.errors.email}
                                </p>
                                 <br />
                                    <label className='fieldDescription'><b>Password</b></label>
                                    <input 
                                        type="password"
                                        required 
                                        placeholder="Password..." 
                                        style={globalStyles.inputStyle}
                                        onChange={props.handleChange('password')} 
                                        onBlur={props.handleBlur('password')}
                                        value={props.values.password}
                                        alt='Placeholder'
                                    />
                                <p
                                    style={globalStyles.errorText}>
                                    {props.touched.password && props.errors.password}
                                    {incorrectDetails && incorrectDetailsString}
                                    {error && unknownError}
                                </p>
                                 <br /> 
                                <Link className='button' to="/feed" style={globalStyles.button} onClick={props.handleSubmit} ><b>Login</b> </Link>
                                <Link to="/signup" >register</Link>
                            </div>
                        )
                    }
                </Formik>
            </div>
        </div> 
    )

}
const inputDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}
export default Login
