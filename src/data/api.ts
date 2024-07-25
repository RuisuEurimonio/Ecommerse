import Swal from "sweetalert2";

const HOST = "http://localhost:8080/api/"

export async function getElementsApi(url : string){
    try{
        const response = await fetch(HOST+url+"/all");
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
        const response = await fetch(HOST+url+"/"+id);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    }catch(error){
        console.log("Error get element by id: "+error);
    }
}

export async function getElementsByFilterName(url : string, type: string, id: number){
    try{
        const response = await fetch(HOST+url+"/filter/"+type+"/"+id);
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
        const response = await fetch(HOST+"producto/order/"+order);
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
        const response = await fetch(HOST+`producto/search?sku=${value}&nombre=${value}`)
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
        const response = await fetch(`${HOST}${type}/update`, data);
        return response.ok;
    } catch(error){
        console.log("Error update element: "+error)
    }
}

export async function createElement(name: string, data: object){
    try{
        const response = await fetch(`${HOST}${name}/new`, data);
        return response.ok;
    } catch (error){
        console.log("Error create element: "+error)
    }
}

export async function deleteElement(name: string, id: number){
    try {
        await fetch(`${HOST}${name}/delete/${id}`, {method: 'DELETE'});
    } catch(error){
        console.log("Error deleting element: "+error);
    }
}

export async function login(data: Object){
    try {
        const response = await fetch(HOST+"usuario/login", data);
        const dataRes = await response.json();
        if(dataRes.status === 403){
            throw new Error("Invalid credentials: "+ dataRes.message)
        }
        return dataRes
    } catch (error){
        Swal.fire({
            title: "¡Ups!, ocurrio un problema.",
            text: "Por favor verifica las credenciales y vuelve a intentarlo \n"+error,
            icon: "error"
        })
    }
}