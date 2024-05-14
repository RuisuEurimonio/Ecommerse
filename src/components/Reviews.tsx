import fakeReviews from "@/utils/json/fakeReviews.json"
import {ReviewsProps} from "@/types/Props"

type ReviewProps = {}

const data : ReviewsProps[] = fakeReviews;

const nombresMeses = [
    "En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dic"
  ];

const Reviews : React.FC<ReviewProps> = () => {
    return (
        <div>
            <h2 className="text-blue-mafer text-center font-bold text-lg"> Testimonios. </h2>
            <ul className="flex gap-5 w-full overflow-x-scroll">
                {data.slice(0,10).map((item)=>{
                let date = new Date(item.date)
                return(
                   <li key={item.id} className="shadow-2xl p-3 rounded-lg"> 
                        <div className="flex gap-3 items-center h-1/5">
                            <span className="size-8 p-4 border-2 flex justify-center items-center rounded-full font-bold text-xl border-black-mafer/50"> {item.first_name.slice(0,1)} </span>
                            <h3 className="text-sm"> {item.first_name} {item.last_name} </h3>
                            <p className="text-sm text-black-mafer/60 text-center"> {date.getDate().toString()} {nombresMeses[date.getMonth()]}</p>
                        </div>
                        <div className="my-2 flex flex-col h-4/5">
                            <p className="text-xs line-clamp-[10] text-justify"> {item.review} </p>
                            <div className="items-center">
                                <p className="inline"> {item.rank} </p>
                                <span className="inline text-xs"> ⭐⭐⭐⭐⭐ </span>
                            </div>
                            <p className={`px-4 border inline rounded-full text-sm ${item.rank >= 2.5 ? " border-green-400 text-green-400" : "border-red-400 text-red-400"}`}> {item.rank < 2.5 ? "-" : "+"} {item.key_points} </p>
                        </div>
                   </li> 
                )})}
            </ul>
        </div>
    )
}

export default Reviews;