import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import Registration from '../Registration';
import userEvent from '@testing-library/user-event'

test('Renders without error', () => {
    // RENDER OR LOAD THE REGISTRATION PAGE
    render(
        <BrowserRouter>
            <Registration/>
        </BrowserRouter>
    );
    // ACCESS THE USERNAME FIELD ON THE REGISTRATION PAGE
    const userNameLabel = screen.getByLabelText('Username'); 
    expect(userNameLabel).toBeTruthy();
    // TYPE A USERNAME AND CHECK IF THE USERNAME TEXT FIELD HAS THAT VALUE 
    userEvent.type(userNameLabel, 'Thando');
    expect(userNameLabel).toHaveValue('Thando');

    // ACCESS THE PASSWORD FIELD ON THE REGISTRATION PAGE
    const passwordLabel = screen.getByLabelText('Password');
    expect(passwordLabel).toBeTruthy();
    // TYPE A PASSWORD AND CHECK IF THE PASSWORD TEXT FIELD HAS THAT VALUE 
    userEvent.type(passwordLabel, '12345abc');
    expect(passwordLabel).toHaveValue('12345abc');

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const confirmPaswordLabel = screen.getByLabelText('Confirm password');
    expect(confirmPaswordLabel).toBeTruthy();
    // TYPE A CONFIRM PASSWORD AND CHECK IF THE CONFIRM PASSWORD TEXT FIELD HAS THAT VALUE 
    userEvent.type(confirmPaswordLabel, '12345abc');
    expect(confirmPaswordLabel).toHaveValue('12345abc');

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const nameLabel = screen.getByLabelText('Name');
    expect(nameLabel).toBeTruthy();
    // TYPE A NAME AND CHECK IF THE NAME TEXT FIELD HAS THAT VALUE 
    userEvent.type(nameLabel, 'Noluthando');
    expect(nameLabel).toHaveValue('Noluthando');

    // THESE ARE DROPDOWNS : ACCESS THE GENDER DROPDOWN 
    const genderLabel = screen.getByLabelText('Gender');
    expect(genderLabel).toBeTruthy();
    // SELECT THE FEMALE OPTION ON THE GENDER DROPDOWN
    userEvent.selectOptions(genderLabel, 'Female');

    // ACCESS THE BIRTHDAY FIELD ON THE REGISTRATION PAGE
    const birthdayLabel = screen.getByLabelText('Birthday');
    expect(birthdayLabel).toBeTruthy();
    // TYPE A BIRTHDAY DATE AND CHECK IF THE BIRTHDAY TEXT FIELD HAS THAT VALUE 
    userEvent.type(birthdayLabel, '01-01-2000');
    expect(birthdayLabel).toHaveValue('01-01-2000');

    // THESE ARE DROPDOWNS : ACCESS THE SEXUALITY DROPDOWN 
    const sexualityLabel = screen.getByLabelText('Sexuality');
    expect(sexualityLabel).toBeTruthy();
    // SELECT THE MALE OPTION ON THE SEXUALITY DROPDOWN
    userEvent.selectOptions(sexualityLabel, 'Male');

    // ACCESS THE LOCATION FIELD ON THE REGISTRATION PAGE
    const locationLabel = screen.getByLabelText('Location');
    expect(locationLabel).toBeTruthy();
    // TYPE A LOCATION DATE AND CHECK IF THE LOCATION TEXT FIELD HAS THAT VALUE 
    userEvent.type(locationLabel, 'Johannesburg');
    expect(locationLabel).toHaveValue('Johannesburg');

    // ACCESS THE REGISTER BUTTON ON THE REGISTRATION PAGE
    const registerBtn = screen.getByDisplayValue('Register');
    expect(registerBtn).toBeTruthy();
    // CLICK THE REGISTER BUTTON
    userEvent.click(registerBtn);
    //should not go to feed page, Why? because user already exists
    expect(screen.queryByText(/Feed/)).toBeFalsy();


});
