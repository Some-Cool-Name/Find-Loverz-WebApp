// sends json file of matched users
export const matchRequest = async (user) => {
    const resp = await fetch('https://lamp.ms.wits.ac.za/home/s1851427/WDAgetMatches.php?' + 
        `username=${user}`, {
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