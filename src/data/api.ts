export async function getUsersApi(){
    try{
        const response = await fetch("http://localhost:8080/api/usuario/all");
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.log("error: "+error);
        return null;
    }
}