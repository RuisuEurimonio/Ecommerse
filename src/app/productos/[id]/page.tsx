import React from "react";
import {CardProductProps} from "@/types/Props"
import productsFake from "@/utils/json/productsFake.json"
import HistoryNavigation from "@/components/HistoryNavigation";
import Clasificaciones from "@/components/Clasficaciones";
import image from "@/assets/img/imageNotFound.jpg"
import Image from "next/image";

const ProductPage : React.FC<CardProductProps> = ({params}:any) => {

    const data = productsFake.find((item)=> item.id === parseInt(params.id))

    const navigation= [
        {"names":"Productos","url":"/productos"},
        {"names":data?.nombre ?? "Not found","url":"/productos/"+(data?.id ?? "")}
    ]

    return (
        <div className="w-11/12 m-auto
            md:w-4/5
        ">
            <HistoryNavigation items={navigation}/>

            <Clasificaciones/>

            <div className="flex w-full my-4 flex-col-reverse gap-2">

                <div className="basis-5/12 border-2"> 
                    <div>
                        <Image className="w-3/4 m-auto mt-2 rounded-sm" src={image} alt={data?.descripcion ?? "Description product not found"}></Image>
                        <ul className="grid grid-cols-4 m-1 gap-1">
                            <li><Image src={image} alt={data?.descripcion ?? ""}></Image></li>
                            <li><Image src={image} alt={data?.descripcion ?? ""}></Image></li>
                            <li><Image src={image} alt={data?.descripcion ?? ""}></Image></li>
                            <li><Image src={image} alt={data?.descripcion ?? ""}></Image></li>
                        </ul>
                    </div>
                </div>

                <div className="basis-5/12 border-2 p-2 rounded-sm"> 
                    <div className="flex text-sm justify-between">
                        <p>{data?.categoria ?? "Not found" }</p>
                        <p> SKU: {data?.SKU ?? "Not found"}</p>
                    </div>
                    <h3 className="text-red-mafer uppercase font-bold text-lg"> {data?.nombre ?? "Not found"} </h3>
                    <ul className="flex flex-row text-sm"> 
                        <li> ⭐⭐⭐⭐⭐ </li>
                    </ul>
                    <h4 className="my-2 text-red-mafer font-bold text-2xl"> {data?.precio ?? "Not found"}  </h4>
                    <p className="my-2"> {data?.descripcion} </p>
                    <div className="flex justify-around items-center flex-col gap-2 ">
                        <div className="grid grid-cols-3 border-2 divide-x-2 font-bold rounded-lg">
                            <button className="w-7 text-xl h-full"> - </button>
                            <button className="w-7 h-full"> 0 </button>
                            <button className="w-7 text-xl h-full"> + </button>
                        </div>
                        <div className="border-2 rounded-lg px-1 bg-red-mafer text-blue-mafer text-base">
                            <button className="h-full w-full uppercase"> Agregar al carrito. </button>
                        </div>
                    </div>
                    <ul className="grid grid-cols-3 gap-2 text-xs text-center mt-4">
                        <li className="basis-2/6">
                            <span className="icon icon-shop text-2xl"></span>
                            <p> Reclama en nuestro punto. </p>
                        </li>
                        <li className="basis-2/6">
                            <span className="icon icon-ranking text-2xl"></span>
                            <p> Calidad garantizada. </p>
                        </li>
                        <li className="basis-2/6">
                            <span className="icon icon-truck text-2xl"></span>
                            <p> Disponibilidad de envio. </p>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default ProductPage