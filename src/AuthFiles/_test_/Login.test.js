  
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import Login from '../Login';

test('Renders without error', () => {
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    const btn = screen.getByText(/Login/i);
    const register = screen.getByText(/Register/i);
    expect(btn).toBeTruthy();
    expect(register).toBeTruthy();
});