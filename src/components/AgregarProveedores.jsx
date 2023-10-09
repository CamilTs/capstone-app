import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import styled from "styled-components";

const ContenedorProveedores = styled.div`
  width: 100%;
`;

const ContenedorHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: flex-start;
  align-items: center;
`;

const MiniPerfil = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #50838f;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.8);
`;

const DatosMiniPerfil = styled.div`
  flex: 1;
  padding-left: 10px;
  color: white;
`;

const NombreProveedor = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DescripcionProveedor = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const TelefonoProveedor = styled.div`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const CorreoProveedor = styled.div`
  font-size: 0.95rem;
`;

const BotonesProveedor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const AgregarProveedores = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [confirmarEliminarProveedor, setConfirmarEliminarProveedor] = useState(false);
  const [abrirFormularioModificar, setAbrirFormularioModificar] = useState(false);
  const [selectedProveedorIndex, setSelectedProveedorIndex] = useState(null);
  const [proveedor, setProveedor] = useState({
    nombre: "",
    descripcion: "",
    numero: "",
    correo: "",
  });
  const [proveedoresGuardados, setProveedoresGuardados] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const proveedores = JSON.parse(localStorage.getItem("proveedoresGuardados"));
    if (proveedores) {
      setProveedoresGuardados(proveedores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("proveedoresGuardados", JSON.stringify(proveedoresGuardados));
  }, [proveedoresGuardados]);

  const verFormulario = () => {
    setMostrarFormulario(true);
  };

  const ocultarFormulario = () => {
    setMostrarFormulario(false);
  };

  const limpiarFormulario = () => {
    setProveedor({
      nombre: "",
      descripcion: "",
      numero: "",
      correo: "",
    });
  };

  const handleGuardar = () => {
    const nuevoProveedor = {
      ...proveedor,
      numero: "+56 9 " + proveedor.numero,
    };
    setProveedoresGuardados([...proveedoresGuardados, nuevoProveedor]);
    ocultarFormulario();
    limpiarFormulario();
    toast.current.show({ severity: "success", summary: "Listo", detail: "¡Proveedor Agregado!", life: 2000 });
  };

  const mostrarConfirmEliminar = (index) => {
    setSelectedProveedorIndex(index);
    setConfirmarEliminarProveedor(true);
  };

  const handleEliminarProveedor = (index) => {
    const nuevosProveedores = [...proveedoresGuardados];
    nuevosProveedores.splice(index, 1);
    setProveedoresGuardados(nuevosProveedores);
  };

  const confirmDelete = () => {
    if (selectedProveedorIndex !== null) {
      handleEliminarProveedor(selectedProveedorIndex);
      setConfirmarEliminarProveedor(false);
      toast.current.show({ severity: "info", summary: "Realizado", detail: "Proveedor Eliminado", life: 2000 });
    }
  };

  const abrirFormularioEditar = (index) => {
    setProveedor({
      nombre: proveedoresGuardados[index].nombre,
      descripcion: proveedoresGuardados[index].descripcion,
      numero: proveedoresGuardados[index].numero,
      correo: proveedoresGuardados[index].correo,
    });
    setSelectedProveedorIndex(index);
    setAbrirFormularioModificar(true);
  };

  const handleEditarProveedor = () => {
    const proveedorModificado = {
      ...proveedor,
      numero: proveedor.numero,
    };
    const nuevosProveedores = [...proveedoresGuardados];
    nuevosProveedores[selectedProveedorIndex] = proveedorModificado;
    setProveedoresGuardados(nuevosProveedores);
    limpiarFormulario();
    setAbrirFormularioModificar(false);
    toast.current.show({ severity: "info", summary: "Realizado", detail: "Proveedor Editado", life: 2000 });
    console.log(proveedorModificado);
  };

  const DialogFormulario = (
    <React.Fragment>
      <Button label="Guardar" severity="success" icon="pi pi-check" onClick={handleGuardar} />
      <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={ocultarFormulario} className="p-button-secondary" />
    </React.Fragment>
  );

  const DialogEditar = () => {
    return (
      <React.Fragment>
        <Button label="Editar" severity="info" icon="pi pi-pencil" onClick={handleEditarProveedor} />
        <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={() => setAbrirFormularioModificar(false)} />
      </React.Fragment>
    );
  };

  const OpcionesProveedor = (index) => {
    return (
      <React.Fragment>
        <Button severity="info" icon="pi pi-pencil" rounded onClick={() => abrirFormularioEditar(index)} />
        <Button icon="pi pi-trash" severity="danger" rounded onClick={() => mostrarConfirmEliminar(index)} />
      </React.Fragment>
    );
  };

  const ConfirmarEliminarDialog = (
    <React.Fragment>
      <Button label="Eliminar" severity="danger" icon="pi pi-trash" onClick={confirmDelete} />
      <Button
        label="Cancelar"
        severity="info"
        icon="pi pi-times"
        onClick={() => setConfirmarEliminarProveedor(false)}
        className="p-button-secondary"
      />
    </React.Fragment>
  );

  return (
    <ContenedorProveedores>
      <Toast ref={toast} />
      <ContenedorHeader>
        <Button label="Agregar Proveedor" severity="success" icon="pi pi-plus" onClick={verFormulario} />
      </ContenedorHeader>
      <Dialog visible={mostrarFormulario} onHide={ocultarFormulario} header="Agregar Proveedor" modal={true} footer={DialogFormulario}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText id="nombre" value={proveedor.nombre} onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })} />
          </div>
          <div className="p-field">
            <label htmlFor="descripcion">Descripción</label>
            <InputTextarea
              id="descripcion"
              value={proveedor.descripcion}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setProveedor({ ...proveedor, descripcion: e.target.value });
                }
              }}
              rows={5}
              autoResize
            />
          </div>
          <div className="p-field">
            <label htmlFor="numero">Número de teléfono</label>
            <InputText
              id="numero"
              value={proveedor.numero}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/\D/g, "").slice(0, 8);
                setProveedor({ ...proveedor, numero: numericValue });
              }}
              pattern="[0-8]*"
            />
          </div>
          <div className="p-field">
            <label htmlFor="correo">Correo</label>
            <InputText id="correo" value={proveedor.correo} onChange={(e) => setProveedor({ ...proveedor, correo: e.target.value })} />
          </div>
        </div>
      </Dialog>

      {proveedoresGuardados.map((proveedor, index) => (
        <MiniPerfil key={index}>
          <DatosMiniPerfil>
            <NombreProveedor>Nombre: {proveedor.nombre}</NombreProveedor>
            <DescripcionProveedor>Descripción: {proveedor.descripcion}</DescripcionProveedor>
            <TelefonoProveedor>Teléfono: {proveedor.numero}</TelefonoProveedor>
            <CorreoProveedor>Correo: {proveedor.correo}</CorreoProveedor>
          </DatosMiniPerfil>
          <BotonesProveedor>{OpcionesProveedor(index)}</BotonesProveedor>
        </MiniPerfil>
      ))}

      <ConfirmDialog
        visible={confirmarEliminarProveedor}
        onHide={() => setConfirmarEliminarProveedor(false)}
        header="Confirmar Eliminación"
        message="¿Está seguro que desea eliminar este proveedor?"
        icon="pi pi-exclamation-triangle"
        modal={true}
        footer={ConfirmarEliminarDialog}
      />
      <Dialog
        header="Editar Proveedor"
        className="p-fluid"
        visible={abrirFormularioModificar}
        footer={DialogEditar}
        onHide={() => setAbrirFormularioModificar(false)}
      >
        <div>
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText id="nombre" value={proveedor.nombre} onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })} />
          </div>
          <div className="p-field">
            <label htmlFor="descripcion">Descripción</label>
            <InputTextarea
              id="descripcion"
              value={proveedor.descripcion}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setProveedor({ ...proveedor, descripcion: e.target.value });
                }
              }}
              rows={5}
              autoResize
            />
          </div>
          <div className="p-field">
            <label htmlFor="numero">Número de teléfono</label>
            <InputText
              id="numero"
              value={proveedor.numero}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/\D/g, "").slice(0, 8);
                setProveedor({ ...proveedor, numero: numericValue });
              }}
              pattern="[0-8]*"
            />
          </div>
          <div className="p-field">
            <label htmlFor="correo">Correo</label>
            <InputText id="correo" value={proveedor.correo} onChange={(e) => setProveedor({ ...proveedor, correo: e.target.value })} />
          </div>
        </div>
      </Dialog>
    </ContenedorProveedores>
  );
};

export default AgregarProveedores;
