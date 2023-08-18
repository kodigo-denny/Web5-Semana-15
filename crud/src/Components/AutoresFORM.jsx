import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

function AutoresFORM({del}){

    const[nombre, setNombre] = useState('')
    const[apellido, setApellido] = useState('')
    const[pais, setPais] = useState('')

    const Navigate = useNavigate()
    const {id} = useParams()

    useEffect(() =>{
        if(id != undefined){
            //cargar datos
            cargarAutor()
        }
    }, [])

    async function cargarAutor(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores/"+id)
            let data = await res.data

            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function guardar(){
        try{
            let autor = {
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }
            
            let res = await axios.post("https://denny2023.azurewebsites.net/api/autores", autor)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/autores")
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function editar(){
        try{
            let autor = {
                autorId: id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            let res = await axios.put("https://denny2023.azurewebsites.net/api/autores", autor)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/autores")
            }
        }
        catch(error){
            //alert(error)
            console.log(error)
            if(error.response.status === 404 || error.response.status === 500){
                alert("El registro ya no existe")
                Navigate("/autores")
            }
                
        }
    }

    async function eliminar(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/autores?id="+id)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/autores")
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    function enviar(e){
        const form = document.querySelector("#formulario")
        e.preventDefault()
        e.stopPropagation()
        if (form.checkValidity()) {
            if(id === undefined)
                guardar()
            else if(del === undefined)
                editar()
            else
                eliminar()
        }

        form.classList.add('was-validated')
    }

    function cancelar(){
        Navigate("/autores")
    }

    return(
        <div>
            <form id="formulario" className="needs-validation" noValidate>
                {
                    id != undefined ?
                    <div className="form-group">
                        <label className="form-label">ID</label>
                        <input className="form-control" value={id} readOnly disabled />
                    </div>
                    :
                    ""
                }
                
                <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} type="text" required onChange={(e) => setNombre(e.target.value)} disabled={del=== undefined ? false : true} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Apellido</label>
                    <input className="form-control" value={apellido} type="text" required onChange={(e) => setApellido(e.target.value)} disabled={del=== undefined ? false : true} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Pais de origen</label>
                    <input className="form-control" value={pais} type="text" required onChange={(e) => setPais(e.target.value)} disabled={del=== undefined ? false : true} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <hr />
                <button className={"btn btn-" + (id===undefined ? "success" : del === undefined ? "primary" : "danger")} onClick={(e) => enviar(e)}>{id === undefined ? "Guardar" : del===undefined ? "Editar" : "Eliminar"}</button>
                <button className="btn btn-danger" onClick={cancelar}>Cancelar</button>
            </form>
        </div>
    )
}

export default AutoresFORM