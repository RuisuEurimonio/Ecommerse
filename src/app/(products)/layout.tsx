"use client";

import { usePathname, useSearchParams } from "next/navigation";

import AboutJosc from "@/components/AboutJOSC";
import Clasificaciones from "@/components/Clasficaciones";
import HistoryNavigation from "@/components/HistoryNavigation";

type ProductLayoutProps = {
  children: any;
};

const rootPaths : {products: string, discounts: string, ruisus: string}  = {
  "products" : "Productos",
  "discounts" : "Descuentos",
  "ruisus" : "Ruisus"
}


const ProductsLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  
  const path = usePathname();
  const searchPath = useSearchParams();
  const nameProduct = searchPath.get("name") || "" as string;

  return (
    <div
      className="w-11/12 m-auto
        md:w-4/5"
    >
      {path != "/JOSC" && (
        <>
        {Object.entries(rootPaths).map(([pathEntity, namePath])=>{
          return(
            pathEntity === path.split("/")[1] && (
              <HistoryNavigation key={pathEntity} items={[{ names: namePath, url: "/"+pathEntity },{names:nameProduct}]} />
            )
          )
        })}
        <Clasificaciones />
        </>
      )}
      
      {path === "/JOSC" &&
        <AboutJosc fullContent={false}/>
      }

      {children}
    </div>
  );
};

export default ProductsLayout;
