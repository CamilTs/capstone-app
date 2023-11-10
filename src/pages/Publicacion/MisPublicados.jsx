import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Column } from "primereact/column";
import { ContenedorMP, ContenedorTabla, Titulo } from "./components/StyledComponents";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";

export const MisPublicados = () => {
  const [publicacion, setPublicacion] = useState([]);
  const { id } = useSelector((state) => state.auth);

  const toast = useRef(null);

  const traerPublicacion = async () => {
    try {
      const response = await api.get(`publicacion/${id}`);
      const { data } = response;
      setPublicacion(data.data.publicacion);
      console.log(data.data.publicacion);
    } catch (error) {
      console.log(error);
      console.log("Se intento traer publicación");
    }
  };

  useEffect(() => {
    traerPublicacion();
  }, []);

  return (
    <ContenedorMP>
      <Titulo>Mis Publicados</Titulo>
      <ContenedorTabla>
        <DataTable value={publicacion} paginator rows={5} rowsPerPageOptions={[5, 10, 15]} scrollable scrollHeight="500px">
          <Column field="codigo_barra" header="Código Barra" />
          <Column field="nombre" header="Nombre" />
          <Column field="categoria" header="Categoría" />
          <Column field="precio" header="Precio" />
        </DataTable>
      </ContenedorTabla>
    </ContenedorMP>
  );
};
