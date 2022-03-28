import axios from 'axios';
import React,{createContext, useState,useEffect} from 'react';

export  const CategoriaContext = createContext();

const CategoriasProvider = (props) => {

    const [categorias,guardarCategorias] = useState([]);
    useEffect(() => {
        if(Object.keys(categorias).length === 1) return;
        
        const consultarApi = async ()=>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const api = await axios.get(url);
            guardarCategorias(api.data.drinks);
        }
        consultarApi();
    }, [])
    return ( 
        <CategoriaContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriaContext.Provider>

     );
}
 
export default CategoriasProvider;