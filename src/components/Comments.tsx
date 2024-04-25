import Image from "next/image";
import React from "react";
import image from "@/assets/img/imageNotFound.jpg"
import usersFake from "@/utils/json/usersFake.json"

const data = usersFake;

type CommentsProps = {

}

const Comments : React.FC<CommentsProps> = () => {
    return(
        <>
        <h3 className="text-lg font-bold"> Comentarios. </h3>
            {data.slice(1,5).map((user)=>(
                <div key={user.id} className="flex flex-row gap-2 my-2">
                    <div className="basis-1/4">
                        <Image src={image} alt={""} className="rounded-full"></Image>
                    </div>
                    <div className="basis-3/4">
                        <h4 className="text-sm font-bold"> {user.nombres} {user.apellidos} </h4>
                        <ul className="flex flex-row text-xs"> 
                            <li> ⭐⭐⭐⭐⭐ </li>
                        </ul>
                        <p className="text-sm text-justify my-2"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi fugiat autem odit! Quae neque minus voluptates ut deserunt fugit recusandae voluptatum non voluptate officia, totam incidunt facilis quos, earum saepe! </p>
                    </div>
                </div>
            ))}
            <div className="flex flex-row-reverse justify-center">
                <button className="py-1 px-3 mb-2 bg-black-mafer/80 text-white-mafer hover:bg-black-mafer"> Escribir una opinión. </button>
            </div>
        </>
    )
}

export default Comments;