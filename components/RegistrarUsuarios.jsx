import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';

export const RegistrarUsuarios = () => {
  const [rut, setRut] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [apellidos, setApellidos] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [contrasena, setContrasena] = useState('');
  const [repetir, setRepetir] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [rol, setRol] = useState(null);

  const handleFileChange = (e) => {
    const file = e.files[0];
    setFotoPerfil(file);
  };

  const handleRolChange = (e) => {
    setRol(e.value);
  };

  const rolOptions = [
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Encargado', value: 'Encargado' },
  ];

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8">
        <Card>
          <h2>Registrar cuenta</h2>
          <div className="p-field">
            <label htmlFor="rol">Rol</label>
            <Dropdown
              id="rol"
              options={rolOptions}
              onChange={handleRolChange}
              placeholder="Seleccionar Rol"
              value={rol}
            />
          </div>
          <div className="p-field">
            <label htmlFor="fotoPerfil">Logo/Foto de perfil</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              chooseLabel="Seleccionar"
              uploadLabel="Subir"
              cancelLabel="Cancelar"
              customUpload
              onUpload={handleFileChange}
            />
            {fotoPerfil && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={URL.createObjectURL(fotoPerfil)}
                  alt="Vista previa de la foto de perfil"
                  style={{ maxWidth: '100px' }}
                />
              </div>
            )}
          </div>
          <div className="p-field p-grid">
            <div className="p-col-12 p-md-6">
              <label htmlFor="rut">Rut</label>
              <Chips id="rut" value={rut} onChange={(e) => setRut(e.value)} />
            </div>
            <div className="p-col-12 p-md-6">
              <label htmlFor="nombre">Nombre</label>
              <Chips id="nombre" value={nombre} onChange={(e) => setNombre(e.value)} />
            </div>
            <div className="p-col-12 p-md-6">
              <label htmlFor="apellidos">Apellidos</label>
              <Chips id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.value)} />
            </div>
            <div className="p-col-12 p-md-6">
              <label htmlFor="correo">Correo</label>
              <Chips id="correo" value={correo} onChange={(e) => setCorreo(e.value)} />
            </div>
          </div>
          <div className="p-field p-grid">
            <div className="p-col-12 p-md-6">
              <label htmlFor="contrasena">Contraseña</label>
              <Password
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
            <div className="p-col-12 p-md-6">
              <label htmlFor="repetir">Repita su contraseña</label>
              <Password
                id="repetir"
                value={repetir}
                onChange={(e) => setRepetir(e.target.value)}
              />
            </div>
          </div>
          <div className="p-field p-grid p-justify-end">
            <div className="p-col-12 p-md-6">
              <Button
                label="Crear"
                className="p-button-success"
                style={{ marginRight: '10px' }}
              />
              <Button
                label="Borrar"
                className="p-button-secondary"
              />
            </div>
          </div>
          <p style={{ fontSize: '10px' }}>
            ¿Ya tienes una cuenta? Presiona <Link to="/Iniciar-sesion" style={{ color: 'blue' }}>aquí</Link>.
          </p>
        </Card>
      </div>
    </div>
  );
};

