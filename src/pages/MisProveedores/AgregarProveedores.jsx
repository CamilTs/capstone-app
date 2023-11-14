import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
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

const AgregarProveedores = () => {
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

  const verFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(true);
  };

  const ocultarFormulario = () => {
    setMostrarFormulario();
  };

  const limpiarFormulario = () => {
    formik.resetForm(
      setFormulario({
        ...formulario,
      })
    );
  };

  const eliminarProveedor = async (proveedorId) => {
    setProveedorId(proveedorId);
    confirmarEliminar();
  };

  const traerProveedores = async () => {
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
      limpiarFormulario();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Proveedor agregado",
        life: 3000,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar al proveedor");
    } finally {
      traerProveedores();
    }
  };

  const borrarProveedor = async () => {
    try {
      const { data } = await api.delete(`proveedor/${proveedorId}`);
      console.log(data);
      toast.current.show({ severity: "info", summary: "Éxito", detail: "Proveedor eliminado", life: 3000 });
    } catch (error) {
      console.log(error);
      console.log("se intento eliminar al proveedor");
    } finally {
      traerProveedores();
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

  const confirmarGuardado = () => {
    confirmDialog({
      message: "¿Está seguro que desea guardar el formulario?",
      header: "Confirmar",
      icon: "pi pi-question-circle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (formik.values.nombre != "" && formik.values.descripcion != "" && formik.values.telefono != "" && formik.values.correo != "") {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "Formulario Guardado",
            life: 3000,
          });
          agregarProveedor();
          ocultarFormulario();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ops! Algo salió mal, revise los campos",
            life: 3000,
          });
        }
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Creación cancelada",
          life: 3000,
        });
      },
    });
  };

  const confirmarLimpiar = () => {
    confirmDialog({
      message: "¿Está seguro que desea limpiar el formulario?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        toast.current.show({
          severity: "info",
          summary: "Éxito",
          detail: "Formulario Limpiado",
          life: 3000,
        });
        limpiarFormulario();
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Limpieza cancelada",
          life: 3000,
        });
      },
    });
  };

  const confirmarEliminar = () => {
    confirmDialog({
      message: "¿Está seguro que desea eliminar el proveedor?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-success",
      acceptLabel: "Si",
      acceptIcon: "pi pi-check",
      rejectClassName: "p-button-danger",
      rejectLabel: "No",
      rejectIcon: "pi pi-times",
      accept: () => {
        toast.current.show({
          severity: "info",
          summary: "Éxito",
          detail: "Proveedor eliminado",
          life: 3000,
        });
        borrarProveedor();
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Eliminación cancelada",
          life: 3000,
        });
      },
    });
  };

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

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  useEffect(() => {
    traerProveedores();
  }, []);

  return (
    <ContenedorProveedores>
      <Toast ref={toast} />
      <ContenedorHeader>
        <Button raised label="Agregar Proveedor" severity="success" icon="pi pi-plus" onClick={verFormulario} />
        <Button raised severity="info" icon="pi pi-refresh" onClick={traerProveedores} />
      </ContenedorHeader>

      <DataTable value={proveedor} paginator rows={5} rowsPerPageOptions={[5, 10, 15]} scrollable scrollHeight="500px" loading={Loading}>
        <Column field="nombre" header="Nombre" />
        <Column field="descripcion" header="Descripción" />
        <Column field="telefono" header="Telefono" />
        <Column field="correo" header="Correo" />
        <Column header="Opciones" body={botonesOpciones} />
      </DataTable>

      <Dialog visible={mostrarFormulario} onHide={ocultarFormulario} header="Agregar Proveedor">
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
                  autoResize
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
            <Button label="Guardar" severity="success" icon="pi pi-check" onClick={confirmarGuardado} />
            <Button label="Limpiar" severity="danger" icon="pi pi-trash" onClick={confirmarLimpiar} />
          </ContenedorBoton>
        </ContenedorFormulario>
      </Dialog>
    </ContenedorProveedores>
  );
};

export default AgregarProveedores;
