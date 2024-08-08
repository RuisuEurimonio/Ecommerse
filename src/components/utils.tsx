import { createElement, deleteElement, updateElement } from '@/data/api';
import { deleteImageFromStorage, sendImageToAzureContainer } from '@/data/azure';
import { ArticleProps, PayMethodProps, UserProps } from '@/types/Props';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import React, {ReactNode} from 'react'
import Swal from 'sweetalert2';

type inputErrorTextProps = {
    children: ReactNode,
    modal?:boolean
}

export const InputErrorText : React.FC<inputErrorTextProps>  = ({ children, modal }) => {
    return (
        <p className={`text-sm text-red-500
            ${(!modal)?"lg:absolute lg:-right-4 lg:top-0 lg:-translate-x-[-100%] lg:max-w-[25vw]":"text-right"}
        `}>
            <span className="icon icon-alert"></span>{" "}
            {children}
        </p>
    );
};

export const saveAlert = async (name:string, data : any, file: string, customFunction?: ()=> void, customFunctionWithData?: (data:any)=> void): Promise<void> => {
    const response = await Swal.fire({
        title: `Guardar ${name}.`,
        text: `Desea guardar este ${name} con los datos ingresados?`,
        icon: "question",
        showCancelButton: true
    })
    
    if(response.isConfirmed){
        if("imagen" in data){
            data.imagen = await sendImageToAzureContainer(data.imagen);
        }

        const createResponse = await createElement(file,{
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let Toast = Swal;

        if(createResponse){
            Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: 4000,
                title: `${name} guardado.`
            })
        } else {
            Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "error",
                timer: 4000,
                title: `Algo salio mal`
            })
        }

        Toast.fire();
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(response);
    }
    
}

export const updateAlert = async (name:string, data: any, file: string, ownInfo?: boolean, customFunction?: ()=> void, customFunctionWithData?: (data: any)=>void ):Promise<void> => {
    
    const response = await Swal.fire({
        title: `Actualizar ${name}.`,
        text: `Desea actualizar con los datos ingresados?`,
        icon: "question",
        showCancelButton: true
    })
        
    if(response.isConfirmed){

        if("imagen" in data && "fileName" in data){
            const fullName = data.fileName as string;
            const fileName = fullName.split("images/")[1];
            const next = await deleteImageFromStorage(fileName);
            if(!next){
                errorAction("Algo salio mal, vuelve a intentarlo");
            }
            data.imagen = await sendImageToAzureContainer(data.imagen);
        }

        const updateResponse = await updateElement(file, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let Toast = Swal;
        if(updateResponse){
            Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: ownInfo ? 7000 : 4000,
                title: `${name} actualizado. ${ownInfo ? "\n Ingresa sesión de nuevo para ver los cambios." : ""}`
            })
        }  else {
            Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "error",
                timer: 4000,
                title: `Algo salio mal!`
            })
        }
        Toast.fire();
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data);
    } 
}

export const deleteAlert = <T extends {id: number, nombre?: string, nombres?: string}>(name:string, data: T, updateData: ()=>void) =>  {
    Swal.fire({
        title: `Eliminar ${data.nombre ?? data.nombres ?? "item"}`,
        text: `¿Estás seguro de eliminar a ${data.nombre ?? data.nombres ?? "item"}?`,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            let next = true;

            if("imagen" in data && data.imagen){
                let name : string = data.imagen as string;
                let fileName = name.split("images/")[1];
                deleteImageFromStorage(fileName).then((res)=>{
                    next = res as boolean;
                })
            }

            if(!next){
                errorAction("Algo salio mal, vuelve a intentarlo");
            }

            deleteElement(name, data.id).then(()=>{
                let Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1500,
                    title: `${data.nombre ?? data.nombres ?? "item"} eliminado`
                })
                Toast.fire();
                updateData();
            })
        }
    })
}

export const askForSaveProduct = (item:ArticleProps, cantidad: number = 1) =>{
    Swal.fire({
        title: "Guardar producto",
        text: "Deseas guardar el producto: " + item.nombre+" ?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Agregar",
        input: "text",
        inputLabel: "Cantidad de producto",
        inputValidator: (value) => {
            if(parseInt(value) < 1 || parseInt(value) > 100 || Number.isNaN(parseInt(value))){
                return "Agrega una cantidad del 1 al 100";
            }
        },
        inputValue: cantidad?? 1
    }).then((question)=>{
        if(question.isConfirmed){
            addToCart(item, question.value);
            let Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: 4000,
                title: `${item.nombre} guardado con cantidad ${question.value}.`
            })
            Toast.fire();
        }
    })
}

export const askForEditProduct = (item:ArticleProps, index: number, functionFather : () => void , cantidad?: number ) =>{

    let products = localStorage.getItem("products");
    let parseProducts : [ArticleProps, number][] = products ? JSON.parse(products) : [];

    Swal.fire({
        title: "Editar producto",
        text: "Editando articulo: " + item.nombre,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Editar",
        input: "text",
        inputLabel: "Cantidad de producto",
        inputValidator: (value) => {
            if(parseInt(value) < 1 || parseInt(value) > 100 || Number.isNaN(parseInt(value))){
                return "Agrega una cantidad del 1 al 100";
            }
        },
        inputValue: cantidad?? 1
    }).then((question)=>{
        if(question.isConfirmed){
            
            parseProducts[index][1] =  question.value;

            let Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: 4000,
                title: `${item.nombre} actualizado con cantidad ${question.value}.`
            })
            Toast.fire();
        }
        if(question.isDenied){
            parseProducts.splice(index);
        }

        localStorage.setItem("products", JSON.stringify(parseProducts));
        functionFather();
    })
}

export function addToCart(item:ArticleProps, cantidad: number){
    const products = localStorage.getItem("products");
    const currentProducts = products ? JSON.parse(products) : [];
    const itemWithCant = [item, cantidad];
    const listToAdd = [...currentProducts, itemWithCant];
    localStorage.setItem("products", JSON.stringify(listToAdd));
}

export function getCantOfUrlParams(searchParams : ReadonlyURLSearchParams) : number{

    const cant = searchParams.get("cant");
    console.log(cant)
    const res: string = cant !== null ? cant : "0";
    return parseInt(res);
}

export function moneyFormatter(number : number) : string{
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    })

    return formatter.format(number);
}

export function confirmOrder(total: number, cantOfItem: number){
    Swal.fire({
        title: "Confirmar pedido",
        text: `Confirmar pedido de ${cantOfItem} productos con un total de ${moneyFormatter(total)}`,
        icon: 'question',
        showCancelButton: true
    }).then((res)=>{
        if(res.isConfirmed){
            Swal.fire({
                title: "Pedido Confirmado.",
                text: "A continuación le llegara un correo con tota la información, gracias por la compra.",
                icon: "success"
            })
        }
    })
}

export function confirmAction(text: string, title?: string) : Promise<Boolean>{
    return Swal.fire({
        title: title ?? "¿Desea realizar esta acción?",
        text: text,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        return response.isConfirmed;
    })
    
}

export function errorAction(text: string, title?: string){
    Swal.fire({
        title: title ?? "Ups!, ha ocurrido un problema",
        text: text,
        icon: "error"
    })
}

export function successAction(text: string, title?: string){
    Swal.fire({
        title: title ?? "Se ha completado la acción con exito",
        text: text,
        icon: "success",
        showConfirmButton: true,
        timer: 2000
    })
}

export function closeSession(router : AppRouterInstance){
    localStorage.clear();
    sessionStorage.clear();
    router.push("/")
}

export function isOwnUserDataDelete(item : any) : boolean{
    let data = null;
    data = localStorage.getItem("user");
    if(!data){
        data = sessionStorage.getItem("user")
    }
    if(data === null){
        return false;
    }
    let parseData = JSON.parse(data);
    let userSessionData : UserProps = parseData["Usuario: "];
    return userSessionData.correo === item.correo;
}