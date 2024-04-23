

import React, { useEffect, useState } from "react";
import { getNumeration } from "@/utils/ts/getNumeration";
import {CardProductProps} from "@/types/Props"
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type NumerationProps ={
    data: CardProductProps[],
    itemsByPage: number
}

const Numeration : React.FC<NumerationProps> = ({data, itemsByPage}) => {

    const searchParam = useSearchParams();
    const router = useRouter();
    const pageNum = (searchParam.get("page") || 1) as string;
    const pageNumInt:number = parseInt(pageNum);
    const [pages, setPages] = useState<number[]>([]);
    const paginationCant:number = 4;

    useEffect(()=>{
        let numeration:number[] = [];
        for(let i:number = 0 ; i < getNumeration(data, itemsByPage) ; i++){
            numeration.push(i+1);
        }
        setPages(numeration);
    },[itemsByPage, data])

    function next(){
        if(pageNumInt<=pages.length-1){
            let sum : number= pageNumInt+1;
            router.push(`?page=${sum}&perPage=${itemsByPage}`,
            {scroll:false})
        }
    }

    function before(){
        if(pageNumInt>1){
            let sum : number= pageNumInt-1;
            router.push(`?page=${sum}&perPage=${itemsByPage}`,
            {scroll:false})
        } else {
            router.push(`?page=1&perPage=${itemsByPage}`,
            {scroll:false})
        }
    }

    function selectPage(number:number){
        router.push(`?page=${number}&perPage=${itemsByPage}`,
        {scroll:false})
    }

    return(
    <ul className="text-white-mafer flex flex-wrap justify-center my-2 text-lg items-center">
        <li className="mr-2 py-2" onClick={before}> <span className="icon icon-arrowl" ></span></li>
        {pages.slice(
            (pageNumInt<=paginationCant)?0:pageNumInt-paginationCant-1,
            (pageNumInt>(pages.length-paginationCant))?pages.length:pageNumInt+paginationCant
        ).map((page:number)=>{
            const style = (pageNumInt===page) ? "font-bold underline underline-offset-8" : "";
        return(
            <li key={page} className={`mx-1 ${style}`} onClick={()=>{selectPage(page)}}> {page} </li>
        )})}
        <li className="ml-2 py-2" onClick={next}> <span className="icon icon-arrowr"></span></li>
    </ul>
    )
}

export default Numeration;