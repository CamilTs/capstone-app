import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';

export const RegistrarUsuarios = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [cargando, setCargando] = useState(false);

  const estructuraFormulario = {
    rut:'',
    nombre:'',
    apellidos:'',
    correo:'',
    contrasena:'',
    repetir:'',
    fotoPerfil:null,
    rol:'',
  }


  
  // ======== FORM HOOK ========

  const [formData, setFormData] = useState(estructuraFormulario)
  const resetForm = () => {
    setFormData(estructuraFormulario);
    setFotoPerfil(null);
  }
  const handleChange = ({target}) => {
    const {name, value} = target
    setFormData({...formData,[name]:value})
  }

  const handleFileChange = (e) => {
    const file = e.files[0];
    setFotoPerfil(file);
  
    setFormData({
      ...formData,
      fotoPerfil: file,
    });
  };

  const rolOptions = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Encargado', value: 'encargado' },
  ];

  const cargar = () => {
    if (formData.fotoPerfil) {
    }

    setCargando(true);
    
    setTimeout(() => {
      setCargando(false);
      submit(); // Llamar a la función submit cuando cargando sea falso
    }, 2000);
  };
  
  const submit = () => {
    console.log(formData);
  };

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Registrar cuenta</h2>
      <div style={{ marginBottom: '20px' }}>
      <Dropdown
        id="rol"
        options={rolOptions}
        onChange={handleChange}
        placeholder="Seleccionar Rol"
        name='rol'
        value={formData.rol}
      />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label htmlFor="fotoPerfil">Logo/Foto de perfil</label>
      <FileUpload
        id="fotoPerfil"
        mode="basic"
        accept="image/*"
        onSelect={handleFileChange}
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
          <InputText value={formData.rut} name='rut' onChange={handleChange} />
          <label htmlFor="username">rut</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <InputText value={formData.nombre} name='nombre' onChange={handleChange} />
            <label htmlFor="nombre">Nombre</label>
          </span>
        </div>
        <div style={{ flex: '1' }}>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <InputText value={formData.apellidos} name='apellidos' onChange={handleChange} />
            <label htmlFor="apellidos">Apellidos</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: '20px' }}>
            <InputText value={formData.correo} name='correo' onChange={handleChange} />
            <label htmlFor="correo">Correo</label>
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <span className="p-float-label">
              <Password type="password" value={formData.contrasena} name='contrasena' onChange={handleChange} />
              <label htmlFor="password">Contraseña</label>
          </span>
        </div>
        <div style={{ flex: '1' }}>
        <span className="p-float-label">
              <Password type="password" value={formData.repetir} name='repetir' onChange={handleChange} />
              <label htmlFor="password">Repetir contraseña</label>
          </span>
        </div>
      </div>
      <div className="card flex justify-content-center">
        <Button style={{marginRight:'10px'}} label='Crear' severity='success' loading={cargando} onClick={cargar}/>
        <Button severity='info' label='Borrar' onClick={resetForm}/>
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Ya tienes una cuenta? Presiona <Link to="/Iniciar-sesion" style={{ color: 'blue' }}>aquí</Link>.
      </p>
      </div>
  )
};

