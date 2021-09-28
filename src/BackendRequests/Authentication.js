// sends login request to backend
export const loginRequest = async (user) => {
    const resp = await fetch('https://lamp.ms.wits.ac.za/home/s1851427/WDAGet.php?' + 
        `username=${user.email}&password=${user.password}`, {
        method: 'GET',
    });
    if(resp.status === 200){
        const data = await resp.json();
        return data;
    }
    if(resp.status === 400){
        const data = await resp.json();
        return data;
    }
    console.log("error");
    return {error: 'Oops, something went wrong. Please try again later'};
}