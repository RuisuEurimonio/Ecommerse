type NoDataTableProps = {
    titleName? : string,
    message: string
    secondaryMessage?: string
}

const NoDataTable : React.FC<NoDataTableProps> = ({message, titleName, secondaryMessage}) =>{
    return(
        <table className="table-fixed w-full">
            <thead className="bg-secondary-color text-white text-sm
                    xl:text-base">
                <tr>
                    <th> {titleName ? titleName : "Error"} </th>
                </tr>
            </thead>
            <tbody>
                <tr className="text-center odd:bg-secondary-color/10  break-words text-xs
                                xl:text-sm">
                    <td> {message} </td>
                </tr>
                {secondaryMessage && <tr className="text-center odd:bg-secondary-color/10  break-words text-xs
                                xl:text-sm">
                    <td> {secondaryMessage} </td>
                </tr>}
            </tbody>
        </table>
    )
}

export default NoDataTable;