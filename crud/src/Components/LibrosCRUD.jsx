import react, {useEffect, useState} from "react";
import Tabla from "./Tabla";
import axios from "axios";


function LibrosCRUD(){

    const[libros, setLibros] = useState()

    useEffect(() => {
        cargarLibros()
    }, [])

    async function cargarLibros(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/libros")
            let data = await res.data

            setLibros(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return(
        <div>
            {libros=== undefined ?
                <div><h2>Cargando</h2>
                    <div className="spinner-border" role="status">
                        <span className="visible-hidden">Loading...</span>
                    </div>
                </div>                
            :
                <Tabla controlador={"libros"} lista={libros} cols={["ID", "Titulo", "Descripción", "Ediccion", "ISBN", "Autor ID", "Nombre", "Apellido"]} />
            }
        </div>
    )
}


export default LibrosCRUD