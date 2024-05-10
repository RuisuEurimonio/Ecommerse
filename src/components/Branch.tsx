import React, { useEffect, useState } from "react";
import branchFake from "@/utils/json/branchFake.json"
import CarouselSimple from "./CarouselSimple";

type BranchProps = {}

const data = branchFake;

const intervalMove = 5000;

const Branch : React.FC<BranchProps> = () => {

    return(
        <div className="custom_content">
            <h2 className="custom_title"> Aliados comerciales. </h2>
            <CarouselSimple data={data} intervalMove={intervalMove}/>
        </div>
    )
}

export default Branch;