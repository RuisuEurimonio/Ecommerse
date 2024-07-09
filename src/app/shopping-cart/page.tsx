"use client"

import React, { useEffect, useState } from "react"

import dynamic from "next/dynamic";
import Link from "next/link";

import CardItem from "@/components/CardItem";
import PricePdf from "@/components/PricePdf";
import { confirmOrder, moneyFormatter } from "@/components/utils";

import { ArticleProps, UserProps } from "@/types/Props";
import DataNotFoundMessage from "@/components/DataNotFoundMessage";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod. PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  },
);

type ShoppingCartProps = {}

const ShoppingCart : React.FC<ShoppingCartProps> = () => {

    const [listOfItems, setListOfItems] = useState<{0: ArticleProps, 1: number}[]>([]);
    const [dataUser, setDataUser] = useState<UserProps | null>(null);
    const [totalBill, setTotalBill] = useState(0);
    const [totalDiscounts, setTotalDiscounts] = useState(0);
    const [sendPrice, setsendPrice] = useState(0);
    const [updateData, setUpdateData] = useState(false);
    const [observations, setObservations] = useState("");

    useEffect(()=>{
        const products = localStorage.getItem("products");
        const user = localStorage.getItem("user");
        setListOfItems(products ? JSON.parse(products) : [])
        setDataUser(user ? JSON.parse(user) : "");
        console.log(products ? JSON.parse(products) : [])
        setUpdateData(false);
        
    },[updateData])

    useEffect(()=>{
        getBillDeatils();
        getDiscounts();
        getSendPrice();
    },[listOfItems])

    function getBillDeatils(){
        let total = 0;
        listOfItems.forEach((item)=>{
            total += item[0].precio * item[1];
        })
        setTotalBill(total);
    }

    function getDiscounts(){
        let total = 0;
        listOfItems.forEach((item)=>{
            if (item[0].descuento){
                total += (item[0].precio * 0.14) * item[1]; //TODO: Implement with the real database data.
            }
        })
        setTotalDiscounts(total);
    }

    function getSendPrice(){
        setsendPrice(0); //TODO: Implement this function with the user data.
    }

    function updateLocalStorageData(){
        setUpdateData(true);
    }

    function onChangeText(event:any){
        const text : string = event.target.value;
        if(text.length < 200){
            setObservations(event.target.value);
        }
    }

    return(
        <div className="w-11/12 my-4 mx-auto flex gap-5 flex-col
        sm:divide-x sm:flex-row">
            <div className="sm:basis-3/4">
                <h2 className="font-bold text-lg"> Artículos </h2>
                <hr className="mt-4"/>
                {listOfItems.length == 0 ?
                <DataNotFoundMessage 
                    title="No tienes artículos en el carrito." 
                    text="Agrega algún artículo de nuestro catalogo." 
                    redirectLink="/products" 
                    redirectName="Articulos."/>
                :
                <div className="grid grid-cols-2 gap-5 my-4
                    sm:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6">
                    {listOfItems.map((item, index)=> {
                        return(
                            <Link href={`/products/${item[0].id}?name=${item[0].nombre}`} key={index}>
                                <CardItem item={item[0]} link="products" itemCart cantidad={item[1]} index={index} functionFather={updateLocalStorageData}/>
                            </Link>
                    )})}
                </div>
            }   
            </div>
            <div className="sm:basis-1/4">
                <div className="mx-auto my-2
                    sm:w-4/5 ">
                    <h2 className="font-bold text-lg"> Cliente. </h2>
                    <hr className="mt-4"/>
                    {dataUser ? 
                        <ul className="my-3">
                            <li> {dataUser?.tipoDocumento + " " + dataUser?.numeroDocumento}   </li>
                            <li> {dataUser?.nombres}   </li>
                            <li> {dataUser?.apellidos}   </li>
                            <li> {dataUser?.correo}   </li>
                            <li> {dataUser?.telefono}   </li>
                            <li> {dataUser?.direccion}   </li>
                        </ul>
                        :
                        <DataNotFoundMessage 
                            title="No has ingresado sesión"
                            text="Inicia sesión o crea una cuenta por medio del siguiente link para validar la información"
                            redirectLink="/authForm"
                            redirectName="Iniciar sesión"
                        />
                    }
                    {dataUser && <Link href="/my-account" className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center
                    lg:w-2/4"><button> Configurar </button></Link>}
                </div>
                <div className="mx-auto
                    sm:w-4/5">
                    <h2 className="font-bold text-lg"> Detalles. </h2>
                    <hr className="mt-4"/>
                    <ul className="my-3">
                        <li> Subtotal: {moneyFormatter(totalBill)}   </li>
                        <li> Descuentos: {moneyFormatter(totalDiscounts)}   </li>
                        <li> Envio: {moneyFormatter(sendPrice)}   </li>
                        <li className="my-3"> Total: {moneyFormatter(totalBill-totalDiscounts+sendPrice)}   </li>
                        <label htmlFor="observations">
                        Observaciones:
                        </label>
                        <textarea id="observations" className="border rounded-sm block w-full resize-none px-1" rows={4} value={observations} onChange={(e)=>(onChangeText(e))}/>
                    </ul>
                    <button className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center my-3
                        lg:w-2/4"
                            onClick={()=>{confirmOrder(totalBill, listOfItems.length)}}
                    > Confirmar. </button>
                    <PDFDownloadLink document={<PricePdf items={listOfItems} subtotal={totalBill} discounts={totalDiscounts} sendPrice={0} total={totalBill-totalDiscounts+sendPrice} observations={observations}/>} fileName="Cotización">
                    <button className="bg-blue-mafer text-white px-2 py-1 rounded-sm cursor-pointer block mx-auto w-3/4 text-center my-3
                        lg:w-2/4"> Generar cotización </button>
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;