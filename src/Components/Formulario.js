import React,{useContext,useState} from 'react';
import { CategoriaContext } from '../Context/CategoriasContext';
import { RecetasContext } from '../Context/RecetasContext';

const Formulario = () => {
    //Destruction para sacarlo de context
    const {categorias} = useContext(CategoriaContext);
    const {buscarRecetas,guardarConsultar} =useContext(RecetasContext);


    //State para almacenar los datos pasado por el user in the formulary
    const [busqueda,guardarBusquedad] = useState({
        nombre:'',
        categoria:''
    })
    //Funcion para el onChanged
     const obtenerDatosRecetas= e => {
        guardarBusquedad({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }

  
    return ( 
        <form
             className="col-12"
             onSubmit={ e => {
                 
                 e.preventDefault();
                 buscarRecetas(busqueda)
                 guardarConsultar(true);
                 }}
        >
            <fieldset className="text-center">
                <legend>Buscar bebidas por Categoria o Ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                       onChange={obtenerDatosRecetas}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosRecetas}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria =>(
                            <option
                               key={categoria.strCategory}
                               value={categoria.strCategory}
                            >
                                {categoria.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;