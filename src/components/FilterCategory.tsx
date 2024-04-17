"use client"

import React, { useState } from 'react';
import {CategoryProps} from "@/types/Props"
import Link from 'next/link';
import branchFake from "@/utils/json/branchFake.json";

type FilterCategoryProps ={

}

const data = branchFake;

const FilterCategory : React.FC<FilterCategoryProps> = () => {

    const [active, setActive] = useState(false);

    function openFilters(){
        setActive(!active);
    }

    return (
        <div className="transition px-2 border-2 rounded-sm my-0.5">
            <h3 className="font-bold text-lg my-1 relative flex items-center border-b-2
                md:text-base
            " onClick={openFilters}>
                Categoria.
                <span className={`icon icon-arrowl absolute right-0 transition
                    ${active ? "-rotate-90" : ""}
                `}> </span>
            </h3>
            <ul className={`flex-col overflow-hidden transition max-h-40 overflow-y-scroll
                ${active ? "flex" : "hidden"}
            `}>
                {data.slice(0,6).map((item : CategoryProps)=>(
                    <li key={item.id} className="pl-2">
                        <Link href=""> <p> 🛠 {item.nombre} </p> </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterCategory;