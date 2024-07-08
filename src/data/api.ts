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

export async function getArticlesApi(){
    try{
        const response = await fetch("http://localhost:8080/api/producto/all");
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("error: "+error);
        return null
    }
}

export async function getBrandsApi(){
    try{
        const response = await fetch("http://localhost:8080/api/producto/marca/all");
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.log("Error: "+ error);
    }
}