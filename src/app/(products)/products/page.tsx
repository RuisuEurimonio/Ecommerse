"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import DataNotFoundMessage from "@/components/DataNotFoundMessage";
import { SelectCantItems } from "@/components/SelectCantItems";
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";
import Filters from "@/components/Filters";

import { perPageOptions, alphabetOptions } from "@/utils/ts/configuration";
import { verifyPerPageExist } from "@/utils/ts/validations";

import { ArticleProps } from "@/types/Props";

import { getElementsApi, getElementsByOrder, getElementsSearched } from "@/data/api";
import { useDebouncedCallback } from "use-debounce";
import LoadingItem from "@/components/LoadingItem/LoadingItem";
import { havePermission } from "@/auth/security";

type ProductsProps = {};

const URL_FETCH = "producto"

const Products: React.FC<ProductsProps> = () => {

    const searchParams = useSearchParams();

    const pageNum = (searchParams.get("page") || 1) as number;
    const perPageParam = Number(
        searchParams.get("perPage") || perPageOptions[1].cantidad
    ) as number;
    const perPage = verifyPerPageExist(perPageOptions, perPageParam);
    const searchValue = searchParams.get("search") || "";
    
    const [data, setData] = useState<ArticleProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    function updateDataByFilter(data : ArticleProps[]){
        if(data){
            setData(data);
        }
    }

    const get = async () => {
        const data = await getElementsApi(URL_FETCH);
        if(data){
            setData(data);
        } 
        setLoading(false);
    }

    const getSearch = async (value : string) => {
        const data = await getElementsSearched(value);
        setData(data);
        setLoading(false);
    }
    
    async function getDataByOrder(event : React.ChangeEvent<HTMLSelectElement>){
        let { value } = event.target
        if(value === "none") { return get() }
        const data = await getElementsByOrder(value as "desc" | "asc");
        if(data){
            setData(data);
        }
        setLoading(false);
    }

    const debouncedGetSearch = useDebouncedCallback(() => {
        if (searchValue !== "") {
            getSearch(searchValue);
        } else {
            get();
        }
    }, 500);

    useEffect(()=>{
        setData(null);
        setLoading(true);
        debouncedGetSearch();
    },[searchValue])

    return (
        <div
            className="flex my-4 flex-col justify-between
                    md:flex-row"
        >
            <Filters updateDataFunction={updateDataByFilter} />

            <div className="md:basis-3/4">
                <div>
                    <div className="bg-fourth-color p-1 rounded-sm flex flex-col items-center">
                        <div className="mt-2">
                            <label className="text-white-mafer">
                                Ordenar por:
                            </label>
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
                            {data && data.length > 0 && <Numeration dataLength={data.length} itemsByPage={perPage} />}
                        </div>
                    </div>
                    <div className="m-2">
                        <ul
                            className="grid grid-cols-2 gap-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5"
                        >
                            {data && !loading &&
                            data
                                .slice(
                                    perPage * pageNum - perPage,
                                    perPage * pageNum
                                )
                                .map((item) => {
                                    return(
                                    <CardItem
                                        key={item.id}
                                        item={item}
                                        link={"products"}
                                        discount={item.descuento?.activo}
                                    />
                                )})
                            }
                        </ul>
                        {loading && !data &&
                            <LoadingItem/>
                        }
                        {!data && !loading && havePermission() &&
                        <div className="w-full flex justify-center items-center">
                            <DataNotFoundMessage
                                title="Error"
                                text="Ingrese algún nuevo artículo por medio de la siguiente configuración."
                                redirectName="Artículos"
                                redirectLink="/my-account/configuration-articles"
                            />
                        </div>
                        }
                        {!loading &&
                            <DataNotFoundMessage title={"No hay coincidencias"} text="Lo sentimos, no se encontraron productos." />
                        }
                    </div>
                    <div className="bg-fourth-color p-1 flex flex-col-reverse items-center rounded-sm">
                        <SelectCantItems perPage={perPage} />
                        {data && data.length > 0 && <Numeration dataLength={data.length} itemsByPage={perPage} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
