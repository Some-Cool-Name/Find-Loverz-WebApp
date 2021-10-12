import ProfilePreview from "../../ProfilePreview";
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
it('viewName',()=>{
   const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
   const name = queryByTitle("name");
   expect(name.innerHTML).toBe("pigs")
        
    
    
    
})
it('viewInterestOne',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("intOne");
    expect(name.innerHTML).toBe("Golf")
         
     
     
     
 })

 it('viewInterestTwo',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("intTwo");
    expect(name.innerHTML).toBe("Gym")
         
     
     
     
 })
 it('viewInterestThree',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("intThree");
    expect(name.innerHTML).toBe("Pet Lover")
         
     
     
     
 })
 it('viewInterestFour',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("intFour");
    expect(name.innerHTML).toBe("Spirituality")
         
     
     
     
 })
 it('viewInterestFive',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("intFive");
    expect(name.innerHTML).toBe("Vlogging")
         
     
     
     
 })
 /*it('viewBio',()=>{
    const {queryByTitle} = render(<ProfilePreview></ProfilePreview>)
    const name = queryByTitle("previewBio");
    expect(name.innerHTML).toBe("lllll")
         
     
     
     
 })*/