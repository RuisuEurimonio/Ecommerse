"use client"

import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import React, { useState } from "react";
import productsFake from "@/utils/json/productsFake.json"
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";

type ProductsProps = {}

const data = productsFake;

const options = [
    {id: 1 , tipo: "alfabeticamente a > z"},
    {id: 2 , tipo: "alfabeticamente z > a"}
]

const perPageOptions = [
    {id: 1, cantidad: 2},
    {id: 2, cantidad: 3},
    {id: 3, cantidad: 4},
]

const Products : React.FC<ProductsProps> = () =>{

    const [perPage, setPerPage] = useState(3);

    function handleChange(event: any){
        setPerPage(event.target.value);
    }

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
                                <Numeration data={data} itemsByPage={perPage}/>
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
                                <label className="text-white-mafer"> Ordenar por: </label>
                                <select name="order" className="outline-none" value={perPage} onChange={handleChange}>
                                    {perPageOptions.map((option)=>(
                                        <option key={option.id} > {option.cantidad} </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Numeration data={data} itemsByPage={perPage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Products;