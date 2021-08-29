import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import './Login.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { globalStyles } from '../globalStyles';
import { loginValidate } from './UserValidation';
import { loginRequest } from '../BackendRequests/Authentication';
import { saveToStorage, getFromStorage } from '../HelperClasses/StorageHandler';

function Login({ setUser, user }) {
    let history = useHistory();
    const [incorrectDetails, setIncorrectDetails] = useState(false);
    const [error, setError] = useState(false);
    const incorrectDetailsString = "Incorrect username or password";
    const unknownError = "Oops, something went wrong. Please try again later";

    useEffect(() => {
        try {
           const user = getFromStorage('user');
           if(user){
                setUser(user);
                history.push('/feed');
           } 
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loginUser = async (values) => {
        // validate user input
        try {
            const result = await loginRequest(values); 
            if(result.message === "success"){
                const objArray = [];
                Object.keys(result).forEach(key => objArray.push({
                    name: key,
                    rating: result[key]
                }));
                const loggedInUser = [objArray[0].rating[0]];
                saveToStorage('user', loggedInUser);
                history.push("/feed");
                setUser(loggedInUser);  
            }
            else if(result.message === "Wrong Password"){
                // incorrect details
                setIncorrectDetails(true);
                setUser(false)
                 
            } 
        } catch (error) {
            // something went wrong
            setError(true);
        }   
    } 
    return (
        
        <div className='container'>
            <div className='header'>
                <h3 className='appName'>find loverz</h3>
             </div>
            <div  className='form'>
                
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
                                <hr width="60px;"  size="8"></hr>
                                <label className='fieldDescription'><b>Email</b></label>
                                    
                                    <input
                                        className='inputBox'
                                        required
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
