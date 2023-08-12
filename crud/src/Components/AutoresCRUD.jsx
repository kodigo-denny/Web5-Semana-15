import React, {useState, useEffect} from "react";
import Tabla from "./Tabla";
import axios from "axios";

function AutoresCRUD(){

    const[autores, setAutores] = useState()

    useEffect(() =>{
        cargarAutores()
    }, [])

    async function cargarAutores(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores")
            let data = res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return(
        <div>
            {autores === undefined ?
                <div><h2>Cargando</h2>
                    <div className="spinner-border" role="status">
                        <span className="visible-hidden">Loading...</span>
                    </div>
                </div>                
            :
                <Tabla controlador={'autores'} lista={autores} cols={["ID", "Nombre", "Apellido", "Pais de Origen"]} />
            }
        </div>
    )
}

export default AutoresCRUD