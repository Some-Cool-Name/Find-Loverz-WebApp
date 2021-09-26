import React from 'react';
import NavBar from './NavBar';

export default function Matches({ setUser }) {
    return (
        <div>
            <h1>Matches page</h1>
            <NavBar setUser={setUser} />
        </div>
    )
}
