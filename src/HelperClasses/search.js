export const search = (users, input) => {
    let list = [];
    for(let i = 0; i<users.length;i++){
        let userAccount = users[i];
        if(userAccount.Location.toLowerCase()===input){
            list.push(userAccount);
        }
        if(userAccount.Interest_1.toLowerCase()===input || userAccount.Interest_2.toLowerCase()===input || userAccount.Interest_3.toLowerCase()===input){
            list.push(userAccount);
        }
        if(userAccount.Interest_4.toLowerCase()===input || userAccount.Interest_5.toLowerCase()===input){
            list.push(userAccount);
        }
    }
    
    return list;
}