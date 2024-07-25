import { createElement, deleteElement, updateElement } from '@/data/api';
import { ArticleProps } from '@/types/Props';
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
            {" "}
            <span className="icon icon-alert"></span>{" "}
            {children}{" "}
        </p>
    );
};

export const saveAlert = (name:string, data : any, file: string, customFunction : ()=> void):void => {
    Swal.fire({
        title: `Guardar ${name}.`,
        text: `Desea guardar este ${name} con los datos ingresados?`,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            createElement(file,{
                method: "POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response)=>{
                let Toast = Swal;
                if(response){
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
                customFunction();
            })
        }
    })
}

export const updateAlert = (name:string, data: any, file: string, customFunction : ()=> void):void => {
    Swal.fire({
        title: `Actualizar ${name}.`,
        text: `Desea actualizar con los datos ingresados?`,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            updateElement(file, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response)=>{
                let Toast = Swal;
                if(response){
                    Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        icon: "success",
                        timer: 4000,
                        title: `${name} actualizado.`
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
                customFunction();
            })  
        } 
    })
}

export const deleteAlert = <T extends {id: number, nombre: string}>(name:string, data: T, updateData: ()=>void) =>  {
    Swal.fire({
        title: `Eliminar ${data.nombre}`,
        text: `¿Estás seguro de eliminar a ${data.nombre}?`,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            deleteElement(name, data.id).then(()=>{
                let Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1500,
                    title: `${data.nombre} eliminado`
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