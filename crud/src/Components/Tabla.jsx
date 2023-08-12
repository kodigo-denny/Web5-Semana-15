import React, {useEffect} from "react";
import { Link } from "react-router-dom";

function Tabla({lista, cols, controlador}){

    /*
    useEffect(() => {
        //console.log(lista)
        //console.log(cols)
        lista.map((value, index) => {
            console.log(value)
            console.log(Object.values(value))
        })
    }, [])*/

    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            <Link to={`/${controlador}/new`} className="btn btn-success">Nuevo</Link>
                        </th>
                        {
                            cols.map((value, index) =>{
                                return <th key={index}>{value}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((value, index) => {
                            return <tr key={index}>
                                <td>
                                    <Link to={`/${controlador}/edit/${Object.values(value)[0]}`} className="btn btn-primary">Editar</Link>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                                {
                                    Object.values(value).map((value2, index2)=>{
                                        return <td key={index2}>{value2}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    {
                        cols.map((value, index) =>{
                            return <th key={index}>{value}</th>
                        })
                    }
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Tabla