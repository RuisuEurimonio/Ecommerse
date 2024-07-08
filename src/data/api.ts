export async function getElementsApi(url : string){
    try{
        const response = await fetch(url);
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
