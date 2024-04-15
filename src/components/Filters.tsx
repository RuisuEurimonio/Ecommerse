import React from "react";
import branchFake from "@/utils/json/branchFake.json";
import { CategoryProps, ClassificationProps } from "@/types/Props";
import Link from "next/link";

type FiltersProps = {}

const data = branchFake;

const Filters : React.FC<FiltersProps> = () => {
    return (
        <div className="absolute bg-red-mafer top-0 right-0 h-full w-[320px] z-20 transition translate-x- px-6 duration-300">
            <div>
                <div className="flex w-full flex-row-reverse">
                    <button className="relative right-0 p-2 text-2xl
                    md:hidden"
                      
                    >
                        <span className="icon icon-xmark"/>
                    </button>
                </div>
                <h2 className="text-xl font-bold text-center"> Buscar por filtros. </h2>
                <div className="group">
                    <h3 className="font-bold text-lg my-2"> Categoria. </h3>
                    <ul className="flex-col overflow-hidden hidden group-active:flex">
                        {data.slice(0,6).map((item : CategoryProps)=>(
                            <li key={item.id} className="pl-2">
                                <Link href=""> <p> {item.nombre} </p> </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg my-2"> Clasificación. </h3>
                    <ul className="flex flex-col">
                        {data.slice(0,3).map((item : ClassificationProps)=>(
                            <li key={item.id} className="pl-2">
                                <Link href=""> <p> {item.nombre} </p> </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg my-2"> Marca. </h3>
                    <ul className="flex flex-col">
                        {data.slice(0,11).map((item : ClassificationProps)=>(
                            <li key={item.id} className="pl-2">
                                <Link href=""> <p> {item.nombre} </p> </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filters;