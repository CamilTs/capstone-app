import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Column } from "primereact/column";
import { ContenedorMP, ContenedorTabla, Formulario, Titulo } from "./components/StyledComponents";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { formatoCurrencyCLP } from "../../components/Formatos";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../components/CustomConfirmDialog";
import { Dialog } from "primereact/dialog";
import { InputContainer } from "../../components/InputContainer";
import { useFormik } from "formik";
import { Message } from "primereact/message";
import { publicacionSchema } from "../../components/Validaciones";

export const MisPublicados = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [publicacion, setPublicacion] = useState([]);
  const [publicacionEditar, setPublicacionEditar] = useState([{}]);
  const [verEliminar, setVerEliminar] = useState(false);
  const [publicacionID, setPublicacionID] = useState(null);
  const { id } = useSelector((state) => state.auth);
  const toast = useRef(null);

  const verFormulario = (publicacion) => {
    setPublicacionEditar(publicacion);
    formik.setValues(publicacion);
    setMostrarFormulario(true);
  };

  const traerPublicacion = async () => {
    try {
      const response = await api.get(`publicacion/${id}`);
      const { data } = response;
      setPublicacion(data.data);
      if (data.data.length === 0) {
        toast.current.show({
          severity: "warn",
          summary: "Sin publicaciones",
          detail: "No tienes publicaciones",
          life: 2000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `${error.response.data.message}`,
        life: 2000,
      });
    }
  };

  const eliminarPublicacion = async () => {
    try {
      const response = await api.delete(`publicacion/${publicacionID}`);
      const { data } = response;
      console.log(data);
      toast.current.show({
        severity: "info",
        summary: "Eliminado",
        detail: "Se ha eliminado la publicación",
        life: 2000,
      });
      traerPublicacion();
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "warn",
        summary: "Error",
        detail: `${error.response.data.message}`,
        life: 2000,
      });
    } finally {
      setVerEliminar(false);
      traerPublicacion();
    }
  };

  const eliminarPublicaciones = async (publicacionID) => {
    setPublicacionID(publicacionID);
    setVerEliminar(true);
  };

  const editarPublicacion = async () => {
    try {
      const response = await api.put(`publicacion/${publicacionEditar._id}`, {
        ...formik.values,
      });
      const { data } = response;
      console.log(data);
      toast.current.show({
        severity: "info",
        summary: "Publicación actualizada",
        detail: "Se actualizó la publicación",
        life: 2000,
      });
      setMostrarFormulario(false);
      traerPublicacion();
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "warn",
        summary: "Error",
        detail: "No se pudo actualizar la publicación",
        life: 2000,
      });
    } finally {
      setMostrarFormulario(false);
    }
  };

  const imageBodyTemplate = (rowData) => {
    return <img style={{ objectFit: "cover" }} src={rowData.imagen} alt={rowData.imagen} width="80" height="80" />;
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: Number(""),
      codigo_barra: "",
      categoria: null,
      imagen: "",
      proveedorId: id,
    },
    validationSchema: publicacionSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="absolute" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };

  useEffect(() => {
    traerPublicacion();
  }, []);

  return (
    <ContenedorMP>
      <Toast ref={toast} />
      <Titulo>Mis Publicados</Titulo>
      <ContenedorTabla>
        <DataTable
          footer={`Total de publicaciones: ${publicacion.length}`}
          className="p-datatable-lg p-datatable-gridlines shadow-4"
          emptyMessage="Sin publicaciones..."
          value={publicacion}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable
          scrollHeight="500px"
        >
          <Column field="codigo_barra" header="Código Barra" />
          <Column header="Imagen" body={imageBodyTemplate} />
          <Column field="nombre" header="Nombre" />
          <Column field="categoria" header="Categoría" />
          <Column field="precio" header="Precio" body={(e) => formatoCurrencyCLP(e.precio)} />
          <Column
            header="Acciones"
            body={(rowData) => {
              return (
                <div className="flex gap-2">
                  <Button icon="pi pi-pencil" severity="warning" rounded raised outlined onClick={() => verFormulario(rowData)} />
                  <Button icon="pi pi-trash" severity="danger" rounded raised outlined onClick={() => eliminarPublicaciones(rowData._id)} />
                </div>
              );
            }}
          />
        </DataTable>
      </ContenedorTabla>

      <Dialog
        header="Editar Publicación"
        visible={mostrarFormulario}
        style={{ width: "32rem", height: "42rem" }}
        onHide={() => setMostrarFormulario(false)}
        footer={
          <>
            <Button
              label="Actualizar"
              icon="pi pi-check"
              severity="warning"
              raised
              rounded
              onClick={editarPublicacion}
              disabled={
                publicacionEditar.nombre === formik.values.nombre &&
                publicacionEditar.categoria === formik.values.categoria &&
                publicacionEditar.precio === formik.values.precio
              }
            />
            <Button label="Cancelar" icon="pi pi-times" severity="danger" raised rounded onClick={() => setMostrarFormulario(false)} />
          </>
        }
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-column">
          <div className="flex flex-column gap-2">
            <div className="flex justify-content-center">
              {publicacionEditar.imagen && (
                <img src={publicacionEditar.imagen} alt={publicacionEditar.imagen} width="200" height="200" style={{ objectFit: "cover" }} />
              )}
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="codigo_barra">Código de barra</label>
              <InputContainer id="codigo_barra" name="codigo_barra" value={publicacionEditar.codigo_barra} disabled />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="nombre">Nombre</label>
              <InputContainer
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre de la publicación..."
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {getFormErrorMessage("nombre")}
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="categoria">Categoría</label>
              <InputContainer
                id="categoria"
                name="categoria"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.categoria}
              />
              {getFormErrorMessage("categoria")}
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="precio">Precio</label>
              <InputContainer
                id="precio"
                name="precio"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
                mode="decimal"
                showButtons
                min={0}
                max={10000}
              />
              {getFormErrorMessage("precio")}
            </div>
          </div>
        </form>
      </Dialog>

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={eliminarPublicacion}
        message="¿Estás seguro de eliminar la publicación?"
        header="Eliminar"
      />
    </ContenedorMP>
  );
};
