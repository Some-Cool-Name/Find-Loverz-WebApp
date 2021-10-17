import {render, fireEvent} from "@testing-library/react";
import NavBar from "../NavBar.js"
import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
//

test("testing if it renders and buttons", () =>{
    
    const component = renderer.create(
        <StaticRouter location="../.js" context={<NavBar />}>
            <Link to="../Profile.js">profile</Link>
        </StaticRouter>

    
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});

