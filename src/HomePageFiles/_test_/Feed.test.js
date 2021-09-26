import React from 'react';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { BrowserRouter } from "react-router-dom"
import Feed from '../Feed';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter>
        <Feed/>
    </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});