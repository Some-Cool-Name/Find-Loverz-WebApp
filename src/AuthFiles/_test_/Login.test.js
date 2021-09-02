import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { BrowserRouter } from "react-router-dom"
import Login from '../Login';
import userEvent from '@testing-library/user-event';
import { act, isElementOfType } from "react-dom/test-utils";
import renderer from 'react-test-renderer';



const server = setupServer(
    rest.get('https://lamp.ms.wits.ac.za/home/s1851427/loverzlog.php', (req, res, ctx) => {
      // Respond with a mocked user token that gets persisted
      // in the `sessionStorage` by the `Login` component.
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
        <Login/>
    </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});

// given, when , then 
it('Login Inputs( email, password ) : Empty Fields Testing , Should return error ', () => {

    // render or load login screen : now we have login screen displayed
    render( 
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    
    const email = screen.getByPlaceholderText('Email...'); 
    userEvent.type(email, '');
    expect(email).toHaveValue('');


    const password = screen.getByPlaceholderText('Password...'); 
    userEvent.type(password, '');
    expect(password).toHaveValue('');

    const loginBtn = screen.getByText('Login');
    userEvent.click(loginBtn);

    expect(loginBtn).toBeTruthy();

});

it('Login Inputs( email, password ) : invalid email and pasword , Should return error ', async () => {

    server.use(
        rest.get('https://lamp.ms.wits.ac.za/home/s1851427/loverzlog.php', (req, res, ctx) => {
          // Respond with "400 Internal Server Error" status for this test.
          
          return res(
            ctx.status(400),
            ctx.json({ message: 'Invalid details' }),
          )
        }),
      );
    // render or load login screen : now we have login screen displayed
    render( 
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    
    const email = screen.getByPlaceholderText('Email...'); 
    userEvent.type(email, 'Martha');
    expect(email).toHaveValue('Martha');

    const password = screen.getByPlaceholderText('Password...'); 
    userEvent.type(password, '12345678');
    expect(password).toHaveValue('12345678');

    const loginBtn = screen.getByText('Login');
    userEvent.click(loginBtn);

    expect(loginBtn).toBeTruthy();

});
  

it('Login Inputs( email, password ) : valid email and pasword , Should go to feed page ', () => {

    // render or load login screen : now we have login screen displayed
    render( 
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    
    const email = screen.getByPlaceholderText('Email...'); 
    userEvent.type(email, 'demo');
    expect(email).toHaveValue('demo');


    const password = screen.getByPlaceholderText('Password...'); 
    userEvent.type(password, 'demo');
    expect(password).toHaveValue('demo');

    const loginBtn = screen.getByText('Login');
    userEvent.click(loginBtn);

    expect(loginBtn).toBeTruthy();

});