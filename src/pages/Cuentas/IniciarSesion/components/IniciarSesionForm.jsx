import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

export const IniciarSesionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const messagesRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const cargar = () => {
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setMensajeVisible(true);
      messagesRef.current.show({ severity: 'success', summary: 'Genial', detail: 'Inicio de sesión exitoso' });
      
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }, 2000);
  };

  return (
    <div className="p-card" style={{ background: 'white', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <div style={{ padding: '10px' }}>
        <span className="p-float-label">
          <InputText value={formData.usuario} name="usuario" onChange={handleChange} />
          <label htmlFor="usuario">Usuario</label>
        </span>
        <span className="p-float-label" style={{ marginTop: '25px' }}>
          <Password value={formData.contrasena} name="contrasena" onChange={handleChange} feedback={false} />
          <label style={{ textAlign: 'center' }} htmlFor="password">Contraseña</label>
        </span>
      </div>
      <div className="card flex justify-content-center">
        <Button 
            style={{ margin: 'auto' }} 
            label="Iniciar Sesión" 
            severity="success" 
            loading={cargando} 
            onClick={cargar} 
            disabled={mensajeVisible}
        />
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Tienes problemas para iniciar sesión? Presiona <Link to="/registrar" style={{ color: 'blue' }}>aquí</Link>.
      </p>

      <Messages ref={messagesRef}/>
    </div>
  );
};
