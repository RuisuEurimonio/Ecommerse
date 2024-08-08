const AboutUs = React.lazy(()=> import("@/components/AboutUs"));
const Brand = React.lazy(()=> import("@/components/Brand"));
import Clasificaciones from "@/components/Clasficaciones";
import LoadingItem from "@/components/LoadingItem/LoadingItem";
const LatestDiscounts = React.lazy(()=> import("@/components/LatestDiscounts"));
import MainCarousel from "@/components/MainCarousel";
const OurService =  React.lazy(()=>import("@/components/OurService"));
import React, { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainCarousel/>
      <Clasificaciones main/>
      <Suspense fallback={<LoadingItem/>}>
        <AboutUs/>
      </Suspense>
      <Suspense fallback={<LoadingItem/>}>
        <LatestDiscounts/>
      </Suspense>
      <Suspense fallback={<LoadingItem/>}>
        <OurService/>
      </Suspense>
      <Suspense fallback={<LoadingItem/>}>
        <Brand/>
      </Suspense>
    </>
  );
}
