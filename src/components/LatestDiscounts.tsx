"use client"

import React, { useState } from "react";
import dataFake from "@/utils/json/productsFake.json";
import CardSimple from "./CardSimple";
import { CardProductProps } from "@/types/Props";

type LatestDiscountsProps = {

}

const data = dataFake;

const move = 1 + 10; // 1rem (gap) + 10rem (min-w)

const LatestDiscounts : React.FC<LatestDiscountsProps> = () => {


    const [position, setPosition] = useState(0);

    function next(){
        ((data.length-2)*move < position) ? setPosition(0) : setPosition(position+move);
    }

    function before(){
        if (position > 0) { setPosition(position-move);}
    }

    return(
        <div className="custom_content">
            <h2 className="custom_title"> Últimos descuentos. </h2>
            <div className="flex items-center relative">
                <div className="w-full overflow-x-hidden my-2">
                    <ul className={`flex gap-4 transition`} style={{transform: `translateX(-${position}rem)`}}>
                        {data.map((product : CardProductProps)=>(
                            <CardSimple key={product.id} product={product} />
                        ))}
                    </ul>
                </div>
                <div className="absolute left-2
                        md:left-5
                    ">
                    <button onClick={before}>
                        <span className="icon icon-arrowl text-xl
                            md:text-4xl"
                        />
                    </button>
                </div>
                <div className="absolute right-2
                    md:right-5
                ">
                    <button onClick={next}>
                    <span className="icon icon-arrowr text-xl
                        md:text-4xl
                    "/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LatestDiscounts;