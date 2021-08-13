import React from 'react'

function Login() {
    return (
        <div>
            <div style={inputDivStyle} >
                <input type="text" placeholder="Email..." style={inputStyle} ></input>
                <input type="password" placeholder="Password..." style={inputStyle} ></input>
            </div>
            <button>login</button>
        </div>
    )
}

const inputDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}
const inputStyle = {
    marginTop: '10px'
}

export default Login
