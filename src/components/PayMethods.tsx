import fakePayMethods from "@/utils/json/fakePayMethods.json"
import CarouselSimple from "./CarouselSimple"

type PayMethodsProps = {
    id?: string
}

const data = fakePayMethods;

const PayMethods : React.FC<PayMethodsProps> = ({id}) => {
    return(
        <div className="my-2" id={id}>
            <h1 className="text-blue-mafer font-bold text-lg text-center my-1"> Metodos de pagos seguros. </h1>
            <CarouselSimple data={data} intervalMove={5000} />
        </div>
    )
}

export default PayMethods;