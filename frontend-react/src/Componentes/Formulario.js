// Usaré useState para trabajar estados en funciones
import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Formulario(){

    const [departamento , setDepartamento] = useState([]);

    // Parte 1: Defino el estado: idCiudades y el método setIdCiudades que cambiará el estado
    // y luego los inicializo en -1 porq' los indices arrancan desde 0
    const [idCiudades, setIdCiudades] = useState(-1);

    // Difino estado de todos los campos y botón
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [state,setState] = useState();
    const [city,setCity] = useState();

    const submit = async(e) => {
      e.preventDefault();
      const newContacto = {name,email,state,city}
        await Axios.post('http://localhost:3002/contacto/create', newContacto);
      
        // Confirmación de envio exitoso
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu información ha sido recibida satisfactoriamente',
          showConfirmButton: false,
          timer: 2000
        })
    };

    // Parte 2: Defino el Handler
    const handlerCargarCiudades = function (e) 
    {
        // Capturo el indice de la opción que selecciona el usuario en los departamentos
        const indice = e.target.value;
        console.log("indice key:"+indice);

        // Cambio el valor  de idCiudades a través del método setIdCiudades
        setIdCiudades(indice);
    }

    // Consumir API a través de useEffect
    useEffect(() => 
    {
        console.log('useEffect - Skr');
        obtenerDatos()
    }, [])

    // Creo un arreglo de objetos al que llamaré obtenerDatos
    const obtenerDatos = async () => 
        {
            //  ej: https://jsonplaceholder.typicode.com/users  const url = 'https://cors-anywhere.herokuapp.com/https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json';
            const data = await fetch('https://raw.githubusercontent.com/skrpions/Colombia/master/colombia.json')
            // Transformo los datos a json
            const categorias = await data.json()
            //console.log('categorias',categorias);  
            setDepartamento(categorias)
        }

    return (
      <form className="shadow" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="state">Departamento*</label>
          <select className="form-control" name="register-state" id="register-state" onChange={(e) => setState(e.target.value)} onClick={handlerCargarCiudades}>
            <option value={-1}>Seleccione Departamento</option>
            {
                departamento.map((item,i)=>(
                <option key={"departamento"+i} value={i}>{item.departamento}</option>
                ))
            }
          </select>
      
           
        </div>

        <div className="form-group">
          <label htmlFor="city">Ciudad*</label>
          <select className="form-control" id="register-city" name="register-city" onChange={(e) => setCity(e.target.value)}>
            {
                idCiudades > -1 &&
                (
                departamento[idCiudades].ciudades.map((item,i)=>
                    (
                    <option key={"ciudad"+i} value={item.ciudades}>{item}</option>
                    ))
                )
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombre*</label>
          <input type="text" className="form-control" name="register-name" id="register-name" size="50" onChange={(e) => setName(e.target.value)} placeholder="Pepito de Jesús"  required/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo*</label>
          <input type="email" className="form-control" name="register-email" id="register-email" size="30" onChange={(e) => setEmail(e.target.value)} placeholder="Pepitodejesus@gmail.com" required/>
        </div>

        <button name="enviar" type="submit" className="btn">Enviar</button>

      </form>
    )
} 
export default Formulario