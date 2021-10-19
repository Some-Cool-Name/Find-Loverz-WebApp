import React from 'react';
import { render, screen, waitFor, fireEvent, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { BrowserRouter } from "react-router-dom"
import App from '../../App';
import renderer, { act } from 'react-test-renderer';

const server = setupServer(
    rest.get('https://lamp.ms.wits.ac.za/home/s1851427/loverzlog.php', (req, res, ctx) => {
      // Respond with a mocked user token that gets persisted
      // in the `sessionStorage` by the `Login` component.
      const testUsername = req.url.searchParams.get('username');
      const testPassword = req.url.searchParams.get('password');
      if( testUsername === 'demo' && testPassword ==='demo'){
        console.log("200 branch");
        return res( ctx.status(200), ctx.json(
            {login:[
                {username:"demo",
                name:"demo",
                Birthday:"10-05-1993",
                gender:"Male",
                Sexuality:"Female"
              }],
              success:"1",
              message:"success"}));
      }
      if( testUsername === 'demo' && testPassword ==='dem' ){
          console.log("400 branch");
        return res(
            ctx.status(400),
            ctx.json({login:[],success:"0",message:"Wrong Password"})
          );
      }

    }),
  )
  
  // Enable API mocking before tests.
  beforeAll(() => server.listen())
  
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
      server.resetHandlers();
    });
  afterEach(cleanup);
  
  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter>
        <App/>
    </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});
// given, when , then 
it('Login Inputs( email, password ) : Empty Fields Testing , Should return error ', async () => {

    // render or load login screen : now we have login screen displayed
    act( () => {
        render( 
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        );
    });
    
    const email = screen.getByPlaceholderText('Email...'); 
    act( () => {
        fireEvent.change(email, {target: {value: ''}});  // this are events that change states
    });
    await waitFor(() => { 
        expect(email.value).toBe('');
    });

    const password = screen.getByPlaceholderText('Password...');
    act( ()=> {
        fireEvent.change(password, {target: {value: ''}})
    });
    await waitFor(() => { 
        expect(password.value).toBe('');
    });

    const loginBtn = screen.getByText('Login');
    act( () => {
        fireEvent.click(loginBtn);
    });
    await waitFor(() => { 
        expect(loginBtn).toBeTruthy();
        expect(screen.getByText('email is a required field')).toBeTruthy();
        expect(screen.getByText('password is a required field')).toBeTruthy();

    });
    //expect(loginBtn).toBeTruthy();

});
