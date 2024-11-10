import { errorAction } from "@/components/utils";
import { UserProps } from "@/types/Props";
import CryptoJS from 'crypto-js';

export const saveCredentials = (token : string, user : UserProps, saveSession : boolean) => {

    const expiration = saveSession ? getExpiration() : "";

    const userData = encryptMethod(JSON.stringify(user));
    const tokenData = encryptMethod(JSON.stringify(token));

    console.log(token);

    if(userData && tokenData){
        document.cookie = `u=${encodeURIComponent(userData.toString())};${expiration}path=/;sameSite=Lax`;
        document.cookie = `t=${encodeURIComponent(tokenData.toString())};${expiration}path=/;sameSite=Lax`;
    }

}

function encryptMethod(data : Object | string){
    const KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    try{
        if(!KEY){
            throw new Error("La clave es nula");
        }
        const jsonObj = typeof(data) == "object" ? JSON.stringify(data) : data;
        const encryptedValue = CryptoJS.AES.encrypt(jsonObj, KEY);
        return encryptedValue;
    } catch (error){
        errorAction("Algo salio mal! "+error);
    }
}

function getCredentials(name : string){
    const namePath = `${name}=`;
    const cookies = document.cookie.split(';');
    for(let i = 0 ; i < cookies.length ; i++){
        let currentCookie = cookies[i];
        while (currentCookie.charAt(0) === ' ') currentCookie = currentCookie.substring(1, currentCookie.length);
        if(currentCookie.indexOf(namePath) === 0) return decodeURIComponent(currentCookie.substring(namePath.length, currentCookie.length));
    }
    return null;
}

export function getDataCookie(name : "t" | "u"){
    const KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    const encryptedValue = getCredentials(name);
    try{
        if(!encryptedValue) return null;
        if(!KEY){
            throw new Error("Algo salio mal.")
        }
        const bytes = CryptoJS.AES.decrypt(encryptedValue, KEY);
        const jsonValue = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(jsonValue);
    }catch(error){
        console.log(error);
    }

}

function getExpiration(){
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    return `expires=${date.toUTCString()}`;
}


export function deleteCookies(name : "u" | "t"){
    const data = getDataCookie(name);
    const dataEncrypt = encryptMethod(data);
    if(dataEncrypt){
        document.cookie = `${name}=${encodeURIComponent(dataEncrypt.toString())};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;sameSite=Lax`
    }
}

export function havePermission(){
    const data : UserProps | null | undefined = getDataCookie("u");
    const token = getDataCookie("t");
    if(data?.permisos?.id === 2 && token){
        return true;
    } else {
        return false
    }
}