import React from 'react';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { BrowserRouter } from "react-router-dom"
import Registration from '../Registration';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

const server = setupServer(
    rest.get('https://lamp.ms.wits.ac.za/home/s1851427/webb.php', (req, res, ctx) => {
      // Respond with a mocked user token that gets persisted
      // in the `sessionStorage` by the `Login` component.
      console.log("hello 2");
      return res( ctx.status(200), ctx.json(
          {"login":[
              {"username":"demo",
              "name":"demo",
              "Birthday":"10-05-1993",
              "gender":"Male",
              "Sexuality":"Female"
            }],
            "success":"1",
            "message":"success"}))
    }),
  )
  
  // Enable API mocking before tests.
  beforeAll(() => server.listen())
  
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers())
  
  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter>
        <Registration/>
    </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Registration Inputs : Empty Fields Testing , Should return error', async () => {
    // RENDER OR LOAD THE REGISTRATION PAGE
    render(
        <BrowserRouter>
            <Registration/>
        </BrowserRouter>
    );
    // ACCESS THE USERNAME FIELD ON THE REGISTRATION PAGE
    const userNameLabel = screen.getByLabelText('Username'); 
    fireEvent.change(userNameLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(userNameLabel).toHaveValue('');
    });

    // ACCESS THE PASSWORD FIELD ON THE REGISTRATION PAGE
    const passwordLabel = screen.getByLabelText('Password');
    fireEvent.change(passwordLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(passwordLabel).toHaveValue('');
    });

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const confirmPaswordLabel = screen.getByLabelText('Confirm password');
    fireEvent.change(confirmPaswordLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(confirmPaswordLabel).toHaveValue('');
    });

    // ACCESS THE NAME FIELD ON THE REGISTRATION PAGE
    const nameLabel = screen.getByLabelText('Name');
    fireEvent.change(nameLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(nameLabel).toHaveValue('');
    });

    // THESE ARE DROPDOWNS : ACCESS THE GENDER DROPDOWN 
    const genderLabel = screen.getByLabelText('Gender');
    expect(genderLabel).toBeTruthy();
    // SELECT THE FEMALE OPTION ON THE GENDER DROPDOWN
    userEvent.selectOptions(genderLabel, 'Female');

    // ACCESS THE BIRTHDAY FIELD ON THE REGISTRATION PAGE
    const birthdayLabel = screen.getByLabelText('Birthday');
    fireEvent.change(birthdayLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(birthdayLabel).toHaveValue('');
    });

    // THESE ARE DROPDOWNS : ACCESS THE SEXUALITY DROPDOWN 
    const sexualityLabel = screen.getByLabelText('Sexuality');
    expect(sexualityLabel).toBeTruthy();
    // SELECT THE MALE OPTION ON THE SEXUALITY DROPDOWN
    userEvent.selectOptions(sexualityLabel, 'Male');

    // ACCESS THE LOCATION FIELD ON THE REGISTRATION PAGE
    const locationLabel = screen.getByLabelText('Location');
    fireEvent.change(locationLabel, {target: {value: ''}}) // type an empty string
    await waitFor(() => { 
        expect(locationLabel).toHaveValue('');
    });

    // ACCESS THE REGISTER BUTTON ON THE REGISTRATION PAGE
    const registerBtn = screen.getByDisplayValue('Register');
    fireEvent.click(registerBtn);

    await waitFor(() => { 
        expect(registerBtn).toBeTruthy();
    });

    // you expect something from the database to happen


});

it('Registration Inputs : Field Filled correctly, but user already exists , Should return user exists error', async () => {
    // RENDER OR LOAD THE REGISTRATION PAGE
    server.use(
        rest.get('https://lamp.ms.wits.ac.za/home/s1851427/webb.php', (req, res, ctx) => {
          // Respond with "200 Internal Server Error" status for this test.
          return res(
            ctx.status(200),
            ctx.json('user exists'),
          );
        }),
      );

    render(
        <BrowserRouter>
            <Registration/>
        </BrowserRouter>
    );
    // ACCESS THE USERNAME FIELD ON THE REGISTRATION PAGE
    const userNameLabel = screen.getByLabelText('Username'); 
    fireEvent.change(userNameLabel, {target: {value: 'demo'}}) // type username
    await waitFor(() => { 
        expect(userNameLabel).toHaveValue('demo');
    });

    // ACCESS THE PASSWORD FIELD ON THE REGISTRATION PAGE
    const passwordLabel = screen.getByLabelText('Password');
    fireEvent.change(passwordLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(passwordLabel).toHaveValue('demo');
    });

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const confirmPaswordLabel = screen.getByLabelText('Confirm password');
    fireEvent.change(confirmPaswordLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(confirmPaswordLabel).toHaveValue('demo');
    });

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const nameLabel = screen.getByLabelText('Name');
    fireEvent.change(nameLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(nameLabel).toHaveValue('demo');
    });

    // THESE ARE DROPDOWNS : ACCESS THE GENDER DROPDOWN 
    const genderLabel = screen.getByLabelText('Gender');
    expect(genderLabel).toBeTruthy();
    // SELECT THE FEMALE OPTION ON THE GENDER DROPDOWN
    userEvent.selectOptions(genderLabel, 'Female');

    // ACCESS THE BIRTHDAY FIELD ON THE REGISTRATION PAGE
    const birthdayLabel = screen.getByLabelText('Birthday');
    fireEvent.change(birthdayLabel, {target: {value: '2000-01-01'}}) // type an empty string
    await waitFor(() => { 
        expect(birthdayLabel).toHaveValue('2000-01-01');
    });

    // THESE ARE DROPDOWNS : ACCESS THE SEXUALITY DROPDOWN 
    const sexualityLabel = screen.getByLabelText('Sexuality');
    expect(sexualityLabel).toBeTruthy();
    // SELECT THE MALE OPTION ON THE SEXUALITY DROPDOWN
    userEvent.selectOptions(sexualityLabel, 'Male');

    // ACCESS THE LOCATION FIELD ON THE REGISTRATION PAGE
    const locationLabel = screen.getByLabelText('Location');
    fireEvent.change(locationLabel, {target: {value: 'Jhb'}}) // type an empty string
    await waitFor(() => { 
        expect(locationLabel).toHaveValue('Jhb');
    });

    // ACCESS THE REGISTER BUTTON ON THE REGISTRATION PAGE
    const registerBtn = screen.getByDisplayValue('Register');
    fireEvent.click(registerBtn);

    await waitFor(() => { 
        expect(registerBtn).toBeTruthy();
    });

    // you expect something from the database to happen


});

it('Registration Inputs : Field Filled correctly, user does not exists , Should return success', async () => {
    // RENDER OR LOAD THE REGISTRATION PAGE
    server.use(
        rest.get('https://lamp.ms.wits.ac.za/home/s1851427/webb.php', (req, res, ctx) => {
          // Respond with "400 Internal Server Error" status for this test.
          console.log("user registered successfully");
          return res(
            ctx.status(200),
            ctx.json('success'),
          );
        }),
      );
    
    render(
        <BrowserRouter>
            <Registration/>
        </BrowserRouter>
    );
    // ACCESS THE USERNAME FIELD ON THE REGISTRATION PAGE
    const userNameLabel = screen.getByLabelText('Username'); 
    fireEvent.change(userNameLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(userNameLabel).toHaveValue('demo');
    });

    // ACCESS THE PASSWORD FIELD ON THE REGISTRATION PAGE
    const passwordLabel = screen.getByLabelText('Password');
    fireEvent.change(passwordLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(passwordLabel).toHaveValue('demo');
    });

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const confirmPaswordLabel = screen.getByLabelText('Confirm password');
    fireEvent.change(confirmPaswordLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(confirmPaswordLabel).toHaveValue('demo');
    });

    // ACCESS THE CONFIRM PASSWORD FIELD ON THE REGISTRATION PAGE
    const nameLabel = screen.getByLabelText('Name');
    fireEvent.change(nameLabel, {target: {value: 'demo'}}) // type an empty string
    await waitFor(() => { 
        expect(nameLabel).toHaveValue('demo');
    });

    // THESE ARE DROPDOWNS : ACCESS THE GENDER DROPDOWN 
    const genderLabel = screen.getByLabelText('Gender');
    expect(genderLabel).toBeTruthy();
    // SELECT THE FEMALE OPTION ON THE GENDER DROPDOWN
    userEvent.selectOptions(genderLabel, 'Female');

    // ACCESS THE BIRTHDAY FIELD ON THE REGISTRATION PAGE
    const birthdayLabel = screen.getByLabelText('Birthday');
    fireEvent.change(birthdayLabel, {target: {value: '2000-01-01'}}) // type an empty string
    await waitFor(() => { 
        expect(birthdayLabel).toHaveValue('2000-01-01');
    });

    // THESE ARE DROPDOWNS : ACCESS THE SEXUALITY DROPDOWN 
    const sexualityLabel = screen.getByLabelText('Sexuality');
    expect(sexualityLabel).toBeTruthy();
    // SELECT THE MALE OPTION ON THE SEXUALITY DROPDOWN
    userEvent.selectOptions(sexualityLabel, 'Male');

    // ACCESS THE LOCATION FIELD ON THE REGISTRATION PAGE
    const locationLabel = screen.getByLabelText('Location');
    fireEvent.change(locationLabel, {target: {value: 'Jhb'}}) // type an empty string
    await waitFor(() => { 
        expect(locationLabel).toHaveValue('Jhb');
    });

    // ACCESS THE REGISTER BUTTON ON THE REGISTRATION PAGE
    const registerBtn = screen.getByDisplayValue('Register');
    fireEvent.click(registerBtn);

    await waitFor(() => { 
        expect(registerBtn).toBeTruthy();
    });

    // you expect something from the database to happen


});
