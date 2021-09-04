import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import Feed from '../Feed';
//import Feed from '../Feed';

test('Renders no error', () => {
    render( 
        <BrowserRouter >
        <Feed />
        </BrowserRouter>
    );
    const btn = screen.getByText(/Feed/i);
    expect(btn).toBeTruthy();
});