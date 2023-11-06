import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {
  ContenedorProveedores,
  ContenedorHeader,
  MiniPerfil,
  DatosMiniPerfil,
  ContenedorBoton,
  Formulario,
  ContenedorInput,
  Campos,
  ContenedorFormulario,
  DatosProveedor,
} from "./components/StyledAgregarProveedor";
import { api } from "../../api/api";
import { useFormik } from "formik";
import { ProveedorSchema } from "../../components/Validaciones";
import { useSelector } from "react-redux";
import { InputContainer } from "../../components/InputContainer";

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

  const agregarProveedor = async () => {
    try {
      const response = await api.post("proveedor", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento agregar al proveedor");
    }
  };

  const traerProveedores = async () => {
    try {
      const response = await api.get(`proveedor/${id}`);
      const { data } = response;
      console.log(data);
      setProveedor(data.data);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los proveedores");
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
          severity: "success",
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

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? <div className="p-error">{formik.errors[name]}</div> : null;
  };

  const [refrescar, setRefrescar] = useState(0);

  const refrescarPagina = () => {
    console.log("refrescando");
    setRefrescar(refrescar + 1);
    console.log("valor de refrescar: " + refrescar);
  };

  useEffect(() => {
    traerProveedores();
  }, []);

  return (
    <ContenedorProveedores>
      <ContenedorHeader>
        <Button raised label="Agregar Proveedor" severity="success" icon="pi pi-plus" onClick={verFormulario} />
        <Button raised severity="info" icon="pi pi-refresh" onClick={traerProveedores} />
      </ContenedorHeader>
      <Dialog visible={mostrarFormulario} onHide={ocultarFormulario} header="Agregar Proveedor">
        <ContenedorFormulario>
          <Formulario onSubmit={formik.handleSubmit}>
            <Toast ref={toast} />
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
                  placeholder="El telefono debe llevar '9' al inicio.."
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
                  placeholder="El correo debe llevar @.."
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

      {proveedor.map((proveedor, index) => (
        <MiniPerfil key={index}>
          <DatosMiniPerfil>
            <DatosProveedor>Nombre: {proveedor.nombre}</DatosProveedor>
            <DatosProveedor>Descripción: {proveedor.descripcion}</DatosProveedor>
            <DatosProveedor>Telefono: {proveedor.telefono}</DatosProveedor>
            <DatosProveedor>Correo: {proveedor.correo}</DatosProveedor>
          </DatosMiniPerfil>
          <ContenedorBoton>
            <Button raised label="Editar" severity="info" icon="pi pi-pencil" rounded />
            <Button raised label="Eliminar" severity="danger" icon="pi pi-trash" rounded />
          </ContenedorBoton>
        </MiniPerfil>
      ))}
    </ContenedorProveedores>
  );
};

export default AgregarProveedores;
