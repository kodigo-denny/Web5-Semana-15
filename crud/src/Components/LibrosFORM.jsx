import react, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function LibrosFORM(){
//Titulo	Descripción	Ediccion	ISBN	Autor ID

    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[ediccion, setEdiccion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState("")
    const[autores, setAutores] = useState()

    const Navigate = useNavigate()
    const {id} = useParams()

    useEffect(() =>{
        cargarAutores()
        console.log(id)
        if(id !== undefined)
            cargarLibro()
        //console.log(autores)
    },[])

    useEffect(() =>{
        //console.log(autorId)
    }, [autorId])

    useEffect(() => {
        //console.log(autores)
    }, [autores])

    async function cargarLibro(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/libros/"+id)
            let data = await res.data

            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setEdiccion(data.edicion)
            setIsbn(data.isbn)
            setAutorId(data.autorId)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function cargarAutores(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores")
            let data = await res.data
            
            setAutores(data)
            //console.log(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function guardar(){
        try{
            let libro = {
                titulo: titulo,
                descripcion: descripcion,
                edicion: ediccion,
                isbn: isbn,
                autorId: autorId
              }

              let res = await axios.post("https://denny2023.azurewebsites.net/api/libros", libro)
              let data = await res.data

              if(data.status === 1){
                alert(data.message)
                Navigate("/libros")
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
            //if(id === undefined)
                guardar()
            /*else if(del === undefined)
                editar()
            else
                eliminar()*/
        }

        form.classList.add('was-validated')
    }

    function cancelar(){
        Navigate("/libros")
    }

    return(
        <div>
            <form id="formulario" className="needs-validation" noValidate>
                <div className="form-group">
                    <label className="form-label">Titulo</label>
                    <input type="text" className="form-control" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                     <label className="form-label">Descripción</label>
                     <input type="text" className="form-control" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                     <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Edicción</label>
                    <input type="text" className="form-control" required value={ediccion} onChange={(e) => setEdiccion(e.target.value)} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-control" required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Autor</label>
                    <select className="form-select" value={autorId} required onChange={(e) => setAutorId(e.target.value)}>
                        <option value="">No seleccionado</option>
                        {
                            autores === undefined ?
                            ""
                            :
                            autores.map((value, index) => {
                                return <option value={value.autorId} key={index}>{value.nombre} {value.apellido}</option>
                            })
                        }
                    </select>
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <hr />
                <button onClick={(e) => enviar(e)} className="btn btn-success">Guardar</button>
                <button onClick={cancelar} className="btn btn-danger">Cancelar</button>
            </form>
        </div>
    )
}

export default LibrosFORM