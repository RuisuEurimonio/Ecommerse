import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import HistoryNavigation from "@/components/HistoryNavigation";

import fakeNewsletters from "@/utils/json/fakeNewsletters.json"

const Event = ({params}:Params) => {

    const dataEvent = fakeNewsletters.find((item => item.id === parseInt(params.id))) //TODO delete this when we implement fetch data

    return(
        <div className="w-11/12 m-auto
            md:w-4/5">
            <HistoryNavigation items={[{names:"Eventos",url:"/events"},{names:dataEvent?.title || "Not found", url:"#"}]}/>
            <p className="text-end text-sm my-1"> {dataEvent?.date} </p>
            <h2 className="my-2 text-lg text-blue-mafer font-bold text-center"> {dataEvent?.title || "Not found"} </h2>
            <h3 className="my-1 text-base text-blue-mafer/70 font-semibold"> {dataEvent?.Subtitle || "Not found"} </h3>
            <Image src={dataEvent?.img||""} alt="" width={1024} height={200} className="m-auto object-cover" style={{width:"100%"}}/> 
            <p className="my-2 text-justify"> {dataEvent?.text} </p>
        </div>
    )

}

export default Event;