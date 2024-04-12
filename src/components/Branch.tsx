"use client"

import React, { useEffect, useState } from "react";
import branchFake from "@/utils/json/branchFake.json"
import { ObjBranchProps } from "@/types/Props"
import imageNotFound from "@/assets/img/imageNotFound.jpg"
import Image from "next/image";

type BranchProps = {}

const data = branchFake;

const move = 6 + 0.75; //min-w-24 (6rem) + gap-3 (0.75rem)

const intervalMove = 5000;

const Branch : React.FC<BranchProps> = () => {

    const [position, setPosition] = useState(0);
    
    function next(){
        ((data.length - 3) * move < position ) ? setPosition(0) : setPosition(position + move);
    }
    
    function before(){
        if (position > 0) {setPosition(position - move);}
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            next();
        }, intervalMove)
        return ()=> clearInterval(interval);
    }, [position])

    return(
        <div className="custom_content">
            <h2 className="custom_title"> Aliados comerciales. </h2>
            <div className="overflow-x-hidden relative flex items-center">
                <ul className="flex gap-3 transition" style={{transform: `translateX(-${position}rem)`}}>
                    {data.map((data:ObjBranchProps)=>(
                        <li key={data.id} className="min-w-24">
                            <Image src={imageNotFound} alt={`Imagen de representativo de ${data.nombre}`} />
                            <p className="text-center text-xs mt-2"> {data.nombre.slice(0,20)}{(data.nombre.length < 20) ? "" :"..."} </p>
                        </li>
                    ))}
                </ul>
                <div className="absolute left-2 <-
                        md:left-5
                    ">
                    <button onClick={before}>
                        <span className="icon icon-arrowl text-xl
                            md:text-2xl"
                        />
                    </button>
                </div>
                <div className="absolute right-2
                    md:right-5
                ">
                    <button onClick={next}>
                    <span className="icon icon-arrowr text-xl
                        md:text-2xl
                    "/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Branch;