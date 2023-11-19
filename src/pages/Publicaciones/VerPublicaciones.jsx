import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Column } from "primereact/column";
import { Contenedor, ContenedorMP, ContenedorTabla, Titulo } from "../Publicaciones/components/StyledVerPublicacion";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";

export const VerPublicaciones = () => {
    const [publicacion, setPublicacion] = useState([]);
    const { id } = useSelector((state) => state.auth);

    const toast = useRef(null);

    const traerPublicaciones = async () => {
        try {
            const response = await api.get(`publicacion`);
            const { data } = response;
            setPublicacion(data.data.publicacion);
            console.log(data.data.publicacion);
        } catch (error) {
            console.log(error);
            console.log("Se intento traer publicación");
        }
    };

    useEffect(() => {
        traerPublicaciones();
    }, []);

    return (
        <Contenedor>
        <div>
            <div style={{ width: '100%' }}>
                <h3>Filtro</h3>
                <div className="Barra filtro etiqueta">
                    <label htmlFor="buscador">Buscador:</label>
                    <input type="text" id="buscador" placeholder="Ingrese su búsqueda" />
                </div>
                <br />
                <div>
                    <label htmlFor="etiquetas">Etiquetas:</label>
                    <input type="text" id="etiquetas" placeholder="Ingrese etiquetas" />
                    <button>Buscar</button>
                </div>
            </div>
            
        </div>
        </Contenedor>
        
    );
};
