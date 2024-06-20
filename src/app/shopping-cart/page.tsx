"use client"

import { UserProps } from "@/types/Props";
import Link from "next/link";
import { useEffect, useState } from "react"

type ShoppingCartProps = {}

const ShoppingCart : React.FC<ShoppingCartProps> = () => {

    const [listOfItems, setListOfItems] = useState([]);
    const [dataUser, setDataUser] = useState<UserProps>();

    useEffect(()=>{
        const products = localStorage.getItem("products");
        const user = localStorage.getItem("user");
        setListOfItems(products ? JSON.parse(products) : [])
        setDataUser(user ? JSON.parse(user) : "");
    },[])

    return(
        <div className="w-11/12 my-4 mx-auto flex gap-5 flex-col
        sm:divide-x sm:flex-row">
            <div className="sm:basis-3/4">
                <h2 className="font-bold text-lg"> Artículos </h2>
                <hr className="mt-4"/>
                {listOfItems.length == 0 ?
                <div className="flex justify-center flex-col h-full">
                    <h3 className="font-bold text-center text-lg"> No tienes articulos en el carrito </h3>
                    <p className="text-center"> Agrega asmún artículo de nuestro catalogo. </p>
                    <Link href="/products"> <p  className="font-bold underline text-blue-700 text-center"> Articulos </p> </Link>
                </div>
                :
                <h3> Tienes articulos en el carrito </h3>
            }   
            </div>
            <div className="sm:basis-1/4">
                <div className="mx-auto my-2
                    sm:w-4/5 ">
                    <h2 className="font-bold text-lg"> Cliente. </h2>
                    <hr className="mt-4"/>
                    <ul className="my-3">
                        <li> {dataUser?.tipoDocumento ?? "Error" + " " + dataUser?.numeroDocumento ?? ""}   </li>
                        <li> {dataUser?.nombres ?? "Error"}   </li>
                        <li> {dataUser?.apellidos ?? "Error"}   </li>
                        <li> {dataUser?.correo ?? "Error"}   </li>
                        <li> {dataUser?.telefono ?? "Error"}   </li>
                        <li> {dataUser?.direccion ?? "Error"}   </li>
                    </ul>
                    <Link href="/my-account" className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center
                    lg:w-2/4"><button> Configurar </button></Link>
                </div>
                <div className="mx-auto
                    sm:w-4/5">
                    <h2 className="font-bold text-lg"> Detalles. </h2>
                    <hr className="mt-4"/>
                    <ul className="my-3">
                        <li> Subtotal: {"$"}   </li>
                        <li> Descuentos: {"$"}   </li>
                        <li> Envio: {"$"}   </li>
                        <li className="my-3"> Total: {"$"}   </li>
                    </ul>
                    <Link href="/my-account" className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center
                    lg:w-2/4"><button> Confirmar </button></Link>
                    <button className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center my-3
                    lg:w-2/4"> Generar cotización </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;