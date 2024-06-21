import { CardProductProps } from '@/types/Props';
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

export const askForSaveProcduct = (item:CardProductProps, cantidad?: number) =>{
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
        inputValue: cantidad?? 0
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

export function addToCart(item:CardProductProps, cantidad: number){
    const products = localStorage.getItem("products");
    const currentProducts = products ? JSON.parse(products) : [];
    const itemWithCant = [item, cantidad];
    const listToAdd = [...currentProducts, itemWithCant];
    localStorage.setItem("products", JSON.stringify(listToAdd));
}