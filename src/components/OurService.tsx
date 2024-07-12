import Link from "next/link";
import React from "react";

type OurServiceProps = {}

const OurService : React.FC<OurServiceProps> = () => {
    return (
        <div className="custom_content">
            <h2 className="custom_title text-fifth-color"> Por qué comprar con nosotros. </h2>
            <ul className="flex w-full justify-evenly flex-wrap gap-2 items-center my-3
                md:flex-row  md:gap-4
                lg:gap-x-12 lg:my-5 
            ">
                <li className="flex flex-col flex-1 items-center p-3 border-2 w-full rounded-lg border-fourth-color/20 max-w-52 min-w-40  h-[19rem]"> 
                    <div className="flex justify-center items-center h-14 w-14 border-2 rounded-full my-4
                        lg:h-16 lg:w-16
                    ">
                        <span className="icon icon-ranking text-xl text-fourth-color
                            lg:text-2xl
                            2xl:text-3xl
                        "/>
                    </div>
                    <h3 className="text-base text-center font-bold text-fourth-color
                        lg:text-lg
                    "> Mejor servicio. </h3>
                    <p className="text-justify py-4 text-sm"> Nos aseguramos de siempre brindarle un excelente servicio a nuestros clientes, para guiarlos hacia la mejor desición. </p>
                </li>
                <li className="flex flex-col flex-1 items-center p-3 border-2 w-full rounded-lg border-fourth-color/20 max-w-52 min-w-40  h-[19rem]"> 
                <div className="flex justify-center items-center h-14 w-14 border-2 rounded-full my-4
                    lg:h-16 lg:w-16
                ">
                    <span className="icon icon-arrow-rotate text-2xl text-fourth-color
                        lg:text-2xl
                        2xl:text-3xl
                    "/>    
                </div>
                    <h3 className="text-base text-center font-bold text-fourth-color
                        lg:text-lg
                    "> Garantia. </h3>
                    <p className="text-justify py-4 text-sm"> Ofrecemos productos de la mas alta calidad respaldados con las mejores marcas del mercado. </p>
                </li>
                <li className="flex flex-col flex-1 items-center p-3 border-2 w-full rounded-lg border-fourth-color/20 max-w-52 min-w-40  h-[19rem]"> 
                <div className="flex justify-center items-center h-14 w-14 border-2 rounded-full my-4
                    lg:h-16 lg:w-16
                ">
                    <span className="icon icon-truck text-2xl text-fourth-color
                        lg:text-2xl
                        2xl:text-3xl
                    "/>    
                </div>
                    <h3 className="text-base text-center font-bold text-fourth-color
                        lg:text-lg
                    "> Envio rápido. </h3>
                    <p className="text-justify py-4 text-sm"> Contamos con una serie de camiones totalmente preparados para dejar tu pedido en la puerta de tu casa. </p>
                </li>
                <li className="flex flex-col flex-1 items-center p-3 border-2 w-full rounded-lg border-fourth-color/20 max-w-52 min-w-40  h-[19rem]"> 
                <div className="flex justify-center items-center h-14 w-14 border-2 rounded-full my-4
                    lg:h-16 lg:w-16
                ">
                    <span className="icon icon-global text-2xl text-fourth-color
                        lg:text-2xl
                        2xl:text-3xl
                    "/>    
                </div>
                    <h3 className="text-base text-center font-bold text-fourth-color
                        lg:text-lg
                    "> Gran alcance. </h3>
                    <p className="text-justify py-4 text-sm"> Realizamos envios en todo <span>Colombia</span> sin importar si es zona rural o urbana. </p>
                </li>
            </ul>
            <div className="flex items-center">
                <button className="text-lg text-center bg-secondary-color hover:scale-105 transition text-third-color py-1 px-2 inline mx-auto rounded-md"> <Link href="/ruisus"> Conoce más. </Link> </button>
            </div>
        </div>
    )
}

export default OurService;