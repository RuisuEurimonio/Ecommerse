import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import React from "react";

type ProductsProps = {}

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
                <div className="bg-red-mafer md:basis-4/6"> uola</div>
            </div>

        </div>
    )
}

export default Products;