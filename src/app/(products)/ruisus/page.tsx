"use client"

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import DataNotFoundMessage from "@/components/DataNotFoundMessage";
import { SelectCantItems } from "@/components/SelectCantItems";
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";
import Filters from "@/components/Filters";

import { verifyPerPageExist } from "@/utils/ts/validations";
import { perPageOptions, alphabetOptions } from "@/utils/ts/configuration";

import { ArticleProps } from "@/types/Props";

import { getElementsByFilterName, getElementsByOrder } from "@/data/api";

type ProductsProps = {};

const ID_BRAND = 6;
const URL_FETCH = "producto"

const Products: React.FC<ProductsProps> = () => {
    const searchParams = useSearchParams();

    const pageNum = (searchParams.get("page") || 1) as number;
    const perPageParam = Number(
        searchParams.get("perPage") || perPageOptions[1].cantidad
    ) as number;
    const perPage = verifyPerPageExist(perPageOptions, perPageParam);
    const [data, setData] = useState<ArticleProps[] | null>(null);

    

    function updateDataByFilter(data : ArticleProps[]){
        if(data){
            const newData = selectDataRuisus(data);
            setData(newData);
        }
    }

    function selectDataRuisus(data : ArticleProps[]) : ArticleProps[]{
        let array : ArticleProps[] = [];
        data.forEach((item)=>{
            if(item.marca.id == 6){
                array.push(item);
            }
        })
        return array;
    }

    const get = async () =>{
        const data = await getElementsByFilterName(URL_FETCH,"marca", ID_BRAND);
        if(data){
            setData(data);
        }
    }

    async function getDataByOrder(event : React.ChangeEvent<HTMLSelectElement>){
        let { value } = event.target
        if(value === "none") {return get()};
        const data = await getElementsByOrder(value as "desc" | "asc");
        if(data){
            const dataDiscount = selectDataRuisus(data);
            if(dataDiscount){
                setData(dataDiscount);
            }
        }
    }


    useEffect(()=>{
        get();
    },[])

    return (
        <div
            className="flex my-4 flex-col justify-between
                    md:flex-row"
        >
            <Filters updateDataFunction={updateDataByFilter}/>
            <div className="md:basis-3/4">
                <div>
                    <div className="bg-fourth-color p-1 rounded-sm flex flex-col items-center">
                        <div className="mt-2">
                            <label className="text-white-mafer"> Ordenar por: </label>
                            <select
                                name="order"
                                className="outline-none cursor-pointer mx-1 rounded-sm"
                                onChange={(event)=>{getDataByOrder(event)}}
                                >
                                    <option value="none"> Seleccionar. </option>
                                    {alphabetOptions.map((option) => (
                                        <option key={option.id} value={option.keyWord} >
                                            {option.tipo}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <div>
                            {data && <Numeration dataLength={data.length} itemsByPage={perPage} />}
                        </div>
                    </div>
                    <div className="m-2">
                        <ul
                            className="grid grid-cols-2 gap-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5"
                        >
                            {data &&
                            data
                                .slice(
                                    perPage * pageNum - perPage,
                                    perPage * pageNum
                                )
                                .map((item) => (
                                    <CardItem
                                        key={item.id}
                                        item={item}
                                        discount={item.descuento?.activo}
                                        link={"ruisus"}
                                    />
                                ))}
                        </ul>
                        {data && data?.length == 0 && 
                            <DataNotFoundMessage title={"No hay coincidencias"} text="Lo sentimos, no se encontraron productos." />
                        }
                        {!data && 
                        <div className="w-full flex justify-center items-center">
                            <DataNotFoundMessage
                                title="Error"
                                text="Ingrese algún nuevo artículo de marca propia por medio de la siguiente configuración."
                                redirectName="Artículos"
                                redirectLink="/my-account/configuration-articles"
                            />
                        </div>
                        }
                    </div>
                    <div className="bg-fourth-color p-4 flex flex-col-reverse items-center rounded-sm">
                        {data &&
                        <>
                            <SelectCantItems perPage={perPage} />
                            <Numeration dataLength={data.length} itemsByPage={perPage} />
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
