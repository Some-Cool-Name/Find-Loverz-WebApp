import React from 'react';
import 'regenerator-runtime/runtime';
import { BrowserRouter } from "react-router-dom"
import Profile from '../Profile';
import { render, screen, waitFor, fireEvent, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';


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

it('Profile Inputs( name, location, bio, interests, profile picture ) : Empty Fields Testing , Should return error ', async () => {

    // render or load Update profile  screen : now we have Update profile screen displayed
    act( () => {
        render( 
        <BrowserRouter>
            <Profile user={user} setUser = {null}/>
        </BrowserRouter>
        );
    });
    
    const name = screen.getByPlaceholderText('name'); 
    act( () => {
        fireEvent.change(name, {target: {value: ''}});  // this are events that change states
    });
    await waitFor(() => { 
        expect(name.value).toBe('');
    });

    const location = screen.getByPlaceholderText('location');
    act( ()=> {
        fireEvent.change(location, {target: {value: ''}})
    });
    await waitFor(() => { 
        expect(location.value).toBe('');
    });

    const bio = screen.getByPlaceholderText('bio');
    act( ()=> {
        fireEvent.change(bio, {target: {value: ''}})
    });
    await waitFor(() => { 
        expect(bio.value).toBe('');
    });

    const UpdateBtn = screen.getByText('Update');
    act( () => {
        fireEvent.click(UpdateBtn);
    });
    await waitFor(() => { 
        expect(UpdateBtn).toBeTruthy();

    });

});

it('Profile Inputs( name, location, bio, interests, profile picture ) : Correct Inputs Testing , Should not return error ', async () => {

    // render or load Update profile  screen : now we have Update profile screen displayed
    act( () => {
        render( 
        <BrowserRouter>
            <Profile user={user} setUser = {null}/>
        </BrowserRouter>
        );
    });
    
    const name = screen.getByPlaceholderText('name'); 
    act( () => {
        fireEvent.change(name, {target: {value: 'Thando'}});  // this are events that change states
    });
    await waitFor(() => { 
        expect(name.value).toBe('Thando');
    });

    const location = screen.getByPlaceholderText('location');
    act( ()=> {
        fireEvent.change(location, {target: {value: 'Braam'}})
    });
    await waitFor(() => { 
        expect(location.value).toBe('Braam');
    });

    const bio = screen.getByPlaceholderText('bio');
    act( ()=> {
        fireEvent.change(bio, {target: {value: 'This is my bio'}})
    });
    await waitFor(() => { 
        expect(bio.value).toBe('This is my bio');
    });

    const UpdateBtn = screen.getByText('Update');
    act( () => {
        fireEvent.click(UpdateBtn);
    });
    await waitFor(() => { 
        expect(UpdateBtn).toBeTruthy();

    });

});

it('Profile Inputs( interests ) : Correct Inputs Testing , Should not return error ', async () => {

    act( () => {
        render( 
        <BrowserRouter>
            <Profile user={user} setUser = {null}/>
        </BrowserRouter>
        );
    });


    const chooseInterests = screen.getByText('Choose Interests');
    act( () => {
        fireEvent.click(chooseInterests);
    });
    await waitFor(() => { 
        expect(screen.getByText('Choose Five Interests')).toBeTruthy();

    });
    const interest1 = screen.getByText('Photography');
    act( () => {
        fireEvent.click(interest1);
    });

    act( () => {
        fireEvent.click(interest1);
    });

    act( () => {
        fireEvent.click(interest1);
    });
    const interest2 = screen.getByText('Shopping');
    act( () => {
        fireEvent.click(interest2);
    });
    const interest3 = screen.getByText('Baking');
    act( () => {
        fireEvent.click(interest3);
    });
    const interest4 = screen.getByText('Comedy');
    act( () => {
        fireEvent.click(interest4);
    });
    const interest5 = screen.getByText('Cooking');
    act( () => {
        fireEvent.click(interest5);
    });

    const close = screen.getByText('Close')
    act( () => {
        fireEvent.click(close);
    });

    const UpdateBtn = screen.getByText('Update');
    act( () => {
        fireEvent.click(UpdateBtn);
    });
    await waitFor(() => { 
        expect(UpdateBtn).toBeTruthy();

    });
});




