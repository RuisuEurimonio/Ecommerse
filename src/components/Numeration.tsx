"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyPageUrlExistAndIsNumber } from "@/utils/ts/validations"
import { getNumeration } from "@/utils/ts/getNumeration";

type NumerationProps ={
    dataLength: number,
    itemsByPage: number,
    className?: string
}

const Numeration : React.FC<NumerationProps> = ({dataLength, itemsByPage, className}) => {

    const searchParam = useSearchParams();
    const router = useRouter();
    const pageNum = Number(searchParam.get("page") || 1) as number;
    const [pages, setPages] = useState<number[]>([]);
    const paginationCant:number = 4;

    useEffect(()=>{
        let totalPage = getNumeration(dataLength, itemsByPage);
        verifyPageUrlExistAndIsNumber(totalPage, pageNum, itemsByPage, router);
        let numeration:number[] = [];
        for(let i:number = 0 ; i < totalPage ; i++){
            numeration.push(i+1);
        }
        setPages(numeration);
    },[itemsByPage, dataLength])

    function next(){
        if(pageNum<=pages.length-1){
            let sum : number= pageNum+1;
            router.push(`?page=${sum}&perPage=${itemsByPage}`,
            {scroll:true})
        }
    }

    function before(){
        if(pageNum>1){
            let sum : number= pageNum-1;
            router.push(`?page=${sum}&perPage=${itemsByPage}`,
            {scroll:true})
        } else {
            router.push(`?page=1&perPage=${itemsByPage}`,
            {scroll:true})
        }
    }

    function selectPage(number:number){
        router.push(`?page=${number}&perPage=${itemsByPage}`,
        {scroll:true})
    }

    return(
    <ul className={`text-third-color flex flex-wrap justify-center text-lg items-center ${className}`}>
        <li className="mr-2 py-2" onClick={before}> <span className="icon icon-arrowl cursor-pointer" ></span></li>
        {pages.slice(
            (pageNum<=paginationCant)?0:pageNum-paginationCant-1,
            (pageNum>(pages.length-paginationCant))?pages.length:pageNum+paginationCant
        ).map((page:number)=>{
            const style = (pageNum===page) ? "font-bold underline underline-offset-8" : "";
        return(
            <li key={page} className={`mx-1 cursor-pointer ${style}`} onClick={()=>{selectPage(page)}}> {page} </li>
        )})}
        <li className="ml-2 py-2" onClick={next}> <span className="icon icon-arrowr cursor-pointer"></span></li>
    </ul>
    )
}

export default Numeration;