import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import {
  ContenedorProveedores,
  ContenedorHeader,
  ContenedorBoton,
  Formulario,
  ContenedorInput,
  Campos,
  ContenedorFormulario,
  ContenedorBotonProveedor,
} from "./components/StyledAgregarProveedor";
import { api } from "../../api/api";
import { useFormik } from "formik";
import { ProveedorSchema } from "../../components/Validaciones";
import { useSelector } from "react-redux";
import { InputContainer } from "../../components/InputContainer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomConfirmDialog } from "../../components/CustomConfirmDialog";

export const AgregarProveedores = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { id } = useSelector((state) => state.auth);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    telefono: "",
    correo: "",
    clienteId: id,
  });
  const toast = useRef(null);
  const [proveedor, setProveedor] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [proveedorId, setProveedorId] = useState("");
  const [verEliminar, setVerEliminar] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [verLimpiar, setVerLimpiar] = useState(false);

  const verFormulario = () => {
    formik.resetForm();
    setMostrarFormulario(true);
  };

  const limpiarFormulario = () => {
    formik.resetForm(
      setFormulario({
        ...formulario,
      }),
      toast.current.show({
        severity: "info",
        summary: "Se limpio correctamente",
        detail: `Se limpio el formulario`,
        life: 2000,
      }),
      setVerLimpiar(false)
    );
  };

  const eliminarProveedor = async (proveedorId) => {
    setProveedorId(proveedorId);
    setVerEliminar(true);
  };

  const traerMisProveedores = async () => {
    setLoading(true);
    try {
      const response = await api.get(`proveedor/${id}`);
      const { data } = response;
      console.log(data);
      setProveedor(data.data);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los proveedores");
    } finally {
      setLoading(false);
    }
  };

  const agregarProveedor = async () => {
    try {
      const response = await api.post("proveedor", {
        ...formik.values,
      });
      const { data } = response;
      toast.current.show({
        severity: "success",
        summary: "Se agrego correctamente",
        detail: `Se agrego al proveedor: ${data.data.nombre}`,
        life: 2000,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar al proveedor");
    } finally {
      traerMisProveedores();
      setVerConfirmar(false);
      setMostrarFormulario(false);
    }
  };

  const borrarProveedor = async () => {
    try {
      const { data } = await api.delete(`proveedor/${proveedorId}`);

      toast.current.show({
        severity: "info",
        summary: "Se elimino correctamente",
        detail: `Se elimino al proveedor: ${data.data.nombre}`,
        life: 2000,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento eliminar al proveedor");
    } finally {
      traerMisProveedores();
      setVerEliminar(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },

    validationSchema: ProveedorSchema,

    onSubmit: (data) => {
      console.log(data);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? <div className="p-error">{formik.errors[name]}</div> : null;
  };

  const botonesOpciones = (rowData) => {
    return (
      <ContenedorBotonProveedor>
        <Button raised outlined severity="info" icon="pi pi-pencil" rounded />
        <Button raised outlined severity="danger" icon="pi pi-trash" rounded onClick={() => eliminarProveedor(rowData._id)} />
      </ContenedorBotonProveedor>
    );
  };

  useEffect(() => {
    traerMisProveedores();
  }, []);

  return (
    <ContenedorProveedores>
      <Toast ref={toast} />
      <ContenedorHeader>
        <Button raised label="Agregar Proveedor" severity="success" icon="pi pi-plus" onClick={verFormulario} />
        <Button raised severity="info" icon="pi pi-refresh" onClick={traerMisProveedores} />
      </ContenedorHeader>

      <DataTable value={proveedor} paginator rows={5} rowsPerPageOptions={[5, 10, 15]} scrollable scrollHeight="500px" loading={Loading}>
        <Column field="nombre" header="Nombre" />
        <Column field="descripcion" header="Descripción" />
        <Column field="telefono" header="Telefono" />
        <Column field="correo" header="Correo" />
        <Column header="Opciones" body={botonesOpciones} />
      </DataTable>

      <Dialog visible={mostrarFormulario} onHide={() => setMostrarFormulario()} header="Agregar Proveedor">
        <ContenedorFormulario>
          <Formulario onSubmit={formik.handleSubmit}>
            <ContenedorInput>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputContainer
                  type="text"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
                <div>{getFormErrorMessage("nombre")}</div>
              </Campos>
              <Campos>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  style={{
                    resize: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "15px",
                    outline: "none",
                    color: "#333",
                  }}
                  name="descripcion"
                  placeholder="Ingrese la descripción del proveedor"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.descripcion}
                  rows={5}
                />
                {getFormErrorMessage("descripcion")}
              </Campos>
              <Campos>
                <label htmlFor="telefono">Número de teléfono</label>
                <InputContainer
                  name="telefono"
                  type={"number"}
                  placeholder="El telefono debe llevar '9' al inicio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                />
                {getFormErrorMessage("telefono")}
              </Campos>
              <Campos>
                <label htmlFor="correo">Correo</label>
                <InputContainer
                  name="correo"
                  type={"email"}
                  placeholder="Ingrese el correo del proveedor"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.correo}
                />
                {getFormErrorMessage("correo")}
              </Campos>
            </ContenedorInput>
          </Formulario>
          <ContenedorBoton>
            <Button label="Guardar" severity="success" icon="pi pi-check" onClick={() => setVerConfirmar(true)} />
            <Button label="Limpiar" severity="danger" icon="pi pi-trash" onClick={() => setVerLimpiar(true)} />
          </ContenedorBoton>
        </ContenedorFormulario>
      </Dialog>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar()}
        onConfirm={agregarProveedor}
        message="¿Confirmar creación?"
        header="Confirmar"
      />

      <CustomConfirmDialog
        visible={verEliminar}
        onHide={() => setVerEliminar()}
        onConfirm={borrarProveedor}
        message="¿Estás seguro de eliminar el proveedor?"
        header="Eliminar"
      />

      <CustomConfirmDialog
        visible={verLimpiar}
        onHide={() => setVerLimpiar(false)}
        onConfirm={limpiarFormulario}
        message="¿Seguro de limpiar el formulario?"
        header="Limpiar"
      />
    </ContenedorProveedores>
  );
};
