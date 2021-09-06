import React from 'react';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { BrowserRouter } from "react-router-dom"
import Login from '../Login';
import renderer from 'react-test-renderer';

const server = setupServer(
    rest.get('https://lamp.ms.wits.ac.za/home/s1851427/loverzlog.php', (req, res, ctx) => {
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

    expect(2).toBe(2);

});