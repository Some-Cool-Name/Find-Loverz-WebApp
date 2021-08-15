import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { globalStyles } from '../globalStyles';
import { loginValidate } from './UserValidation';
import { loginRequest } from '../BackendRequests/Authentication';

function Login() {
    let history = useHistory();
    const [incorrectDetails, setIncorrectDetails] = useState(false);
    const [error, setError] = useState(false);
    const incorrectDetailsString = "Incorrect username or password";

    const loginUser = async (values) => {
        // validate user input
        try {
            const result = await loginRequest(values);
            if(result.message === "success"){
                history.push("/feed");
            }
            else if(result.message === "Wrong Password"){
                // incorrect details
                setIncorrectDetails(true);
            } 
        } catch (error) {
            // something went wrong
            setError(true);
        }
        
    }

    return (
        <div>
            
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
                            <div style={inputDivStyle} >
                                <input 
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
                                <input 
                                    type="password" 
                                    placeholder="Password..." 
                                    style={globalStyles.inputStyle}
                                    onChange={props.handleChange('password')} 
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}
                                />
                                <p
                                    style={globalStyles.errorText}>
                                    {props.touched.password && props.errors.password}
                                    {incorrectDetails && incorrectDetailsString}
                                    {error && "Oops, something went wrong. Please try again later"}
                                </p>
                                <Link to="/feed" style={globalStyles.button} onClick={props.handleSubmit} >Login</Link>
                                <Link to="/signup" >register</Link>
                            </div>
                        )
                    }
                </Formik>
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
