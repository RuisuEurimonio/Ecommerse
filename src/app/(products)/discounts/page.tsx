"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import DataNotFoundMessage from "@/components/DataNotFoundMessage";
import { SelectCantItems } from "@/components/SelectCantItems";
import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";
import Filters from "@/components/Filters";

import { verifyPerPageExist } from "@/utils/ts/validations";
import { perPageOptions, alphabetOptions } from "@/utils/ts/configuration";

import { getElementsApi } from "@/data/api";

import { ArticleProps } from "@/types/Props";

type DisctountsProps = {};

const Discounts: React.FC<DisctountsProps> = () => {

    const searchParams = useSearchParams();

    const pageNum = (searchParams.get("page") || 1) as number;
    const perPageParam = Number(
        searchParams.get("perPage") || perPageOptions[1].cantidad
    ) as number;
    const perPage = verifyPerPageExist(perPageOptions, perPageParam);
    const [data, setData] = useState<ArticleProps[] | null> (null);

    useEffect(()=>{
        const get = async () =>{
            const response = await getElementsApi("http://localhost:8080/api/producto/all")
            if(response){
                let array : ArticleProps[] = [];
                response.forEach((item : ArticleProps)=>{
                    if(item.descuento?.activo){
                        array.push(item);
                    }
                })
                setData(array);
            }
        }
        get();
    },[])

    return (
        <div
            className="flex my-4 flex-col justify-between
                    md:flex-row"
        >
            <Filters />
            <div className="md:basis-3/4">
                <div>
                    <div className="bg-fourth-color p-1 rounded-sm flex flex-col items-center">
                        <div className="mt-2">
                            <label className="text-principal-color">
                                Ordenar por:
                            </label>
                            <select
                                name="order"
                                className="outline-none cursor-pointer mx-1 rounded-sm"
                            >
                                {alphabetOptions.map((option) => (
                                    <option key={option.id}>
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
                                        discount
                                        link={"discounts"}
                                    />
                                ))}
                        </ul>
                        {!data && 
                        <div className="w-full flex justify-center items-center">
                            <DataNotFoundMessage
                                title="Error"
                                text="Ingrese algún nuevo artículo por medio de la siguiente configuración."
                                redirectName="Artículos"
                                redirectLink="/my-account/configuration-articles"
                            />
                        </div>
                        }
                    </div>
                    <div className="bg-fourth-color p-2 flex flex-col-reverse items-center rounded-sm">
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

export default Discounts;
