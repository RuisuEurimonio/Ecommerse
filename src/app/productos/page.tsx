import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import React from "react";
import productsFake from "@/utils/json/productsFake.json"
import Numeration from "@/components/Numeration";

type ProductsProps = {}

const data = productsFake;

const options = [
    {id: 1 , tipo: "alfabeticamente a > z"},
    {id: 2 , tipo: "alfabeticamente z > a"}
]

const Products : React.FC<ProductsProps> = () =>{

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
                            <Numeration data={data} itemsByPage={1}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Products;