import React from 'react';
import 'regenerator-runtime/runtime';
import { BrowserRouter } from "react-router-dom"
import Profile from '../Profile';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const user = [
    {
        "username":"begin",
        "name":"Sam",
        "Birthday":"1-9-2000",
        "gender":"Male",
        "Sexuality":"Male",
        "bio":"This is the bio",
        "profile_picture":"https://res.cloudinary.com/dkctv74ue/image/upload/v1633950788/index_g5glv5.jpg",
        "location":"braam"
    }
]

it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter>
        <Profile user={user} setUser = {null}/>
    </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});




