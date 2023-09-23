import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import "../CSS/Proveedores.css";

const AgregarProveedores = () => {
  const [visible, setVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [selectedProveedorIndex, setSelectedProveedorIndex] = useState(null);
  const [proveedor, setProveedor] = useState({
    nombre: "",
    descripcion: "",
    numero: "",
    correo: "",
  });
  const [proveedoresGuardados, setProveedoresGuardados] = useState([]);

  useEffect(() => {
    const proveedores = JSON.parse(
      localStorage.getItem("proveedoresGuardados")
    );
    if (proveedores) {
      setProveedoresGuardados(proveedores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "proveedoresGuardados",
      JSON.stringify(proveedoresGuardados)
    );
  }, [proveedoresGuardados]);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleGuardar = () => {
    const nuevoProveedor = {
      ...proveedor,
      numero: "+56 9 " + proveedor.numero,
    };
    setProveedoresGuardados([...proveedoresGuardados, nuevoProveedor]);
    hideDialog();
  };

  const showConfirmDialog = (index) => {
    setSelectedProveedorIndex(index);
    setConfirmDialogVisible(true);
  };

  const hideConfirmDialog = () => {
    setSelectedProveedorIndex(null);
    setConfirmDialogVisible(false);
  };

  const confirmDelete = () => {
    if (selectedProveedorIndex !== null) {
      handleEliminarProveedor(selectedProveedorIndex);
      hideConfirmDialog();
    }
  };

  const handleEliminarProveedor = (index) => {
    const nuevosProveedores = [...proveedoresGuardados];
    nuevosProveedores.splice(index, 1);
    setProveedoresGuardados(nuevosProveedores);
  };

  return (
    <div>
      <Button
        label="Agregar Proveedor"
        icon="pi pi-plus"
        onClick={showDialog}
      />
      <Dialog
        visible={visible}
        onHide={hideDialog}
        header="Agregar Proveedor"
        modal={true}
        footer={
          <div>
            <Button
              label="Guardar"
              icon="pi pi-check"
              onClick={handleGuardar}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={hideDialog}
              className="p-button-secondary"
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={proveedor.nombre}
              onChange={(e) =>
                setProveedor({ ...proveedor, nombre: e.target.value })
              }
            />
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
              pattern="[0-9]*"
            />
          </div>
          <div className="p-field">
            <label htmlFor="correo">Correo</label>
            <InputText
              id="correo"
              value={proveedor.correo}
              onChange={(e) =>
                setProveedor({ ...proveedor, correo: e.target.value })
              }
            />
          </div>
        </div>
      </Dialog>

      {proveedoresGuardados.map((proveedorGuardado, index) => (
        <div key={index} className="mini-perfil">
          <div className="perfil-info">
            <div className="perfil-nombre">
              Nombre: {proveedorGuardado.nombre}
            </div>
            <div className="perfil-descripcion">
              Descripción: {proveedorGuardado.descripcion}
            </div>
            <div className="perfil-telefono">
              Teléfono: {proveedorGuardado.pais} {proveedorGuardado.numero}
            </div>
          </div>
          <div className="perfil-delete-button">
            <Button
              icon="pi pi-trash"
              rounded
              severity="danger"
              aria-label="Cancel"
              onClick={() => showConfirmDialog(index)}
            />
          </div>
        </div>
      ))}

      <Dialog
        visible={confirmDialogVisible}
        onHide={hideConfirmDialog}
        header="Confirmar Eliminación"
        modal={true}
        footer={
          <div>
            <Button label="Sí" icon="pi pi-check" onClick={confirmDelete} />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={hideConfirmDialog}
              className="p-button-secondary"
            />
          </div>
        }
      >
        <div>¿Estás seguro de que deseas eliminar este proveedor?</div>
      </Dialog>
    </div>
  );
};

export default AgregarProveedores;
