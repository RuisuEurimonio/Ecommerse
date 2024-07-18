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

export async function getElementsByFilterName(url : string, id: number){
    try{
        const response = await fetch(url+"/"+id);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    } catch (error){
        console.log("Error get element by brand: "+error);
    }
}

export async function getElementsByOrder(order : "desc" | "asc"){
    try{
        const response = await fetch("http://localhost:8080/api/producto/order/"+order);
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = response.json();
        return data;
    } catch(error){
        console.log("Error get elements by order: "+error);
    }
}

export async function getElementsSearched(value : string) {
    try{
        const response = await fetch(`http://localhost:8080/api/producto/search?sku=${value}&nombre=${value}`)
        if(!response.ok){
            throw new Error("Network responses was not ok")
        }
        const data = response.json();
        return data;
    } catch(error){
        console.log("Error get elements searched: "+ error)
    }
}

export async function updateElement(type: string, data: any){
    try{
        const response = await fetch(`http://localhost:8080/api/${type}/update`, data);
        return response.ok;
    } catch(error){
        console.log("Error update element: "+error)
    }
}