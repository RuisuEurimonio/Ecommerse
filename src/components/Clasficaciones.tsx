import React from "react";
import ferreteria from "@/assets/img/ferreteria.jpg"
import construccion from "@/assets/img/construccion.jpeg"
import seguridad from "@/assets/img/seguridad.jpg"
import Image from "next/image";
import Link from "next/link";

 type ClasificacionesProps = {

 }

 const Clasificaciones : React.FC<ClasificacionesProps> = () => {
    return(
        <div className="2xl:w-4/5 m-auto">
            <ul className="flex flex-wrap justify-center text-xs text-center
                 md:h-48
                 lg:h-72 lg:text-base 2xl:text-lg
            ">
                <li className="w-1/2
                    md:w-1/3 md:h-full
                "> 
                    <Link href="/" className="relative flex justify-center items-center h-full">
                        <Image src={ferreteria} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                        <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Ferreteria. </p>
                    </Link> 
                </li>
                <li className="w-1/2
                    md:w-1/3 md:h-full
                "> 
                    <Link href="/" className="relative flex justify-center items-center h-full ">
                        <Image src={construccion} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                        <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Construcción. </p>
                    </Link> 
                </li>
                <li className="w-1/2
                    md:w-1/3 md:h-full
                "> 
                    <Link href="/" className="relative flex justify-center items-center h-full ">
                        <Image src={seguridad} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                        <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Seguridad industrial. </p>
                    </Link> 
                </li>
            </ul>
        </div>
    )
 }

 export default Clasificaciones;