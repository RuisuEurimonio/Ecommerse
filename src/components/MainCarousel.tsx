"use client"

import { useEffect, useState } from "react";
import mainImage from "@/assets/img/ruisus.png"
import navidad from "@/assets/img/welcome.png"
import Image from "next/image";

type MainCarouselProps = {

}

let images = [
    {src:mainImage, altText: "Imagen principal agradeciendo el 2024 en Mafer"},
    {src:navidad, altText: "Imagen principal agradeciendo el 2024 en Mafer 2"},
    
];

const MainCarousel : React.FC<MainCarouselProps> = () => {

    const [position, setPosition] = useState(0);
    const intervalImages = 7500;

    function before(){
        (position !== 0) ? setPosition(position+100) : setPosition(position-100);
    }

    function next(){
        (position >= (((images.length*100)-200)*-1)) ? setPosition(position-100) : setPosition(0);
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            next();
        }, intervalImages);
        return ()=> clearInterval(interval);
    }
    , [position])

    return (
        
        <div className="m-auto overflow-hidden
            
        ">
            <div className="w-full relative flex items-center" >
                <ul className="flex w-full">
                    {images.map((img, index)=>(
                        <li className={`min-w-full transition`} key={index} style={{transform: `translateX(${position}%)`}}> 
                        <Image 
                            src={img.src}
                            alt={img.altText}
                            width={1920}
                            priority={true}
                        />
                    </li>    
                    ))}
                </ul>
                <div className="absolute left-2
                    md:left-5
                ">
                    <button onClick={before}>
                        <span className="icon icon-arrowl text-xl text-third-color 
                            md:text-4xl"
                        />
                    </button>
                </div>
                <div className="absolute right-2
                    md:right-5
                ">
                    <button onClick={next}>
                        <span className="icon icon-arrowr text-xl text-third-color
                            md:text-4xl
                        "/>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default MainCarousel;