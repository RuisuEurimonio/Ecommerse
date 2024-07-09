export async function getElementsApi(url : string){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.log("error get elements: "+error);
        return null;
    }
}

export async function getElementByIdApi(url : string, id: number){
    try{
        const response = await fetch(url+"/"+id);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    }catch(error){
        console.log("Error get element by id: "+error);
    }
}
