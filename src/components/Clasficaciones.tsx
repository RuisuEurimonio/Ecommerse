import React from "react";
import setup from "@/assets/img/setup.jpg"
import components from "@/assets/img/components.avif"
import peripherals from "@/assets/img/PC-Peripherals-scaled.webp"
import Image from "next/image";
import Link from "next/link";

 type ClasificacionesProps = {
    main?: Boolean;
 }

 const Clasificaciones : React.FC<ClasificacionesProps> = ({main}) => {
    return(
         <ul className={`flex flex-wrap justify-center text-xs text-center
            lg:text-base 2xl:text-lg
         `}>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:h-auto
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full">
                     <Image src={setup} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-third-color bg-fourth-color/50 p-2 rounded-lg"> Setups. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:h-auto
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                     <Image src={components} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-third-color bg-fourth-color/50 p-2 rounded-lg"> Componentes. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:h-auto
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                     <Image src={peripherals} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-third-color bg-fourth-color/50 p-2 rounded-lg"> Perífericos </p>
                 </Link> 
             </li>
         </ul>
    )
 }

 export default Clasificaciones;