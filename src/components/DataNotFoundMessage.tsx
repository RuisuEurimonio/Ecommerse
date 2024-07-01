import Link from "next/link"

type DataNotFoundMessageProps = {
    title: string,
    text: string,
    redirectLink : string
    redirectName: string
}

const DataNotFoundMessage : React.FC<DataNotFoundMessageProps> = ({title, text, redirectLink, redirectName}) => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <h1 className="font-bold text-center text-lg"> {title} </h1>
            <p className="text-center"> {text} </p>
            <Link href={redirectLink} className="font-bold underline text-blue-700 text-center"> {redirectName} </Link>
        </div>
    )
}

export default DataNotFoundMessage;