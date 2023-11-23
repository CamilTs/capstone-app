import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Column } from "primereact/column";
import { Contenedor, ContenedorMP, ContenedorTabla, Titulo } from "../Publicaciones/components/StyledVerPublicacion";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const MisPublicados = () => {
    const [publicacion, setPublicacion] = useState([]);
    const [search, setSearch] = useState('');
    const toast = useRef(null);

    const traerPublicacion = async () => {
        try {
            const response = await api.get(`publicacion`);
            const { data } = response;
            console.log(data)
            setPublicacion(data.data);
            console.log(data.data.publicacion);
        } catch (error) {
            console.log(error);
            console.log("Se intento traer publicación");
        }
    };
    const imagenBodyTemplate = (rowData) => {
        return Array.isArray(rowData.imagen) ? rowData.imagen.map((imagenUrl, index) => 
            <img key={index} src={imagenUrl} alt={`imagen ${index + 1}`} width="80px" className="shadow-4" />
        ) : null;
    };
    useEffect(() => {
        traerPublicacion();
    }, []);
    const handleSearch = () => {
        setFilteredPosts(
            publicacion.filter(post =>
                post.titulo.toLowerCase().includes(search.toLowerCase())
            )
        );
    };

    return (
        <Contenedor>
            <Titulo>Publicaciones</Titulo>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <input
                    type="text"
                    placeholder="Busqueda"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {publicacion.map((post, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                        <h2>{post.nombre}</h2>
                        <img src={post.imagen} alt={`Imagen ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                        <p style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold' }}>${post.precio.toLocaleString('de-DE')}</p>
                    </div>
                ))}
            </div>
        </Contenedor>
    );
}
export default MisPublicados;