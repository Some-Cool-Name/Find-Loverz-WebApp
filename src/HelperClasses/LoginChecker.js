import { getFromStorage } from "./StorageHandler";

export default function isLoggedIn() {
    const user = getFromStorage('user');
    if(user){
        return true;
    }
    return false;
}