import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import '../CSS/Proveedores.css';

const AgregarProveedores = () => {
  const [visible, setVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [selectedProviderIndex, setSelectedProviderIndex] = useState(null);
  const [proveedor, setProveedor] = useState({ nombre: '', descripcion: '', pais: '', numero: '' });
  const [proveedoresGuardados, setProveedoresGuardados] = useState([]);
  const paises = [
    { label: 'Seleccione un país', value: '' },
    { label: 'Estados Unidos (+1)', value: '+1' },
    { label: 'México (+52)', value: '+52' },
    { label: 'España (+34)', value: '+34' },
    { label: 'Chile (+56 9)', value: '+56 9' }
  ];

  // == INTENTO DE ALMACENAMIENTO == //
  // Cargar los objetos guardados desde localStorage al cargar la página
  useEffect(() => {
    const storedProviders = JSON.parse(localStorage.getItem('proveedoresGuardados'));
    if (storedProviders) {
      setProveedoresGuardados(storedProviders);
    }
  }, []);

  // Guardar los objetos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('proveedoresGuardados', JSON.stringify(proveedoresGuardados));
  }, [proveedoresGuardados]);

  // ================================== //

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleGuardar = () => {
    const nuevoProveedor = { ...proveedor };
    setProveedoresGuardados([...proveedoresGuardados, nuevoProveedor]);
    hideDialog();
  };

  const showConfirmDialog = (index) => {
    setSelectedProviderIndex(index);
    setConfirmDialogVisible(true);
  };

  const hideConfirmDialog = () => {
    setSelectedProviderIndex(null);
    setConfirmDialogVisible(false);
  };

  const confirmDelete = () => {
    if (selectedProviderIndex !== null) {
      handleEliminarProveedor(selectedProviderIndex);
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
      <Button label="Agregar Proveedor" icon="pi pi-plus" onClick={showDialog} />
      <Dialog
        visible={visible}
        onHide={hideDialog}
        header="Agregar Proveedor"
        modal={true}
        footer={
          <div>
            <Button label="Guardar" icon="pi pi-check" onClick={handleGuardar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-secondary" />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText id="nombre" value={proveedor.nombre} onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })} />
          </div>
          <div className="p-field">
            <label htmlFor="descripcion">Descripción (máximo 200 caracteres)</label>
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
            <label htmlFor="pais">País</label>
            <Dropdown
              id="pais"
              options={paises}
              value={proveedor.pais}
              onChange={(e) => setProveedor({ ...proveedor, pais: e.value })}
              placeholder="Seleccione un país"
            />
          </div>
          {proveedor.pais && (
            <div className="p-field">
              <label>Número de país seleccionado: {proveedor.pais}</label>
            </div>
          )}
          <div className="p-field">
            <label htmlFor="numero">Número de teléfono (8 caracteres)</label>
            <InputText
              id="numero"
              value={proveedor.numero}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/\D/g, '').slice(0, 8);
                setProveedor({ ...proveedor, numero: numericValue });
              }}
              pattern="[0-9]*"
            />
          </div>
        </div>
      </Dialog>

      {proveedoresGuardados.map((proveedorGuardado, index) => (
        <div key={index} className="mini-perfil">
          <div className="perfil-info">
            <div className="perfil-nombre">Nombre: {proveedorGuardado.nombre}</div>
            <div className="perfil-descripcion">Descripción: {proveedorGuardado.descripcion}</div>
            <div className="perfil-telefono">Teléfono: {proveedorGuardado.pais} {proveedorGuardado.numero}</div>
          </div>
          <div className="perfil-delete-button">
            <Button icon="pi pi-trash" rounded severity="danger" aria-label="Cancel" onClick={() => showConfirmDialog(index)} />
          </div>
        </div>
      ))}

      {/* Diálogo de confirmación */}
      <Dialog
        visible={confirmDialogVisible}
        onHide={hideConfirmDialog}
        header="Confirmar Eliminación"
        modal={true}
        footer={
          <div>
            <Button label="Sí" icon="pi pi-check" onClick={confirmDelete} />
            <Button label="No" icon="pi pi-times" onClick={hideConfirmDialog} className="p-button-secondary" />
          </div>
        }
      >
        <div>¿Estás seguro de que deseas eliminar este proveedor?</div>
      </Dialog>
    </div>
  );
};

export default AgregarProveedores;
