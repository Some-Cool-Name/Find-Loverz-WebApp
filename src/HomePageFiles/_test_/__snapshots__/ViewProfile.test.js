import EditProfile from "../../EditProfile";
import {render,fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


const user = [
    {
        "username":"pepper",
        "name":"pigs",
        "Birthday":"1-9-2000",
        "gender":"Male",
        "Sexuality":"Male",
        "bio":"This is the bio",
        "profile_picture":"https://res.cloudinary.com/dkctv74ue/image/upload/v1633950788/index_g5glv5.jpg",
        "location":"braam"
    }
]
it('checkInterestRender',()=>{
    render(
        <BrowserRouter>
            <EditProfile user={null} setUser={null}></EditProfile>
        </BrowserRouter>

    );
    
})