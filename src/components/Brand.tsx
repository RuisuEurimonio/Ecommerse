import CarouselSimple from "./CarouselSimple";

import branchFake from "@/utils/json/branchFake.json"

type BranchProps = {}

const data = branchFake;  // TODO : delete this when we implement fetch data

const intervalMove = 5000;

const Branch : React.FC<BranchProps> = () => {

    return(
        <div className="custom_content">
            <h2 className="custom_title text-fifth-color"> Aliados comerciales. </h2>
            <CarouselSimple data={data} intervalMove={intervalMove}/>
        </div>
    )
}

export default Branch;