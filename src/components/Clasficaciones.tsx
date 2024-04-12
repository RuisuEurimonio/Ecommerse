import React from "react";
import ferreteria from "@/assets/img/ferreteria.jpg"
import construccion from "@/assets/img/construccion.jpeg"
import seguridad from "@/assets/img/seguridad.jpg"
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
                     <Image src={ferreteria} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Ferreteria. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:h-auto
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                     <Image src={construccion} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Construcción. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:h-auto
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                     <Image src={seguridad} alt="" width={640} className="brightness-100 hover:brightness-75 transition object-cover h-full"/>
                     <p className="absolute z-20 font-bold text-white-mafer bg-black-mafer/50 p-2 rounded-lg"> Seguridad industrial. </p>
                 </Link> 
             </li>
         </ul>
    )
 }

 export default Clasificaciones;