import { ArticleProps } from '@/types/Props';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
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

export const saveAlert = (name:string):Promise<boolean> => {
    return Swal.fire({
        title: `Guardar ${name}.`,
        text: `Desea guardar este ${name} con los datos ingresados?`,
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            let Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: 4000,
                title: `${name} guardado.`
            })
            Toast.fire();
            return true;
        } else { return false}
    })
}

export const deleteAlert = (name:string, type:string) =>  {Swal.fire({
    title: `Eliminar ${type}`,
    text: `¿Estás seguro de eliminar al ${type}: ${name}?`,
    icon: "question",
    showCancelButton: true
}).then((response)=>{
    if(response.isConfirmed){
        let Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            icon: "success",
            timer: 1500,
            title: `${type} ${name} eliminado`
        })
        Toast.fire();
    }
})}

export const askForSaveProduct = (item:ArticleProps, cantidad?: number) =>{
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