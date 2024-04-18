"use client"

import React, { useEffect, useState } from "react";
import { getNumeration } from "@/utils/ts/getNumeration";
import {CardProductProps} from "@/types/Props"

type NumerationProps ={
    data: CardProductProps[],
    itemsByPage: number
}

const Numeration : React.FC<NumerationProps> = ({data, itemsByPage}) => {

    const [pages, setPages] = useState<number[]>([]);

    useEffect(()=>{
        let numeration:number[] = [];
        for(let i:number = 0 ; i < getNumeration(data, itemsByPage) ; i++){
            numeration.push(i+1);
        }
        setPages(numeration);
    },[itemsByPage, data])

    return(
    <ul className="text-white-mafer flex flex-wrap justify-center my-2 text-lg items-center">
        <li className="mr-2"> <span className="icon icon-arrowl"></span></li>
        {pages.map((page:number)=>(
            <li key={page} className="mx-1"> {page} </li>
        ))}
        <li className="ml-2"> <span className="icon icon-arrowr"></span></li>
    </ul>
    )
}

export default Numeration;