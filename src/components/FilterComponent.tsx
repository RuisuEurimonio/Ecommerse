"use client"

import React, { useState } from 'react';
import {BrandProps, CategoryProps, ClasificationProps} from "@/types/Props"
import Link from 'next/link';

type FilterProps ={
    title: string,
    data: CategoryProps[] | ClasificationProps[] | BrandProps[],
    sliceFrom?: number,
    sliceTo?: number,
    dataId: string,
    updateData: (event:any , type: string) => void,
    isClicked: boolean,
    onClick?: (name : string) => void;
}

const FilterComponent : React.FC<FilterProps> = ({title, data, sliceFrom, sliceTo, dataId, updateData, isClicked = false, onClick}) => {

    const [active, setActive] = useState(false);
    const [filterSelected, setFilterSelected] = useState("");

    function openFilters(){
        setActive(!active);
    }

    function updateFilterSelected(name : string){
        setFilterSelected(name);
    }

    return (
        <div className="transition px-2 border-2 rounded-sm my-0.5 cursor-pointer" >
            <h3 className="font-bold text-lg my-1 relative flex items-center border-b-2
                md:text-base
            " onClick={openFilters}>
                {title}
                <span className={`icon icon-arrowl absolute right-0 transition
                    ${active ? "-rotate-90" : ""}
                `}> </span>
            </h3>
            <ul className={`flex-col overflow-hidden transition max-h-40 overflow-y-scroll
                ${active ? "flex" : "hidden"}
            `}>
                {data.slice(sliceFrom,sliceTo).map((item : ClasificationProps | CategoryProps | BrandProps) =>(
                    <li key={item.id} className="pl-2" onClick={()=>{onClick && onClick(dataId)}}>
                        <p className={`${filterSelected == item.nombre && isClicked ? "underline" : ""}`} onClick={()=>{updateData(item.id, dataId) ; updateFilterSelected(item.nombre)}}> {item.nombre} </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterComponent;