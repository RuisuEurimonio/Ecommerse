import React from "react";
import mainImage from "@/assets/img/2024.jpg"
import Image from "next/image";

type MainCarouselProps = {

}

const MainCarousel : React.FC<MainCarouselProps> = () => {
    return (
        
        <div className="2xl:w-4/5 m-auto overflow-hidden">
            <div className="w-full relative flex items-center" >
                <ul className="flex w-full">
                    <li className="min-w-full"> 
                        <Image 
                            src={mainImage}
                            alt={"Imagen principal agradeciendo el 2024 en Mafer"}
                            width={1920}
                        />
                    </li>
                    <li className="min-w-full">
                        <Image 
                            src={mainImage}
                            alt={"Imagen principal agradeciendo el 2024 en Mafer"}
                            width={1920}
                        />
                    </li>
                </ul>
                <div className="absolute left-5">
                    <button>
                        <span className="icon icon-arrowl text-4xl"/>
                    </button>
                </div>
                <div className="absolute right-5">
                    <button>
                        <span className="icon icon-arrowr text-4xl"/>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default MainCarousel;