"use client";

import Clasificaciones from "@/components/Clasficaciones";
import Filters from "@/components/Filters";
import HistoryNavigation from "@/components/HistoryNavigation";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type ProductLayoutProps = {
  children: any;
};

const ProductsLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const path = usePathname();

  return (
    <div
      className="w-11/12 m-auto
        md:w-4/5"
    >
      <HistoryNavigation items={[{ names: "Productos", url: "/productos" }]} />
      <Clasificaciones />

      {children}
    </div>
  );
};

export default ProductsLayout;
