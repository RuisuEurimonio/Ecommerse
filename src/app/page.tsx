import AboutJosc from "@/components/AboutJOSC";
import Branch from "@/components/Branch";
import Clasificaciones from "@/components/Clasficaciones";
import LatestDiscounts from "@/components/LatestDiscounts";
import MainCarousel from "@/components/MainCarousel";
import OurService from "@/components/OurService";

export default function Home() {
  return (
    <>
      <MainCarousel/>
      <Clasificaciones/>
      <AboutJosc/>
      <LatestDiscounts/>
      <OurService/>
      <Branch/>
    </>
  );
}
