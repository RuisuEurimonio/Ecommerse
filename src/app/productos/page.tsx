"use client"

import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import React, { useEffect, useState } from "react";
import productsFake from "@/utils/json/productsFake.json"
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";
import { useRouter, useSearchParams } from "next/navigation";



type ProductsProps = {}

const data = productsFake;

const options = [
    {id: 1 , tipo: "alfabeticamente a > z"},
    {id: 2 , tipo: "alfabeticamente z > a"}
]

const perPageOptions = [
    {id: 1, cantidad: "2"},
    {id: 2, cantidad: "3"},
    {id: 3, cantidad: "4"},
]

const Products : React.FC<ProductsProps> = () =>{

    const searchParams = useSearchParams();
    const router = useRouter();
    const pageNum = (searchParams.get("page") || 1) as string;
    const perPageStr = (searchParams.get("perPage") || 2) as string;
    const perPageNum = parseInt(perPageStr);

    function handleChange(event:any){
        router.push(`?page=${pageNum}&perPage=${event.target.value}`,
            {scroll:false}
        )
    }

    useEffect(()=>{
        console.log(pageNum)
    },[])

    return(
        <div className="w-11/12 m-auto
            md:w-4/5
        ">
            <div className="my-2"> <span className="text-black-mafer/50"> Inicio &gt; </span>  <span className="font-bold"> Productos </span> </div>
            
            <Clasificaciones/>

            <div className="flex my-4 flex-col
                md:flex-row
            ">
                <Filters/>
                <div className="md:basis-4/6">
                    <div className=""> 
                        <div className="bg-blue-mafer p-1">
                            <div>
                                <label className="text-white-mafer"> Ordenar por: </label>
                                <select name="order" className="outline-none">
                                    {options.map((option)=>(
                                        <option key={option.id} > {option.tipo} </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Numeration data={data} itemsByPage={perPageNum}/>
                            </div>
                        </div>
                        <div className="m-2">
                            <ul className="flex flew-wrap gap-4">
                                {data.slice(0,2).map((item)=>(
                                    <CardItem key={item.id} item={item}/>
                                    
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-mafer p-1">
                            <div>
                                <label className="text-white-mafer"> Cantidad por pagina: </label>
                                <select name="order" className="outline-none" value={perPageNum} onChange={handleChange}>
                                    {perPageOptions.map((option)=>(
                                        <option key={option.id} > {option.cantidad} </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Numeration data={data} itemsByPage={perPageNum}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Products;