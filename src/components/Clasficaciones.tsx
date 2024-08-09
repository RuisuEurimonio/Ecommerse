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
                 md:flex-[33.3333%] md:35vh
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full">
                    <div style={{position: 'relative', width: '100%', height:'100%'}}>
                        <Image src={setup}
                               alt="" 
                               fill
                               style={{objectFit: 'cover'}}
                               sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               className="brightness-100 hover:brightness-75 transition object-cover h-full"
                        />

                    </div>
                    <p className="absolute z-20 font-bold text-fifth-color bg-principal-color p-2 rounded-lg"> Setups. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:35vh
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                 <div style={{position: 'relative', width: '100%', height:'100%'}}>
                     <Image src={components}
                            alt="" 
                            fill
                            style={{objectFit: 'cover'}}
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="brightness-100 hover:brightness-75 transition object-cover h-full"
                    />
                    </div>
                    <p className="absolute z-20 font-bold text-fifth-color bg-principal-color p-2 rounded-lg"> Componentes. </p>
                 </Link> 
             </li>
             <li className={`flex-[100%] flex-grow-0 h-14
                 md:flex-[33.3333%] md:35vh
                 ${(main) ? "md:h-48" : "md:h-28"} 
                 ${(main) ? "lg:h-60" : "lg:h-44"}
             `}> 
                 <Link href="/" className="relative flex justify-center items-center h-full ">
                 <div style={{position: 'relative', width: '100%', height:'100%'}}>
                     <Image src={peripherals}
                            alt="" 
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{objectFit: 'cover'}}
                            className="brightness-100 hover:brightness-75 transition object-cover h-full"
                    />
                    </div>
                    <p className="absolute z-20 font-bold text-fifth-color bg-principal-color p-2 rounded-lg"> Perífericos </p>
                 </Link> 
             </li>
         </ul>
    )
 }

 export default Clasificaciones;