import AboutUs from "@/components/AboutUs";
import Branch from "@/components/Branch";
import Clasificaciones from "@/components/Clasficaciones";
import LatestDiscounts from "@/components/LatestDiscounts";
import MainCarousel from "@/components/MainCarousel";
import OurService from "@/components/OurService";

export default function Home() {
  return (
    <>
      <MainCarousel/>
      <Clasificaciones main/>
      <AboutUs/>
      <LatestDiscounts/>
      <OurService/>
      <Branch/>
    </>
  );
}
