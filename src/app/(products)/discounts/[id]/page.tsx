"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Comments from "@/components/Comments";
import ProductsRecomended from "@/components/ProductsRecomended";
import AddProductCant from "@/components/AddProductCant";
import ProductPrice from "@/components/ProductPrice";

import { ArticleProps } from "@/types/Props";

import { askForSaveProduct, getCantOfUrlParams } from "@/components/utils";
import { getElementByIdApi, getElementsApi } from "@/data/api";

const URL_FETCH = "producto"

const ProductPage: React.FC<ArticleProps> = ({ params }: any) => {

    const router = useRouter();
    const searchParam = useSearchParams();
    const [data, setData] = useState<ArticleProps | null>(null);
    const [article, setArticle] = useState<ArticleProps[] | null>(null);

    useEffect(() => {
        router.replace(`?name=${data?.nombre}`);
    }, [data]);

    useEffect(()=>{
        const getElement =  async () => {
            const data = await getElementByIdApi(URL_FETCH,params.id);
            if(data){
                setData(data);
            }
        }

        const getElements = async () => {
            const data = await getElementsApi(URL_FETCH);
            if(data){
                setArticle(data);
            }
        }

        getElement();
        getElements();
    },[])

    return (
        <div className="">
            <h2 className="text-center font-bold text-sixth-color mt-2 text-xl">
                Descripción de producto.{" "}
            </h2>

            {data ?
                <div
                className="flex w-full my-4 flex-col-reverse gap-2
                sm:flex-row sm:justify-between"
            >
                <div
                    className="basis-1/2 border-2
                    lg:basis-1/3"
                >
                    <div>
                    <Image
                            className="w-3/4 m-auto mt-2 rounded-sm"
                            src={data.imagen}
                            alt={data.descripcion}
                            width={0}
                            height={0}
                            sizes="200"
                            style={{ width: 300, height: "auto"}}
                            priority={false}
                        />
                        <ul className="grid grid-cols-4 m-1 gap-1">
                            <li className="m-auto">
                                <Image
                                    className="rounded-sm"
                                    src={data.imagen}
                                    alt={data.descripcion}
                                    width={0}
                                    height={0}
                                    sizes="100"
                                    style={{ width: 75, height: "auto"}}
                                    priority={false}
                                />
                            </li>
                            <li className="m-auto">
                                <Image
                                    className="rounded-sm"
                                    src={data.imagen}
                                    alt={data.descripcion}
                                    width={0}
                                    height={0}
                                    sizes="100"
                                    style={{ width: 75, height: "auto"}}
                                    priority={false}
                                />
                            </li>
                            <li className="m-auto">
                                <Image
                                    className="rounded-sm"
                                    src={data.imagen}
                                    alt={data.descripcion}
                                    width={0}
                                    height={0}
                                    sizes="100"
                                    style={{ width: 75, height: "auto"}}
                                    priority={false}
                                />
                            </li>
                            <li className="m-auto">
                                <Image
                                    className="rounded-sm"
                                    src={data.imagen}
                                    alt={data.descripcion}
                                    width={0}
                                    height={0}
                                    sizes="100"
                                    style={{ width: 75, height: 50}}
                                    priority={false}
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className="basis-1/2 border-2 p-2 rounded-sm flex justify-between flex-col
                    lg:basis-2/3 xl:py-4 xl:px-8"
                >
                    <div
                        className="flex text-sm justify-between
                        xl:text-base"
                    >
                        <p>{data.categoria.nombre }</p>
                        <p> SKU: {data.sku}</p>
                    </div>
                    <div>
                        <h3
                            className="text-sixth-color uppercase font-bold text-lg
                            xl:text-xl"
                        >
                            {data.nombre}
                        </h3>
                        <ul
                            className="flex flex-row text-sm
                            xl:text-base"
                        >
                            <li> ⭐⭐⭐⭐⭐ </li>
                        </ul>
                        {data && <ProductPrice data={data} />}
                        <p
                            className="my-2 text-sm
                            sm:line-clamp-2
                            lg:text-base lg:line-clamp-3"
                        >
                            
                            {data.descripcion}
                        </p>
                    </div>
                    <div
                        className="flex justify-around items-center flex-col gap-2 
                        lg:flex-row lg:justify-end"
                    >
                        <AddProductCant />
                        <div
                            className="border-2 rounded-lg px-1 bg-sixth-color text-principal-color text-base transition hover:scale-105 duration-300
                            xl:py-1"
                        >
                            <button className="h-full w-full uppercase" onClick={()=>{data ? askForSaveProduct(data, getCantOfUrlParams(searchParam)): ""}}>
                                Agregar al carrito.
                            </button>
                        </div>
                    </div>
                    <ul 
                        className="grid grid-cols-3 gap-2 text-xs text-center mt-4
                        xl:text-base"
                    >
                        <li className="basis-2/6">
                            <span
                                className="icon icon-shop text-2xl
                                xl:text-4xl"
                            />
                            <p> Reclama en nuestro punto. </p>
                        </li>
                        <li className="basis-2/6">
                            <span
                                className="icon icon-ranking text-2xl
                                xl:text-4xl"
                            />
                            <p> Calidad garantizada. </p>
                        </li>
                        <li className="basis-2/6">
                            <span
                                className="icon icon-truck text-2xl
                                xl:text-4xl"
                            />
                            <p> Disponibilidad de envio. </p>
                        </li>
                    </ul>
                </div>
            </div>
            :
            <h3> Algo salío mal, vuelve a intentar! </h3>
            }

            <div
                className="hidden
                sm:inline"
            >
                <h3 className="text-lg font-bold"> Descripción. </h3>
                <p className="my-2 text-base text-justify">
                    {data?.descripcion}
                </p>
            </div>

            <Comments />

            {article && <ProductsRecomended data={article} />}
        </div>
    );
};

export default ProductPage;
