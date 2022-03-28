import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react';

//Creando el context
export const ModalContext = createContext();




const ModalProvider = (props) => {

    //State para almacenar el id pasado desde el button de Receta
    const [recetaId,guardarRecetaId]=useState(null);
    //State para llevar la informacion a receta
    const [informacion,guardarInformacion]=useState({});
    //UseEffect para cada vez que se presione el botton se llame a la api

    useEffect(() => {
        if(recetaId===null) return;
      const obtenerReceta = async () =>{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recetaId}`;
        const api= await axios(url);
        guardarInformacion(api.data.drinks[0]);
      }
      obtenerReceta();
    }, [recetaId])
    
    return (
        <ModalContext.Provider
            value={
                {
                    informacion,
                    guardarInformacion,
                    guardarRecetaId
                }
            }
        >
            {props.children}
        </ModalContext.Provider>
      );
}
 
export default ModalProvider;
