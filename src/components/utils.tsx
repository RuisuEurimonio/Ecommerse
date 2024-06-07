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
                timer: 1500,
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