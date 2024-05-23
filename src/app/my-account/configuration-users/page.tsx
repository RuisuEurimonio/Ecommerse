import usersFake from "@/utils/json/usersFake.json";

type ConfigurationUsersProps = {};

const data = usersFake;

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {
    return (
        <div
            className="
                            md:basis-[85%]
                        "
        >
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2"> Usuarios. </h2>
                <div className="w-full overflow-x-auto">
                    <table className=" table-auto px-10">
                        <thead className="bg-blue-mafer text-white text-sm py-2">
                            <tr>
                                <th> # </th>
                                <th> Tipo documento. </th>
                                <th> Documento. </th>
                                <th> Nombres. </th>
                                <th> Apellidos. </th>
                                <th> celular. </th>
                                <th> Correo. </th>
                                <th> Permisos. </th>
                                <th> Opciones. </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0,15).map((data)=>(
                                <tr key={data.id} className="text-center odd:bg-blue-mafer/10">
                                    <td> {data.id} </td>
                                    <td> {data.tipoDocumento} </td>
                                    <td> {data.numeroDocumento} </td>
                                    <td> {data.nombres} </td>
                                    <td> {data.apellidos} </td>
                                    <td> {data.celular} </td>
                                    <td> {data.correo} </td>
                                    <td> {data.permisos} </td>
                                    <td> 
                                        <button className="mx-1"> <span className="icon icon-delete"> </span> </button> 
                                        <button className="mx-1"> <span className="icon icon-edit"> </span> </button> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                <button className="float-right"></button>   
                </div>
            </div>
        </div>
    );
};

export default ConfigurationUsers;
