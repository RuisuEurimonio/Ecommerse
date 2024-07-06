"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Comments from "@/components/Comments";
import ProductsRecomended from "@/components/ProductsRecomended";
import AddProductCant from "@/components/AddProductCant";
import ProductPrice from "@/components/ProductPrice";

import image from "@/assets/img/imageNotFound.jpg";

import { ArticleProps } from "@/types/Props";

import productsFake from "@/utils/json/productsFake.json";
import { askForSaveProduct, getCantOfUrlParams } from "@/components/utils";

const dataProducts = productsFake.slice(0, 10); //TODO Temporal data, implement fetch

const ProductPage: React.FC<ArticleProps> = ({ params }: any) => {

    const data = productsFake.find((item) => item.id === parseInt(params.id)); //TODO temporal function, delete this with implement of fetch data.

    const router = useRouter();
    const searchParam = useSearchParams();

    useEffect(() => {
        router.replace(`?name=${data?.nombre}`);
    }, []);

    return (
        <div className="">
            <h2 className="text-center font-bold text-red-mafer mt-2 text-xl">
                Descripción de producto.{" "}
            </h2>

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
                            src={image}
                            alt={
                                data?.descripcion ??
                                "Description product not found"
                            }
                        />
                        <ul className="grid grid-cols-4 m-1 gap-1">
                            <li>
                                <Image
                                    className="rounded-sm"
                                    src={image}
                                    alt={data?.descripcion ?? ""}
                                />
                            </li>
                            <li>
                                <Image
                                    className="rounded-sm"
                                    src={image}
                                    alt={data?.descripcion ?? ""}
                                />
                            </li>
                            <li>
                                <Image
                                    className="rounded-sm"
                                    src={image}
                                    alt={data?.descripcion ?? ""}
                                />
                            </li>
                            <li>
                                <Image
                                    className="rounded-sm"
                                    src={image}
                                    alt={data?.descripcion ?? ""}
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
                        <p>{data?.categoria ?? "Not found"}</p>
                        <p> SKU: {data?.SKU ?? "Not found"}</p>
                    </div>
                    <div>
                        <h3
                            className="text-red-mafer uppercase font-bold text-lg
                            xl:text-xl"
                        >
                            {data?.nombre ?? "Not found"}
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
                            
                            {data?.descripcion}
                        </p>
                    </div>
                    <div
                        className="flex justify-around items-center flex-col gap-2 
                        lg:flex-row lg:justify-end"
                    >
                        <AddProductCant />
                        <div
                            className="border-2 rounded-lg px-1 bg-red-mafer text-blue-mafer text-base
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

            <ProductsRecomended data={dataProducts} />
        </div>
    );
};

export default ProductPage;
