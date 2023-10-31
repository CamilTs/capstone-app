import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { ContenedorMP, ContenedorTabla, Titulo } from "./components/StyledComponents";

export const MisPublicados = () => {
  const [publicacion, setPublicacion] = useState([]);

  const toast = useRef(null);
  const mostrar = () => {
    toast.current.show({ severity: "info", summary: "Eliminado", detail: "Producto Eliminado", life: 2000 });
  };

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

  // const op = useRef(null);

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
          <Column field="codigo_barra" header="Codigo Barra" />
          <Column field="nombre" header="Nombre" />
          <Column field="categoria" header="Categoria" />
          <Column field="precio" header="Precio" />
          {/* <Column flied="imagen" header="Imagen" body={overlay} /> */}
        </DataTable>
      </ContenedorTabla>
    </ContenedorMP>
  );
};
