import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
//State para traer los que escribe el usuario desde el formulario
    const [recetas,guardarRecetas] = useState([]);
    const [busqueda,buscarRecetas] = useState({
        nombre:'',
        categoria:''
    })
    const [consultar,guardarConsultar] = useState(false);

    //Destruction para tomar los valores pasados
    const {nombre,categoria} = busqueda;

    useEffect(() => {
        if(nombre.trim()===''|| categoria.trim()==='') return;
        const obtenerRecetas = async () =>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
            const apiResultado = await axios(url);
            guardarRecetas(apiResultado.data.drinks);
        }
        obtenerRecetas();
    }, [busqueda])

    return ( 
        <RecetasContext.Provider
            value={{
                 recetas,
                 buscarRecetas,
                 guardarConsultar
                }}
        >
            {props.children}
        </RecetasContext.Provider>
        
        );
}
 
export default RecetasProvider;