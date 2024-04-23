"use client"

import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";

import productsFake from "@/utils/json/productsFake.json"
import {verifyPerPageExist} from "@/utils/ts/validations"

import { useRouter, useSearchParams } from "next/navigation";

type ProductsProps = {}

const data = productsFake;

const options = [
    {id: 1 , tipo: "alfabeticamente a > z"},
    {id: 2 , tipo: "alfabeticamente z > a"}
]

const perPageOptions = [
    {id: 1, cantidad: 10},
    {id: 2, cantidad: 25},
    {id: 3, cantidad: 50},
]

const Products : React.FC<ProductsProps> = () =>{

    const searchParams = useSearchParams();
    const router = useRouter();

    const pageNum = (searchParams.get("page") || 1) as number;
    const perPageParam = Number(searchParams.get("perPage") || perPageOptions[1].cantidad) as number;
    const perPage = verifyPerPageExist(perPageOptions, perPageParam);


    function handleChange(event:any){
        router.push(`?page=1&perPage=${event.target.value}`,
            {scroll:true}
        )
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
                <div className="md:basis-3/4">
                    <div className=""> 
                        <div className="bg-blue-mafer p-1 rounded-sm flex flex-col items-center">
                            <div className="mt-2">
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
                            <ul className="grid grid-cols-2 gap-2
                                md:grid-cols-3
                                lg:grid-cols-4
                                xl:grid-cols-5
                            ">
                                {data.slice(((perPage*pageNum)-perPage),perPage*pageNum).map((item)=>(
                                    <CardItem key={item.id} item={item}/>
                                    
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-mafer p-1 flex flex-col-reverse items-center rounded-sm">
                            <div className="mb-3">
                                <label className="text-white-mafer"> Cantidad por pagina: </label>
                                <select name="order" className="outline-none" value={perPage} onChange={handleChange}>
                                    {perPageOptions.map((option)=>(
                                        <option key={option.id} value={option.cantidad}> {option.cantidad} </option>
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