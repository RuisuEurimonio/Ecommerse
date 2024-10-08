import { errorAction } from "@/components/utils";
import credential from "./credentials";
import { throws } from "assert";
import { getDataCookie } from "@/auth/security";

const HOST = credential.getHostDB();

export async function getElementsApi(url : string){
    try{
        const response = await fetch(HOST+url+"/all");
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch(error){
        errorAction("Se ha presentado un error oobteniendo "+url+", vuelvelo a intentar: \n" + error)
        return null;
    }
}


export async function getElementsByFilter(url : String){
    try{
        const response = await fetch(HOST+url);
        if(!response.ok){
            throw new Error("Network responses was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error){
        errorAction("Se ha presentado un error oobteniendo "+url+", vuelvelo a intentar: \n" + error);
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
        errorAction("Se ha presentado un error oobteniendo "+url+", vuelvelo a intentar: \n" + error);
        return null
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
        errorAction("Se ha presentado un error oobteniendo "+url+", vuelvelo a intentar: \n" + error)
        return null;
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
        errorAction("Se ha presentado un error oobteniendo datos con orden "+order+", vuelvelo a intentar: \n" + error);
        return null;
    }
}

export async function getElementsSearched(value : string) {
    try{
        const response = await fetch(HOST+`producto/search?sku=${value}&nombre=${value}`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    } catch(error){
        errorAction("Se ha presentado un error oobteniendo dato buscando con "+value+", vuelvelo a intentar: \n" + error);
        return null;
    }
}

export async function updateElement(type: string, data: any){
    try{
        const response = await fetch(`${HOST}${type}/update`, data);
        return response.ok;
    } catch(error){
        errorAction("Se ha presentado un error actualizando "+type+", vuelvelo a intentar: \n" + error)
        return false;
    }
}

export async function createElement(name: string, data: object){
    try{
        const response = await fetch(`${HOST}${name}/new`, data);
        if(!response.ok){
            throw new Error(await response.json())
        }
        const dataRes = await response.json();
        return dataRes;
    } catch (error){
        errorAction("Se ha presentado un error creando "+name+", vuelvelo a intentar: \n" + error)
        return null;
    }
}

export async function deleteElement(name: string, id: number){
    try {
        await fetch(`${HOST}${name}/delete/${id}`, {method: 'DELETE'});
    } catch(error){
        errorAction("Se ha presentado un error eliminando "+name+", vuelvelo a intentar: \n" + error);
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
        errorAction("Por favor verifica las credenciales y vuelve a intentarlo \n"+error);
        return null;
    }
}

export async function verifyPassword(correo : string,  contrasena: string): Promise<boolean> {
    try{
        const body = {correo: correo,contrasena: contrasena};
        const response = await fetch("http://localhost:8080/api/usuario/verify-password", 
            {method: 'POST', 
             headers: {'content-type': 'application/json'}, 
             body: JSON.stringify(body)}
        )
        if(!response.ok){
            throw new Error("Credenciales invalidas.");
        }
       return response.json();
    } catch(error){
        errorAction("Por favor verifica los datos y vuelvelo a intentar: \n" + error)
        return false
    }
}

export async function validateEmail(correo: string) : Promise<Boolean>{
    try{
        const response = await fetch(HOST+"usuario/search/correo/"+correo);
        return await response.json() !== null;
    }catch(error){
        throw new Error("Se ha presentado un error validando el correo "+correo+"\n" +error);
    }
}

export async function sendMessageRecoveryPassword(email: {}){
    try{
        const response = await fetch(HOST+"usuario/forgot-password",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(email)
        });
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
    } catch (error){
        errorAction("Se ha presentado un error enviando mensaje de restablecimiento, vuelvelo a intentar" + error);
        return null;
    }
}

export async function sendNewPassword(contrasena : string, token: string) : Promise<Boolean>{
    try{
        const response = await fetch(HOST+"usuario/reset-password?token="+token,{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({password:contrasena, newPassword:contrasena})
        })
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return true;
    }catch(error){
        errorAction("Se ha presentado un error actualizando la contraseña, vuelvelo a intentar: \n" + error)
        return false;
    }
}