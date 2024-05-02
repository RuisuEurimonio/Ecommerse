"use client";

import Clasificaciones from "@/components/Clasficaciones";
import HistoryNavigation from "@/components/HistoryNavigation";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type ProductLayoutProps = {
  children: any;
};

const rootPaths : {products: string, discounts: string, JOSC: string}  = {
  "products" : "Productos",
  "discounts" : "Descuentos",
  "JOSC" : "JOSC"
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
      {Object.entries(rootPaths).map(([pathEntity, namePath])=>{
        return(
          pathEntity === path.split("/")[1] && (
            <HistoryNavigation key={pathEntity} items={[{ names: namePath, url: "/"+pathEntity },{names:nameProduct}]} />
          )
        )
      })}
      <Clasificaciones />

      {children}
    </div>
  );
};

export default ProductsLayout;
