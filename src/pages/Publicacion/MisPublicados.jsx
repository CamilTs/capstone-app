import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Column } from "primereact/column";
import { ContenedorMP, ContenedorTabla, Titulo } from "./components/StyledComponents";
import { DataTable } from "primereact/datatable";

export const MisPublicados = () => {
  const [publicacion, setPublicacion] = useState([]);

  const toast = useRef(null);

  const traerPublicacion = async () => {
    try {
      const response = await api.get("publicacion");
      const { data } = response;
      setPublicacion(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Se intento traer publicación");
    }
  };

  // const overlay = (
  //   <div className="card flex justify-content-center">
  //     <Button type="button" icon="pi pi-image" label="imagen" onClick={(e) => op.current.toggle(e)} />
  //     <OverlayPanel ref={op}>
  //       <img id="imagen" src={publicacion.imagen} alt={publicacion.nombre} />
  //     </OverlayPanel>
  //   </div>
  // );

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
