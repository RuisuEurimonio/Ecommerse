"use client"

import CardItem from "@/components/CardItem";
import PricePdf from "@/components/PricePdf";
import { confirmOrder, moneyFormatter } from "@/components/utils";
import { CardProductProps, UserProps } from "@/types/Props";
import Link from "next/link";
import React, { useEffect, useState } from "react"

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod. PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  },
);

type ShoppingCartProps = {}

const ShoppingCart : React.FC<ShoppingCartProps> = () => {

    const [listOfItems, setListOfItems] = useState<{0: CardProductProps, 1: number}[]>([]);
    const [dataUser, setDataUser] = useState<UserProps>();
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
            total += parseInt(item[0].precio) * item[1];
        })
        setTotalBill(total);
    }

    function getDiscounts(){
        let total = 0;
        listOfItems.forEach((item)=>{
            if (item[0].descuento){
                total += (parseInt(item[0].precio) * 0.14) * item[1]; //TODO: Implement with the real database data.
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
                <div className="flex justify-center flex-col h-full">
                    <h3 className="font-bold text-center text-lg"> No tienes artículos en el carrito </h3>
                    <p className="text-center"> Agrega algún artículo de nuestro catalogo. </p>
                    <Link href="/products"> <p  className="font-bold underline text-blue-700 text-center"> Articulos </p> </Link>
                </div>
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